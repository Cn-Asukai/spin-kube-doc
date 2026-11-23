---
title: 变量赋值
description: 使用 Kubernetes ConfigMap 和 Secret 中的值来配置 Spin 应用。
date: 2024-02-16
categories: [Spin Operator]
tags: [Tutorials]
weight: 11
aliases:
- /docs/spin-operator/tutorials/assigning-variables
---


通过使用变量，你可以在不重新编译 SpinApp 的情况下改变应用的行为。在 Kubernetes 中运行时，你可以为变量提供常量值，也可以从
Kubernetes 原语（如 `ConfigMaps` 和 `Secrets`）中引用它们。本教程将引导你完成为 `SpinApp` 赋值的整个过程。

> Note: 如果你想了解如何使用外部变量提供程序（例如 [Vault](https://vaultproject.io) 或
> [Azure Key Vault](https://azure.microsoft.com/en-us/products/key-vault)）来配置应用，请参阅[外部变量提供程序指南](./external-variable-providers.md)。

## 构建 SpinApp 并存储到 OCI Registry

我们将构建 SpinApp 并将其存储到一个 [ttl.sh](http://ttl.sh) registry 中。进入
[apps/variable-explorer](https://github.com/spinframework/spin-operator/blob/main/apps/variable-explorer)
目录，并构建我们提供的 SpinApp：

```bash
# Build and publish the sample app
cd apps/variable-explorer
spin build
spin registry push ttl.sh/variable-explorer:1h
```

注意 [ttl.sh/variable-explorer:1h](http://ttl.sh/variable-explorer:1h) 末尾的标签表示镜像的存留时长，例如
`1h`（1 小时）。最长为 `24h`，如果超过 24 小时，你需要重新推送。

出于演示目的，我们使用 [variable
explorer](https://github.com/spinframework/spin-operator/blob/main/apps/variable-explorer) 示例应用。它读取三个不同的变量（`log_level`、`platform_name`
和 `db_password`），并将其值打印到 `STDOUT` 流，如下面的代码片段所示：

```rust
let log_level = variables::get("log_level")?;
let platform_name = variables::get("platform_name")?;
let db_password = variables::get("db_password")?;

println!("# Log Level: {}", log_level);
println!("# Platform name: {}", platform_name);
println!("# DB Password: {}", db_password);
```

这些变量在 Spin manifest（`spin.toml`）中定义，并且 `variable-explorer` 组件被授予了对它们的访问权限：

```toml
[variables]
log_level = { default = "WARN" }
platform_name = { default = "Fermyon Cloud" }
db_password = { required = true }

[component.variable-explorer.variables]
log_level = "{{ log_level }}"
platform_name = "{{ platform_name }}"
db_password = "{{ db_password }}"
```

关于在 Spin manifest 中定义变量的更多内容，请参阅 [Spin 应用 Manifest
参考](https://developer.fermyon.com/spin/v2/manifest-reference#the-variables-table)。

## Kubernetes 中的配置数据

在 Kubernetes 中，你使用 `ConfigMaps` 存储非敏感配置数据，使用 `Secrets` 存储敏感配置数据。部署 manifest
（`config/samples/variable-explorer.yaml`）中同时包含一个 `ConfigMap` 和一个 `Secret` 的定义：

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: spinapp-cfg
data:
  logLevel: INFO
---
kind: Secret
apiVersion: v1
metadata:
  name: spinapp-secret
data:
  password: c2VjcmV0X3NhdWNlCg==
```

## 为 SpinApp 赋值

创建 `SpinApp` 时，你可以从以下几种指定变量的方式中选择：

1. 提供常量值
2. 从 ConfigMap 加载配置值
3. 从 Secret 加载配置值

`SpinApp` 规范中包含 `variables` 数组，用于指定变量（参见 `kubectl explain
spinapp.spec.variables`）。

部署 manifest（`config/samples/variable-explorer.yaml`）为 `platform_name` 指定了静态值，`log_level` 的值从名为
`spinapp-cfg` 的 `ConfigMap` 中读取，而 `db_password` 的值从名为 `spinapp-secret` 的 `Secret` 中读取：

```yaml
kind: SpinApp
apiVersion: core.spinkube.dev/v1alpha1
metadata:
  name: variable-explorer
spec:
  replicas: 1
  image: ttl.sh/variable-explorer:1h
  executor: containerd-shim-spin
  variables:
    - name: platform_name
      value: Kubernetes
    - name: log_level
      valueFrom:
        configMapKeyRef:
          name: spinapp-cfg
          key: logLevel
          optional: true
    - name: db_password
      valueFrom:
        secretKeyRef:
          name: spinapp-secret
          key: password
          optional: false
```

正如部署 manifest 所示，你可以像为普通 Kubernetes `Pod` 指定环境变量那样使用 `optional`
属性，来控制当被引用的配置源不存在时，Kubernetes 是否阻止 SpinApp 启动。

你可以执行以下命令来部署所有资源：

```bash
kubectl apply -f config/samples/variable-explorer.yaml

configmap/spinapp-cfg created
secret/spinapp-secret created
spinapp.core.spinkube.dev/variable-explorer created
```

## 查看 SpinApp 的运行时日志

要验证所有变量都已正确传递给 SpinApp，你可以配置从本地机器到对应 Kubernetes `Service` 的端口转发：

```bash
kubectl port-forward services/variable-explorer 8080:80

Forwarding from 127.0.0.1:8080 -> 80
Forwarding from [::1]:8080 -> 80
```

端口转发建立后，你可以在另一个终端会话中向 variable-explorer 发送 HTTP 请求：

```bash
curl http://localhost:8080
Hello from Kubernetes
```

最后，你可以使用 `kubectl logs` 查看 variable-explorer 在运行时产生的所有日志：

```bash
kubectl logs -l core.spinkube.dev/app-name=variable-explorer

# Log Level: INFO
# Platform Name: Kubernetes
# DB Password: secret_sauce
```
