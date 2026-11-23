---
title: 使用水平 Pod 自动伸缩（HPA）伸缩 Spin 应用
description: 本教程演示如何在 Kubernetes 中使用水平 Pod 自动伸缩（HPA）对 Spin 应用进行水平伸缩。
date: 2024-02-16
categories: [Spin Operator]
tags: [Tutorials, Autoscaling]
aliases:
  - /docs/spin-operator/tutorials/scaling-with-hpa
---

在 Kubernetes 的语境中，水平伸缩（horizontal scaling）指的是部署更多 Pod 来满足需求（与垂直伸缩不同，后者是为已运行的 Pod 分配更多内存和 CPU 资源）。在本教程中，我们将配置
[HPA](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)，根据实际需求动态伸缩 SpinApp 的实例数量。

## 前提条件

请确保已安装以下工具：

- [Docker](https://docs.docker.com/engine/install/) - 用于运行 kind
- [kubectl](https://kubernetes.io/docs/tasks/tools/) - Kubernetes 命令行工具
- [kind](https://kind.sigs.k8s.io/) - 一个基于 Docker 运行的开发用 Kubernetes 发行版
- [Helm](https://helm.sh) - Kubernetes 的包管理器
- [Bombardier](https://pkg.go.dev/github.com/codesenberg/bombardier) - 跨平台 HTTP
  压测命令行工具

> 本教程使用 kind 在本地运行一个 Kubernetes 集群，但你也可以在你自己的 Kubernetes 环境中按照以下步骤配置 HPA 自动伸缩。

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
            name: hpa-spinapp
            port:
              number: 80
EOF
```

## 部署 Spin 应用和 HorizontalPodAutoscaler（HPA）

接下来，我们要部署将用于伸缩演示的 Spin 应用。你可以在 Spin Operator 仓库的
[apps/cpu-load-gen](https://github.com/spinframework/spin-operator/tree/main/apps/cpu-load-gen) 目录中找到该 Spin 应用的源代码。

我们可以在下面的部署文件中查看 SpinApp 和 HPA 的定义。如你所见，我们为每个 Spin 应用设置了 `resources` -> `limits`，即 `cpu` 为 `500m`、`memory` 为 `500Mi`，并将在 `cpu` 和 `memory` 利用率达到 50% 时伸缩实例数量。我们还定义了最大
[replica](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#replicas) 数为 10、最小副本数为 1：

```yaml
apiVersion: core.spinkube.dev/v1alpha1
kind: SpinApp
metadata:
  name: hpa-spinapp
spec:
  image: ghcr.io/spinkube/spin-operator/cpu-load-gen:20240311-163328-g1121986
  enableAutoscaling: true
  resources:
    limits:
      cpu: 500m
      memory: 500Mi
    requests:
      cpu: 100m
      memory: 400Mi
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: spinapp-autoscaler
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: hpa-spinapp
  minReplicas: 1
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 50
```

关于 HPA 的更多信息，请访问以下链接：

- [Kubernetes Horizontal Pod
  Autoscaling](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)
- [Kubernetes HorizontalPodAutoscaler
  Walkthrough](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/)
- [HPA Container Resource
  Metrics](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#container-resource-metrics)

下面是一个伸缩资源配置的示例：

```yaml
apiVersion: core.spinkube.dev/v1alpha1
kind: SpinApp
metadata:
  name: hpa-spinapp
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
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: spinapp-autoscaler
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: hpa-spinapp
  minReplicas: 1
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 50
```

让我们把 SpinApp 和 HPA 实例部署到集群上（使用上面的 `.yaml` 配置）。要应用上述配置，我们使用以下 `kubectl apply` 命令：

```console
# 安装 SpinApp 和 HPA
kubectl apply -f https://raw.githubusercontent.com/spinframework/spin-operator/main/config/samples/hpa.yaml
```

运行以下命令可以查看你正在运行的 Spin 应用：

```console
kubectl get spinapps
NAME          AGE
hpa-spinapp   92m
```

你也可以使用以下命令查看你的 HPA 实例：

```console
kubectl get hpa
NAME                 REFERENCE                TARGETS   MINPODS   MAXPODS   REPLICAS   AGE
spinapp-autoscaler   Deployment/hpa-spinapp   6%/50%    1         10        1          97m
```

> 请注意：[Spin 的 Kubernetes
> 插件](https://www.spinkube.dev/docs/spin-plugin-kube/installation/) 是一个为 Spin 命令行工具提供 Kubernetes 集成能力的工具。[Spin 的 Kubernetes 插件提供了一个伸缩教程](https://www.spinkube.dev/docs/spin-plugin-kube/tutorials/autoscaler-support/)，演示了如何使用 `spin kube` 命令告诉 Kubernetes 根据需求伸缩（扩大或缩小）你的 Spin 应用。

## 生成负载以测试自动伸缩

现在，让我们使用 Bombardier 生成流量，测试 HPA 对 SpinApp 的伸缩效果。下面的 Bombardier 命令会在 3 分钟（或更短时间）内尝试建立 40 个连接。如果某个请求在 5 秒内没有得到响应，该请求将超时：

```console
# 生成大量负载
bombardier -c 40 -t 5s -d 3m http://localhost:8081
```

为了观察负载情况，我们可以运行以下命令查看部署的状态：

```console
kubectl describe deploy hpa-spinapp
...
---

Available      True    MinimumReplicasAvailable
Progressing    True    NewReplicaSetAvailable
OldReplicaSets:  <none>
NewReplicaSet:   hpa-spinapp-544c649cf4 (1/1 replicas created)
Events:
  Type    Reason             Age   From                   Message
  ----    ------             ----  ----                   -------
  Normal  ScalingReplicaSet  11m    deployment-controller  Scaled up replica set hpa-spinapp-544c649cf4 to 1
  Normal  ScalingReplicaSet  9m45s  deployment-controller  Scaled up replica set hpa-spinapp-544c649cf4  to 4
  Normal  ScalingReplicaSet  9m30s  deployment-controller  Scaled up replica set hpa-spinapp-544c649cf4  to 8
  Normal  ScalingReplicaSet  9m15s  deployment-controller  Scaled up replica set hpa-spinapp-544c649cf4  to 10
```
