---
title: 使用 Helm 安装
description: 本指南带你完成使用 [Helm](https://helm.sh) 安装 SpinKube 的全过程。
date: 2024-02-16
tags: [Installation]
weight: 4
aliases:
  - /docs/spin-operator/installation/installing-with-helm
---

## 前置条件

对于本指南，你特别需要：

- [kubectl](https://kubernetes.io/docs/tasks/tools/) - Kubernetes 命令行工具
- [Helm](https://helm.sh) - Kubernetes 的包管理器

## 使用 Helm 安装 Spin Operator

以下说明介绍如何使用 Helm chart（通过 `helm
install`）安装 Spin Operator。

### 准备集群

安装 chart 之前，你需要确保以下组件已安装：

- [cert-manager](https://github.com/cert-manager/cert-manager)，用于自动 provision 和管理
  TLS 证书（供 spin-operator 的准入 webhook 系统使用）。详细的安装
  说明请参阅 [cert-manager 文档](https://cert-manager.io/docs/installation/)。

```shell
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.20.0/cert-manager.yaml
```

- [Runtime Class Manager](https://github.com/spinframework/runtime-class-manager)，用于在尚未包含 WebAssembly shim 的 Kubernetes 节点上安装 shim。更多细节请参阅项目的 [README.md](https://github.com/spinframework/runtime-class-manager/blob/main/README.md)。

```shell
# Install Runtime Class Manager
helm upgrade --install runtime-class-manager  \
  --namespace runtime-class-manager \
  --create-namespace \
  --version 0.2.0 \
  oci://ghcr.io/spinframework/charts/runtime-class-manager

# Create Shim resource for installing the containerd-shim-spin binary
kubectl apply -f https://github.com/spinframework/containerd-shim-spin/releases/download/v0.27.2/runtime-class-manager-shim-v1alpha1-v0.27.2.yaml

# Label all Nodes where the shim should be installed (and thus where Spin Apps may run)
# Note: this specific key and value matches the nodeSelector configuration used in the Shim resource above
kubectl label node --all spin=true
```

此时你应该能看到一个 `wasmtime-spin-v2` RuntimeClass，并且所有打过标签的节点都已准备好运行 Spin 应用。

## Chart 前置条件

依赖安装完成后，我们就可以开始安装 operator 了。这个过程包含几个步骤，允许日后在集群中进一步自定义 Spin 应用，不过这里我们安装默认配置。

- 首先确保已安装[自定义资源定义（CRD）]({{< ref
  "glossary#custom-resource-definition-crd" >}})。其中包括代表可调度到集群上的 Spin 应用的 SpinApp CRD。

```shell
kubectl apply -f https://github.com/spinframework/spin-operator/releases/download/v0.6.1/spin-operator.crds.yaml
```

- 最后，我们创建一个 `containerd-spin-shim` [SpinAppExecutor]({{< ref
  "glossary#spin-app-executor-crd" >}})。它告诉 Spin Operator 使用我们刚创建的 RuntimeClass
  来运行 Spin 应用：

```shell
kubectl apply -f https://github.com/spinframework/spin-operator/releases/download/v0.6.1/spin-operator.shim-executor.yaml
```

### 安装 Spin Operator Chart

以下命令以 release 名称 `spin-operator` 安装该 chart：

```shell
# Install Spin Operator with Helm
helm upgrade --install spin-operator \
  --namespace spin-operator \
  --create-namespace \
  --version 0.6.1 \
  --wait \
  oci://ghcr.io/spinframework/charts/spin-operator
```

前往[快速开始](./quickstart.md#run-the-sample-application)部署你的第一个 Spin 应用。或者，继续阅读如何升级或卸载 Spin Operator。

### 升级 Chart

注意，在升级 Helm release 的同时，你可能还需要一并升级 spin-operator 的 CRD：

```shell
kubectl apply -f https://github.com/spinframework/spin-operator/releases/download/v0.6.1/spin-operator.crds.yaml
```

要升级 `spin-operator` release，请运行以下命令：

```shell
# Upgrade Spin Operator using Helm
helm upgrade spin-operator \
  --namespace spin-operator \
  --version 0.6.1 \
  --wait \
  oci://ghcr.io/spinframework/charts/spin-operator
```

### 卸载 Chart

要删除 `spin-operator` release，请运行：

```shell
# Uninstall Spin Operator using Helm
helm delete spin-operator --namespace spin-operator
```

这会移除与该 chart 关联的所有 Kubernetes 资源，并删除 Helm release。

要彻底卸载所有与 spin-operator 相关的资源，你还可以删除相应的 CRD 资源：

```shell
kubectl delete -f https://github.com/spinframework/spin-operator/releases/download/v0.6.1/spin-operator.shim-executor.yaml
kubectl delete -f https://github.com/spinframework/spin-operator/releases/download/v0.6.1/spin-operator.crds.yaml
```
