---
title: 快速开始
description: 学习如何搭建 Kubernetes 集群、安装 SpinKube 并运行你的第一个 Spin 应用。
weight: 2
aliases:
  - /docs/quickstart
  - /docs/spin-operator/quickstart
---

本快速开始指南演示如何搭建一个用于开发的 Kubernetes 集群、安装 SpinKube，并部署你的第一个 Spin 应用。本示例会创建一个 kind 集群，并在所有节点上预装 Spin containerd shim。在生产环境中，你应该使用 runtime class manager 来安装并管理 containerd shim 的生命周期。如需更多生产集群的安装说明，请跳转到 [Helm 安装指南](./installing-with-helm.md)。

## 前置条件

开始本快速开始指南之前，你需要：

- [kubectl](https://kubernetes.io/docs/tasks/tools/) - Kubernetes 命令行工具
- 一种容器运行时，例如 [Docker
  Desktop](https://docs.docker.com/get-docker/)、[Rancher Desktop](https://rancherdesktop.io/) 或 [OrbStack](https://orbstack.dev/)
- [kind](https://kind.sigs.k8s.io/docs/user/quick-start/) - 一个使用 Docker 容器“节点”运行本地开发 Kubernetes 集群的工具
- [Helm](https://helm.sh/docs/intro/install/) - Kubernetes 的包管理器

### 搭建你的 Kubernetes 集群

1. 使用一个已预装 [containerd-shim-spin](https://github.com/spinframework/containerd-shim-spin) 前置依赖的 kind 镜像创建 Kubernetes 集群。在创建 kind 集群时，我们会添加 containerd 配置，指示 containerd 为使用 `spin` runtime class 调度的工作负载使用 Spin containerd shim：

```console { data-plausible="copy-quick-create-kind" }
cat <<EOF | kind create cluster --name wasm-cluster --image ghcr.io/spinframework/containerd-shim-spin/kind:v0.27.2 --config=-
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
containerdConfigPatches:
- |-
  [plugins."io.containerd.cri.v1.runtime".containerd.runtimes.spin]
    runtime_type = "io.containerd.spin.v2"
  [plugins."io.containerd.cri.v1.runtime".containerd.runtimes.spin.options]
    SystemdCgroup = true
EOF
```

2. 安装 cert-manager

```console { data-plausible="copy-quick-install-cert-manager" }
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.20.0/cert-manager.yaml
kubectl wait --for=condition=available --timeout=300s deployment/cert-manager-webhook -n cert-manager
```

3. 应用用于将 Spin 应用调度到运行 shim 的节点上的 [Runtime
   Class](https://github.com/spinframework/spin-operator/blob/main/config/samples/spin-runtime-class.yaml)：

> 注意：在生产集群中，你通常需要通过 `nodeSelector` 自定义 Runtime Class，使其匹配已安装 shim 的节点。不过在本 kind 示例中，shim 已在每个节点上预先配置好。

```console { data-plausible="copy-quick-apply-runtime-class" }
kubectl apply -f https://github.com/spinframework/spin-operator/releases/download/v0.6.1/spin-operator.runtime-class.yaml
```

1. 应用 Spin Operator 所使用的[自定义资源定义（CRD）]({{< ref "glossary#custom-resource-definition-crd" >}})：

```console { data-plausible="copy-quick-apply-crd" }
kubectl apply -f https://github.com/spinframework/spin-operator/releases/download/v0.6.1/spin-operator.crds.yaml
```

## 部署 Spin Operator

执行以下命令，使用 Helm 在集群上安装 Spin Operator。这会在 Kubernetes 命名空间
`spin-operator` 下创建 Spin Operator 所需的全部 Kubernetes 资源。依赖安装和 Pod 启动需要一些时间，请稍候片刻。

```console { data-plausible="copy-quick-deploy-operator" }
# Install Spin Operator with Helm
helm upgrade --install spin-operator \
  --namespace spin-operator \
  --create-namespace \
  --version 0.6.1 \
  --wait \
  oci://ghcr.io/spinframework/charts/spin-operator
```

最后，创建 [shim executor]({{< ref "glossary#spin-app-executor-crd" >}})：

```console { data-plausible="copy-quick-create-shim-executor" }
kubectl apply -f https://github.com/spinframework/spin-operator/releases/download/v0.6.1/spin-operator.shim-executor.yaml
```

## 运行示例应用

现在你可以将 Spin 应用部署到集群上了！

1. 在 operator 运行所在的 `spin-operator` 命名空间中创建你的第一个应用：

```console { data-plausible="copy-quick-deploy-sample" }
kubectl apply -f https://raw.githubusercontent.com/spinframework/spin-operator/main/config/samples/simple.yaml
```

2. 将本地端口转发到应用 Pod，使其可以被访问：

```console { data-plausible="copy-quick-forward-local-port" }
kubectl port-forward svc/simple-spinapp 8083:80
```

3. 在另一个终端窗口中，向应用发送请求：

```console { data-plausible="copy-quick-make-request" }
curl localhost:8083/hello
```

你应该会看到：

```bash
Hello world from Spin!
```

## 后续步骤

恭喜你部署了第一个 SpinApp！推荐的后续步骤：

- 使用 [Horizontal Pod Autoscaler（HPA）伸缩你的 Spin 应用]({{< ref "scaling-with-hpa" >}})
- 使用 [Kubernetes Event Driven Autoscaler（KEDA）伸缩你的 Spin 应用]({{< ref "scaling-with-keda"
  >}})
