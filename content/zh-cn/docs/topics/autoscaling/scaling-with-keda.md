---
title: 使用 Kubernetes 事件驱动自动伸缩（KEDA）伸缩 Spin 应用
description: 本教程演示如何在 Kubernetes 中使用 Kubernetes 事件驱动自动伸缩（KEDA）对 Spin 应用进行水平伸缩。
date: 2024-02-16
categories: [Spin Operator]
tags: [Tutorials, Autoscaling]
aliases:
  - /docs/spin-operator/tutorials/scaling-with-keda
---

[KEDA](https://keda.sh) 扩展了 Kubernetes，为其提供事件驱动的伸缩能力，使集群能够借助 [KEDA
scaler](https://keda.sh/docs/2.13/scalers/) 对来自 Kubernetes 内部或外部源的事件作出反应。KEDA 提供了丰富多样的 scaler，可基于 CPU、内存、Azure Event Hubs、Kafka、RabbitMQ 等各种来源定义伸缩行为。我们将使用 `ScaledObject` 根据实际需求动态伸缩 SpinApp 的实例数量。

## 前提条件

请确保你的本地机器上已安装以下工具：

- [kubectl](https://kubernetes.io/docs/tasks/tools/) - Kubernetes 命令行工具
- [Helm](https://helm.sh) - Kubernetes 的包管理器
- [Docker](https://docs.docker.com/engine/install/) - 用于运行 kind
- [kind](https://kind.sigs.k8s.io/) - 一个基于 Docker 运行的开发用 Kubernetes 发行版
- [Bombardier](https://pkg.go.dev/github.com/codesenberg/bombardier) - 跨平台 HTTP
  压测命令行工具

> 本教程使用 kind 在本地运行一个 Kubernetes 集群，但你也可以在你自己的 Kubernetes 环境中按照以下步骤配置 KEDA 自动伸缩。

## 搭建 Kubernetes 集群

运行以下命令创建一个已安装 [containerd-shim-spin](https://github.com/spinframework/containerd-shim-spin) 前置依赖的 Kubernetes 集群：如果你已经有一个 Kubernetes 集群，或者希望从一个更接近生产环境的 SpinKube 安装开始，请改用 [Helm 安装指南](../../install/installing-with-helm.md)，其中包含配置 Runtime Class Manager 以管理 Spin containerd shim 生命周期的说明。下面的 `kind` 集群创建命令会建立一个三节点集群，并通过 containerd 配置指示 containerd 对使用 `spin` runtime class 调度的工作负载使用 Spin containerd shim。我们还暴露了主机端口 8081，以便在后续步骤中更方便地进行负载测试。

```console
cat <<EOF | kind create cluster --name wasm-cluster-scale --image ghcr.io/spinframework/containerd-shim-spin/kind:v0.27.2 --config=-
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
containerdConfigPatches:
- |-
  [plugins."io.containerd.cri.v1.runtime".containerd.runtimes.spin]
    runtime_type = "io.containerd.spin.v2"
  [plugins."io.containerd.cri.v1.runtime".containerd.runtimes.spin.options]
    SystemdCgroup = true
nodes:
- role: control-plane
  extraPortMappings:
  - containerPort: 80
    hostPort: 8081
    protocol: TCP
- role: worker
- role: worker
EOF
```

### 部署 Spin Operator 及其依赖

首先，你需要安装 [cert-manager](https://github.com/cert-manager/cert-manager)，用于自动供给和管理 TLS 证书（供 Spin Operator 的准入 webhook 系统使用）。详细的安装说明请参阅 [cert-manager 文档](https://cert-manager.io/docs/installation/)。

```console
# 安装 cert-manager CRD
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.20.0/cert-manager.crds.yaml

# 添加并更新 Jetstack 仓库
helm repo add jetstack https://charts.jetstack.io
helm repo update

# 安装 cert-manager Helm chart
helm install \
  cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --version v1.20.0
```

接下来，运行以下命令安装 Spin [Runtime Class]({{<ref
"glossary#runtime-class">}}) 和 Spin Operator 的[自定义资源定义（CRD）]({{<ref
"glossary#custom-resource-definition-crd">}})：

> 注意：在生产集群中，你通常需要为 Runtime Class 配置一个 `nodeSelector`，使其匹配已安装 shim 的节点。不过在本例的 kind 集群中，每个节点都安装了 shim。

```console
# 安装 RuntimeClass
kubectl apply -f https://github.com/spinframework/spin-operator/releases/download/v0.6.1/spin-operator.runtime-class.yaml

# 安装 CRD
kubectl apply -f https://github.com/spinframework/spin-operator/releases/download/v0.6.1/spin-operator.crds.yaml
```

最后，使用 `helm` 和 [shim 执行器]({{< ref
"glossary#spin-app-executor-crd" >}})，通过以下命令安装 Spin Operator：

```console
# 安装 Spin Operator
helm install spin-operator \
  --namespace spin-operator \
  --create-namespace \
  --version 0.6.1 \
  --wait \
  oci://ghcr.io/spinframework/charts/spin-operator

# 安装 shim 执行器
kubectl apply -f https://github.com/spinframework/spin-operator/releases/download/v0.6.1/spin-operator.shim-executor.yaml
```

很好，现在 Spin Operator 已经在你的集群上运行起来了。这意味着你可以在本教程的后续步骤中创建并部署 SpinApp 了。

## 安装 Ingress Controller

在你的集群中安装一个 ingress controller。本示例使用 Traefik 作为 Kind 环境中本地路由的 ingress controller。我们要求它运行在暴露 hostPort 的 control-plane 节点上。

```sh
helm repo add traefik https://helm.traefik.io/traefik
helm repo update
helm install traefik traefik/traefik \
  --namespace traefik --create-namespace \
  --set deployment.kind=DaemonSet \
  --set service.type=ClusterIP \
  --set ports.web.hostPort=80 \
  --set tolerations[0].key=node-role.kubernetes.io/control-plane \
  --set tolerations[0].effect=NoSchedule \
  --set tolerations[0].operator=Exists \
  --set nodeSelector."kubernetes\.io/hostname"=wasm-cluster-scale-control-plane
kubectl wait --namespace traefik --for=condition=ready pod --selector=app.kubernetes.io/name=traefik --timeout=180s
```

## 为 Spin 应用配置 Ingress

使用以下命令在你的 Kubernetes 集群上配置 ingress。这样一旦我们在后续步骤中创建了 Spin 应用，流量就能访问到它：

```console
cat <<EOF | kubectl apply -f -
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: nginx
  annotations:
    ingress.kubernetes.io/ssl-redirect: "false"
spec:
  ingressClassName: traefik
  rules:
  - http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: keda-spinapp
            port:
              number: 80
EOF
```

## 配置 KEDA

使用以下命令通过 Helm 在你的 Kubernetes 集群上安装 KEDA。其他部署方式请参阅 [keda.sh 上的 Deploying KEDA](https://keda.sh/docs/2.13/deploy/)：

```console
# 添加 Helm 仓库
helm repo add kedacore https://kedacore.github.io/charts

# 更新你的 Helm 仓库
helm repo update

# 将 keda Helm chart 安装到 keda 命名空间
helm install keda kedacore/keda --namespace keda --create-namespace
```

## 部署 Spin 应用和 KEDA ScaledObject

接下来，我们要部署将用于伸缩演示的 Spin 应用。你可以在 Spin Operator 仓库的
[apps/cpu-load-gen](https://github.com/spinframework/spin-operator/tree/main/apps/cpu-load-gen) 目录中找到该 Spin 应用的源代码。

我们可以在下面的部署文件中查看 `SpinApp` 和 KEDA `ScaledObject` 的定义。如你所见，我们为每个 `SpinApp` 显式指定了资源上限：`cpu` 为 `500m`（`spec.resources.limits.cpu`）、`memory` 为 `500Mi`（`spec.resources.limits.memory`）：

```yaml
# https://raw.githubusercontent.com/spinframework/spin-operator/main/config/samples/keda-app.yaml
apiVersion: core.spinkube.dev/v1alpha1
kind: SpinApp
metadata:
  name: keda-spinapp
spec:
  image: ghcr.io/spinkube/spin-operator/cpu-load-gen:20240311-163328-g1121986
  executor: containerd-shim-spin
  enableAutoscaling: true
  resources:
    limits:
      cpu: 500m
      memory: 500Mi
    requests:
      cpu: 100m
      memory: 400Mi
---
```

当 `cpu` 利用率达到 50%（`spec.triggers[cpu].metadata.value`）时，我们就会伸缩实例数量。我们还指示 KEDA 在 1（`spec.minReplicaCount`）到 20（`spec.maxReplicaCount`）的范围内对 SpinApp 进行水平伸缩：

```yaml
# https://raw.githubusercontent.com/spinframework/spin-operator/main/config/samples/keda-scaledobject.yaml
apiVersion: keda.sh/v1alpha1
kind: ScaledObject
metadata:
  name: cpu-scaling
spec:
  scaleTargetRef:
    name: keda-spinapp
  minReplicaCount: 1
  maxReplicaCount: 20
  triggers:
    - type: cpu
      metricType: Utilization
      metadata:
        value: "50"
```

> Kubernetes 文档中有关于 [limits 和
> requests](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#requests-and-limits) 的详细介绍。
> 如需进一步了解 [ScaledObject](https://keda.sh/docs/2.13/concepts/scaling-deployments/#scaledobject-spec) 和
> [KEDA 内置的 scaler](https://keda.sh/docs/2.13/scalers/)，请查阅 KEDA 文档。

让我们使用以下命令把 SpinApp 和 KEDA ScaledObject 实例部署到集群上：

```console
# 部署 SpinApp
kubectl apply -f https://raw.githubusercontent.com/spinframework/spin-operator/main/config/samples/keda-app.yaml
spinapp.core.spinkube.dev/keda-spinapp created

# 部署 ScaledObject
kubectl apply -f https://raw.githubusercontent.com/spinframework/spin-operator/main/config/samples/keda-scaledobject.yaml
scaledobject.keda.sh/cpu-scaling created
```

运行以下命令可以查看你正在运行的 Spin 应用：

```console
kubectl get spinapps

NAME          READY REPLICAS   EXECUTOR
keda-spinapp  1                containerd-shim-spin
```

你也可以使用以下命令查看你的 KEDA ScaledObject 实例：

```console
kubectl get scaledobject

NAME          SCALETARGETKIND      SCALETARGETNAME   MIN   MAX   TRIGGERS   READY   ACTIVE   AGE
cpu-scaling   apps/v1.Deployment   keda-spinapp      1     20    cpu        True    True     7m
```

## 生成负载以测试自动伸缩

现在，让我们使用 Bombardier 生成流量，测试 KEDA 对 SpinApp 的伸缩效果。下面的 Bombardier 命令会在 3 分钟（或更短时间）内尝试建立 40 个连接。如果某个请求在 5 秒内没有得到响应，该请求将超时：

```console
# 生成大量负载
bombardier -c 40 -t 5s -d 3m http://localhost:8081
```

为了观察负载情况，我们可以运行以下命令查看部署的状态：

```console
kubectl describe deploy keda-spinapp
...
---

Available      True    MinimumReplicasAvailable
Progressing    True    NewReplicaSetAvailable
OldReplicaSets:  <none>
NewReplicaSet:   keda-spinapp-76db5d7f9f (1/1 replicas created)
Events:
  Type    Reason             Age   From                   Message
  ----    ------             ----  ----                   -------
  Normal  ScalingReplicaSet  84s   deployment-controller  Scaled up replica set hpa-spinapp-76db5d7f9f  to 2 from 1
  Normal  ScalingReplicaSet  69s   deployment-controller  Scaled up replica set hpa-spinapp-76db5d7f9f  to 4 from 2
  Normal  ScalingReplicaSet  54s   deployment-controller  Scaled up replica set hpa-spinapp-76db5d7f9f  to 8 from 4
  Normal  ScalingReplicaSet  39s   deployment-controller  Scaled up replica set hpa-spinapp-76db5d7f9f  to 16 from 8
  Normal  ScalingReplicaSet  24s   deployment-controller  Scaled up replica set hpa-spinapp-76db5d7f9f  to 20 from 16
```
