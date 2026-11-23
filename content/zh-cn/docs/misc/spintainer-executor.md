---
title: Spintainer 执行器
description: Spintainer 执行器的功能概述及其使用方式。
categories: [SpinKube]
tags: []
---

# Spintainer 执行器

Spintainer（由 Spin 与 container 两词拼合而成）执行器是一种 [SpinAppExecutor](../../reference/spin-app-executor)，它将 Spin 应用直接运行在容器中，而不是通过 [shim](../../topics/architecture#containerd-shim-spin) 运行。这在许多场景下都很有用：

- 提供了灵活的选择空间：
  - 可以使用任意你想要的 Spin 版本。
  - 可以使用任意你想要的自定义触发器或插件。
- 即使你没有安装 shim 所需的集群权限，也能使用 SpinKube。

> 注意：对于大多数使用场景，我们推荐使用 shim。Spintainer 执行器最好仅作为替代方案。

## 如何创建 Spintainer 执行器

以下是一个 Spintainer 执行器的示例配置：

```yaml
apiVersion: core.spinkube.dev/v1alpha1
kind: SpinAppExecutor
metadata:
  name: spintainer
spec:
  createDeployment: true
  deploymentConfig:
    installDefaultCACerts: true
    spinImage: ghcr.io/fermyon/spin:v2.7.0
```

将其保存为名为 `spintainer-executor.yaml` 的文件，然后应用到集群中。

```bash
kubectl apply -f spintainer-executor.yaml
```

## 如何使用 Spintainer 执行器

要使用 Spintainer 执行器，你需要在 `SpinApp` 中将其指定为 executor。

```yaml
apiVersion: core.spinkube.dev/v1alpha1
kind: SpinApp
metadata:
  name: simple-spinapp
spec:
  image: "ghcr.io/spinkube/containerd-shim-spin/examples/spin-rust-hello:v0.13.0"
  replicas: 1
  executor: spintainer
```

## Spintainer 执行器的工作原理

Spintainer 执行器会在一个容器中运行你的 Spin 应用，该容器基于 `.spec.deploymentConfig.spinImage` 指定的镜像创建。容器镜像必须以 Spin 二进制作为容器的[入口点（entrypoint）](https://docs.docker.com/reference/dockerfile/#entrypoint)，并使用以下参数启动：

```
up --listen {spin-operator-defined-port} -f {spin-operator-defined-image} --runtime-config-file {spin-operator-defined-config-file}
```

为方便使用，你可以直接使用 Spin 项目[发布在这里](https://github.com/fermyon/spin/pkgs/container/spin)的镜像，也可以根据自己的独特需求自行构建镜像。
