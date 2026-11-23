---
title: Spin 中的选择性部署
description: 了解如何使用选择性部署（Selective Deployments）只部署 SpinApp 中的一部分组件。
date: 2024-11-10
categories: [Spin Operator]
tags: [Tutorials]
weight: 10
---

本文介绍如何使用选择性部署（Selective Deployments）只部署 Spin 应用中的一部分组件。你将学到：

- 将 Spin 应用中的特定组件生成为（scaffold）自定义资源
- 运行一次选择性部署

选择性部署让你可以控制 Spin 应用的某个实例中哪些组件处于激活状态。借助组件选择器（Component Selector），Spin 和 SpinKube 可以在运行时声明应激活哪些组件，让你在部署单一版本化工件的同时，自行决定启动时启用哪些部分。这种方式将开发者的目标（构建架构良好的应用）与运维需求（针对特定基础设施做优化）分离开来。

## 前提条件

本教程需要：

- [kubectl](https://kubernetes.io/docs/tasks/tools/) - Kubernetes CLI
- 安装了 Spin Operator v0.4 和 Containerd Spin Shim v0.17 的 Kubernetes 集群 - 如有需要，请参照[快速开始](../install/quickstart.md)
- `spin kube` 插件 v0.3 - 如有需要，请参照[安装 `spin kube` 插件](../install/spin-kube-plugin.md)

## 将 Spin 应用中的特定组件生成为自定义资源

我们将使用一个名为 "Salutations" 的示例应用，它通过两个组件来演示问候功能，每个组件响应一个独立的 HTTP 路由。查看该[应用清单](https://github.com/spinframework/spin-operator/blob/main/apps/salutations/spin.toml)可以看到，这个 Spin 应用由两个组件组成：

- `Hello` 组件由 `/hi` 路由触发
- `Goodbye` 组件由 `/bye` 路由触发

```yaml
spin_manifest_version = 2

[application]
name = "salutations"
version = "0.1.0"
authors = ["Kate Goldenring <kate.goldenring@fermyon.com>"]
description = "An app that gives salutations"

[[trigger.http]]
route = "/hi"
component = "hello"

[component.hello]
source = "../hello-world/main.wasm"
allowed_outbound_hosts = []
[component.hello.build]
command = "cd ../hello-world && tinygo build -target=wasi -gc=leaking -no-debug -o main.wasm main.go"
watch = ["**/*.go", "go.mod"]

[[trigger.http]]
route = "/bye"
component = "goodbye"

[component.goodbye]
source = "main.wasm"
allowed_outbound_hosts = []
[component.goodbye.build]
command = "tinygo build -target=wasi -gc=leaking -no-debug -o main.wasm main.go"
watch = ["**/*.go", "go.mod"]
```

使用选择性部署，你可以只部署特定组件而无需修改源代码。在本例中，我们只部署 `hello` 组件。

> 注意，如果你的 Spin 应用包含两个以上的组件，你同样可以有选择地部署其中多个组件。

要进行选择性部署，首先需要使用 `spin kube scaffold` 命令把应用转换为 SpinApp 自定义资源，并通过可选的 `--component` 字段指定要部署的组件：

```bash
spin kube scaffold --from ghcr.io/spinkube/spin-operator/salutations:20241105-223428-g4da3171 --component hello --replicas 1 --out spinapp.yaml
```

现在查看 `spinapp.yaml`，可以看到通过选择性部署只会部署 hello 组件：

```yaml
apiVersion: core.spinkube.dev/v1alpha1
kind: SpinApp
metadata:
  name: salutations
spec:
  image: "ghcr.io/spinkube/spin-operator/salutations:20241105-223428-g4da3171"
  executor: containerd-shim-spin
  replicas: 1
  components:
  - hello
```

## 运行选择性部署

现在你可以像平时一样使用 `kubectl` 部署应用：

```bash
# 使用 kubectl 部署 spinapp.yaml
kubectl apply -f spinapp.yaml
spinapp.core.spinkube.dev/salutations created
```

我们可以对 `hello` 组件的 service 做端口转发，验证是否只有这个组件在运行。

```bash
kubectl port-forward svc/salutations 8083:80
```

然后在另一个终端调用 `/hi` 路由：

```bash
curl localhost:8083/hi
```

如果 hello 组件正常运行，我们应该看到 "Hello Fermyon!" 的响应：

```bash
Hello Fermyon!
```

接下来试试 `/bye` 路由。它应该不会有任何返回，这证明只有 `hello` 组件被部署了：

```bash
curl localhost:8083/bye
```

就是这样！你在完全没有修改源代码的情况下，把 Spin 应用的一个子集选择性地部署到了 SpinKube。这种方式让你可以轻松地只部署所需组件，在只需要特定服务的环境中能够提升效率。
