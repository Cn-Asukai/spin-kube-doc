---
title: 使用键值存储
description: 将你的 Spin 应用连接到键值存储
date: 2024-07-29
categories: [Spin Operator]
tags: [Tutorials]
weight: 14
---

Spin 应用可以使用[在键值存储中持久化数据的标准 API](https://developer.fermyon.com/spin/v2/kv-store-api-guide)。Spin 中的默认键值存储是一个 SQLite 数据库，非常适合在无需搭建任何基础设施的情况下快速使用本地非关系型存储。然而，对于运行在 SpinKube 环境中的应用来说，这种方案可能并不理想，因为应用的副本数通常会扩展到不止一个。

好在 Spin 支持为应用配置[外部键值提供方](https://developer.fermyon.com/spin/v2/dynamic-configuration#key-value-store-runtime-configuration)。外部提供方包括 [Redis](https://redis.io/) 或 [Valkey](https://valkey.io/)，以及 [Azure Cosmos DB](https://azure.microsoft.com/en-us/products/cosmos-db)。

## 前提条件

要跟随本教程操作，你需要：

- 一个运行 SpinKube 的 Kubernetes 集群。更多信息请参阅[安装指南]({{< relref "install" >}})。
- [kubectl CLI](https://kubernetes.io/docs/tasks/tools/#kubectl)
- [spin CLI](https://developer.fermyon.com/spin/v2/install )

## 构建并发布 Spin 应用

本教程将使用一个用 Go SDK 编写的 [Spin 键值应用](https://github.com/fermyon/spin-go-sdk/tree/main/examples/key-value)。该应用提供用于管理键值对的 CRUD（创建、读取、更新、删除）API。

首先，将仓库克隆到本地，并进入 `examples/key-value` 目录：

```bash
git clone git@github.com:fermyon/spin-go-sdk.git
cd examples/key-value
```

现在，构建应用并将其推送到你有权限访问的镜像仓库。这里我们使用 [ttl.sh](https://ttl.sh)：

```bash
export IMAGE_NAME=ttl.sh/$(uuidgen):1h
spin build
spin registry push ${IMAGE_NAME}
```

## 配置外部键值提供方

由于我们已经有一个运行 SpinKube 的 Kubernetes 集群，我们将选择 [Valkey](https://valkey.io/) 作为键值提供方，并通过 Bitnami 的 [Valkey Helm chart](https://github.com/bitnami/charts/tree/main/bitnami/valkey) 进行安装。在 Spin 中，Valkey 可以与 Redis 互换使用，但请注意 URL 需要使用 `redis://` 协议而不是 `valkey://`。

```bash
helm install valkey --namespace valkey --create-namespace oci://registry-1.docker.io/bitnamicharts/valkey
```

正如安装成功后提示信息所述，请务必获取 valkey 密码以备后用：

```bash
export VALKEY_PASSWORD=$(kubectl get secret --namespace valkey valkey -o jsonpath="{.data.valkey-password}" | base64 -d)
```

## 为 Valkey URL 创建 Kubernetes Secret

运行时配置需要 Valkey URL 才能连接到该提供方。由于该 URL 包含敏感的密码字符串，我们将把它创建为 Kubernetes 中的 Secret 资源：

```bash
kubectl create secret generic kv-secret --from-literal=valkey-url="redis://:${VALKEY_PASSWORD}@valkey-master.valkey.svc.cluster.local:6379"
```

## 准备 SpinApp 清单

现在你可以着手为该应用编写 SpinApp 自定义资源清单了。

- 所有键值配置都通过 `spec.runtimeConfig.keyValueStores` 设置。更多细节请参阅 [keyValueStores 参考指南]({{< ref
  "docs/reference/spin-app#spinappspecruntimeconfigkeyvaluestoresindex" >}})。
- 这里我们将 `default` 存储配置为 `redis` 提供方类型，并在 `options` 下提供 Valkey URL（通过其 Kubernetes Secret 引用）

将 `$IMAGE_NAME` 和 `$DB_URL` 的值填入下面的清单，并保存为 `spinapp.yaml`：

```yaml
apiVersion: core.spinkube.dev/v1alpha1
kind: SpinApp
metadata:
  name: kv-app
spec:
  image: "$IMAGE_NAME"
  replicas: 1
  executor: containerd-shim-spin
  runtimeConfig:
    keyValueStores:
      - name: "default"
        type: "redis"
        options:
          - name: "url"
            valueFrom:
              secretKeyRef:
                name: "kv-secret"
                key: "valkey-url"
```

## 创建 SpinApp

将资源清单应用到你的 Kubernetes 集群：

```bash
kubectl apply -f spinapp.yaml
```

Spin Operator 会替你创建底层的 Kubernetes 资源。

## 测试应用

现在你可以测试应用，验证其与所配置提供方的连接和键值存储是否正常。

配置从本地机器到对应 Kubernetes `Service` 的端口转发：

```bash
kubectl port-forward services/kv-app 8080:80

Forwarding from 127.0.0.1:8080 -> 80
Forwarding from [::1]:8080 -> 80
```

端口转发建立后，你可以在另一个终端会话中向该应用发送 HTTP 请求。下面是一些入门示例。

创建一个值为 `ok!` 的 `test` 键：

```bash
$ curl -i -X POST -d "ok!" localhost:8080/test
HTTP/1.1 200 OK
content-length: 0
date: Mon, 29 Jul 2024 19:58:14 GMT
```

获取 `test` 键的值：

```bash
$ curl -i -X GET localhost:8080/test
HTTP/1.1 200 OK
content-length: 3
date: Mon, 29 Jul 2024 19:58:39 GMT

ok!
```

删除 `test` 键的值：

```bash
$ curl -i -X DELETE localhost:8080/test
HTTP/1.1 200 OK
content-length: 0
date: Mon, 29 Jul 2024 19:59:18 GMT
```

尝试再次获取 `test` 键的值：

```bash
$ curl -i -X GET localhost:8080/test
HTTP/1.1 500 Internal Server Error
content-type: text/plain; charset=utf-8
x-content-type-options: nosniff
content-length: 12
date: Mon, 29 Jul 2024 19:59:44 GMT

no such key
```
