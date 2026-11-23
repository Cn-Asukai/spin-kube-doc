---
title: 在 Azure Kubernetes Service 上安装
description: 本教程将介绍如何在 Azure Kubernetes Service（AKS）上部署 SpinKube。
date: 2024-02-16
categories: [Spin Operator]
tags: [Tutorials]
weight: 5
aliases:
  - /docs/spin-operator/tutorials/deploy-on-azure-kubernetes-service
---

在本教程中，你将在 Azure Kubernetes Service（AKS）集群上安装 Spin Operator，并部署一个简单的 Spin 应用。你将学到：

- 部署一个 AKS 集群
- 安装 Spin Operator 的自定义资源定义（Custom Resource Definition，CRD）
- 通过 Runtime Class Manager 安装并验证 containerd shim
- 在集群上部署一个简单的 Spin App 自定义资源

<!-- TODO: To learn more about any of these concepts, please visit the [Spin Operator Conceptual article](link-to-concept-article). -->

## 前置条件

在继续之前，请确保已安装以下工具：

- [kubectl](https://kubernetes.io/docs/tasks/tools/) - Kubernetes 命令行工具
- [Helm](https://helm.sh) - Kubernetes 的包管理器
- [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli) - 用于管理
  Azure 资源的跨平台命令行工具

## 准备所需的 Azure 基础设施

在将 Spin Operator 部署到 Azure Kubernetes Service（AKS）之前，必须先准备好底层的云基础设施。本文将创建一个简单的 AKS 集群。（你也可以按照[微软官方指南](https://learn.microsoft.com/en-us/azure/aks/tutorial-kubernetes-deploy-cluster?tabs=azure-cli)来搭建 AKS 集群。）

```shell
# Login with Azure CLI
az login

# Select the desired Azure Subscription
az account set --subscription <YOUR_SUBSCRIPTION>

# Create an Azure Resource Group
az group create --name rg-spin-operator \
    --location germanywestcentral

# Create an AKS cluster
az aks create --name aks-spin-operator \
    --resource-group rg-spin-operator \
    --location germanywestcentral \
    --node-count 1 \
    --tier free \
    --generate-ssh-keys
```

AKS 集群创建完成后，使用 `aks get-credentials` 命令为 `kubectl` 下载凭证：

```shell
# Download credentials for kubectl
az aks get-credentials --name aks-spin-operator \
    --resource-group rg-spin-operator
```

为了验证，你可以使用 `kubectl` 浏览 AKS 集群中的常见资源：

```shell
# Browse namespaces in the AKS cluster
kubectl get namespaces

NAME              STATUS   AGE
default           Active   3m
kube-node-lease   Active   3m
kube-public       Active   3m
kube-system       Active   3m
```

## 部署 Spin Operator

首先，必须安装 [自定义资源定义（CRD）]({{< ref "glossary#custom-resource-definition-crd" >}})
以及 `wasmtime-spin-v2` 的 [Runtime Class]({{< ref "glossary#runtime-class" >}})。

```shell
# Install the CRDs
kubectl apply -f https://github.com/spinframework/spin-operator/releases/download/v0.6.1/spin-operator.crds.yaml
```

下面安装 [cert-manager](https://github.com/cert-manager/cert-manager)，它是自动供应和管理
TLS 证书所必需的（Spin Operator 的准入 webhook 系统会用到这些证书）：

```shell
# Install cert-manager CRDs
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.20.0/cert-manager.crds.yaml

# Add and update Jetstack repository
helm repo add jetstack https://charts.jetstack.io
helm repo update

# Install the cert-manager Helm chart
helm upgrade --install cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --version v1.20.0
```

Spin Operator chart 还依赖 [Runtime Class Manager](https://github.com/spinframework/runtime-class-manager)，它用于在 Kubernetes 节点上安装 containerd Spin shim：


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

要验证 `containerd-shim-spin` 是否安装成功，可以查看由 Runtime Class Manager 更新的 Shim 资源状态：

```shell
# Inspect the Shim resource
kubectl get shim spin-v2 --no-headers -o custom-columns=":status.nodesReady"
```

上述命令返回的数值应与你集群中节点的数量一致（即上一步中打了标签的节点数）。

下面的命令会以 `spin-operator` 为 release 名称，把 chart 安装到 `spin-operator` 命名空间：

```shell
helm upgrade --install spin-operator \
  --namespace spin-operator \
  --create-namespace \
  --version 0.6.1 \
  --wait \
  oci://ghcr.io/spinframework/charts/spin-operator
```

最后，创建 [shim executor]({{< ref "glossary#spin-app-executor-crd" >}})::

```console
kubectl apply -f https://github.com/spinframework/spin-operator/releases/download/v0.6.1/spin-operator.shim-executor.yaml
```

## 将 Spin App 部署到 AKS

为了验证 Spin Operator 的部署，你将向 AKS 集群部署一个简单的 Spin App。以下命令会使用
上一节中创建的 `SpinApp` CRD 安装一个简单的 Spin App：

```shell
# Deploy a sample Spin app
kubectl apply -f https://raw.githubusercontent.com/spinframework/spin-operator/main/config/samples/simple.yaml
```

## 验证 Spin App

配置端口转发，将本地机器的 `8080` 端口转发到 Kubernetes 服务的 `80` 端口，该服务指向上一节安装的
Spin App：

```shell
kubectl port-forward services/simple-spinapp 8080:80
Forwarding from 127.0.0.1:8080 -> 80
Forwarding from [::1]:8080 -> 80
```

使用 [`curl`](https://curl.se/) 向 [http://127.0.0.1:8080/hello](http://127.0.0.1:8080/hello) 发送
HTTP 请求：

```shell
# Send an HTTP GET request to the Spin App
curl -iX GET http://localhost:8080/hello
HTTP/1.1 200 OK
transfer-encoding: chunked
date: Mon, 12 Feb 2024 12:23:52 GMT

Hello world from Spin!%
```

## 删除 Azure 基础设施

要删除本文创建的 Azure 基础设施，请使用以下命令：

```shell
# Remove all Azure resources
az group delete --name rg-spin-operator \
    --no-wait \
    --yes
```
