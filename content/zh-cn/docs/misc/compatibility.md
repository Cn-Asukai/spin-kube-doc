---
title: 兼容性
description: 可运行 SpinKube 的 Kubernetes 发行版与平台列表。
categories: [Spin Operator]
tags: []
aliases:
- /docs/compatibility
---

以下列出了可运行 [Spin Operator](https://github.com/spinframework/spin-operator/) 的兼容 Kubernetes 发行版与平台：

 - [Amazon Elastic Kubernetes Service (EKS)](https://docs.aws.amazon.com/eks/)
 - [Azure Kubernetes Service (AKS)](https://azure.microsoft.com/en-us/products/kubernetes-service)
 - [Civo Kubernetes](https://www.civo.com/kubernetes)
 - [Digital Ocean Kubernetes (DOKS)](https://www.digitalocean.com/products/kubernetes)
 - [Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine)
 - [k3d](https://k3d.io)
 - [kind](https://kind.sigs.k8s.io/)
 - [minikube](https://minikube.sigs.k8s.io/docs/)（需显式指定 `--container-runtime=containerd`，
   并确保 minikube 版本 `>= 1.33`）
 - [Scaleway Kubernetes Kapsule](https://www.scaleway.com/en/kubernetes-kapsule/)

> **免责声明**：请注意，这份兼容 Kubernetes 发行版与平台的列表仍在持续完善中。对于托管 Kubernetes 服务，云服务商可能会选择停止对某些特定依赖（例如容器运行时）的支持，这一点需要格外留意。尽管我们会尽力保证本文档的准确性，但最终仍需由您自行向 Kubernetes 服务商确认所需依赖是否仍然受支持。

### 如何验证 Spin Operator 的兼容性

如果您想验证 Spin Operator 与某个新 Kubernetes 发行版或平台的兼容性，或者只是想亲自测试上述列表中的某个平台，请按照以下步骤进行验证：

1. **安装 Spin Operator**：首先在 Kubernetes 集群中安装 Spin Operator，包括部署其必要的依赖以及 Spin Operator 本身。（参见
   [使用 Helm 安装]({{< ref "installing-with-helm" >}})）

2. **创建、打包并部署 Spin 应用**：接下来创建一个 Spin 应用，将其打包，并成功部署到 Kubernetes 环境中。（参见
   [打包并部署 Spin 应用]({{< ref "packaging" >}})）

3. **调用 Spin 应用**：Spin 应用部署完成后，确保该应用至少成功处理了一个请求。

## 容器运行时约束

Spin Operator 要求运行 Spin 应用的目标节点支持 containerd 版本
[`1.6.26+`](https://github.com/containerd/containerd/releases/tag/v1.6.26) 或
[`1.7.7+`](https://github.com/containerd/containerd/releases/tag/v1.7.7)。

使用 `kubectl get nodes -o wide` 命令查看每个节点上安装的容器运行时：

```shell
# 查看各节点的容器运行时
kubectl get nodes -o wide
NAME                    STATUS   VERSION   OS-IMAGE             KERNEL-VERSION      CONTAINER-RUNTIME
generalnp-vmss000000    Ready    v1.27.9   Ubuntu 22.04.4 LTS   5.15.0-1056-azure   containerd://1.7.7-1
generalnp-vmss000001    Ready    v1.27.9   Ubuntu 22.04.4 LTS   5.15.0-1056-azure   containerd://1.7.7-1
generalnp-vmss000002    Ready    v1.27.9   Ubuntu 22.04.4 LTS   5.15.0-1056-azure   containerd://1.7.7-1

```
