---
title: 连接 SQLite 数据库
description: 将你的 Spin 应用连接到外部 SQLite 数据库
date: 2024-07-17
categories: [Spin Operator]
tags: [Tutorials]
weight: 14
---

Spin 应用可以使用[在 SQLite 数据库中持久化数据的标准 API](https://developer.fermyon.com/spin/v2/sqlite-api-guide)。默认数据库由 Spin 运行时在本地文件系统上创建，这对于让应用快速跑起来非常方便。然而，对于运行在 SpinKube 环境中的应用来说，这种基于磁盘的方案可能并不理想，因为应用的副本数通常会扩展到不止一个。

好在 Spin 支持通过[运行时配置为应用接入外部 SQLite 数据库提供方](https://developer.fermyon.com/spin/v2/dynamic-configuration#libsql-storage-provider)。外部提供方包括任何可以通过 HTTPS 访问的 [libSQL](https://libsql.org/) 数据库。

## 前提条件

要跟随本教程操作，你需要：

- 一个运行 SpinKube 的 Kubernetes 集群。更多信息请参阅[安装指南]({{< relref "install" >}})。
- [kubectl CLI](https://kubernetes.io/docs/tasks/tools/#kubectl)
- [spin CLI](https://developer.fermyon.com/spin/v2/install )

## 构建并发布 Spin 应用

本教程将使用 [HTTP CRUD Go SQLite](https://github.com/fermyon/enterprise-architectures-and-patterns/tree/main/http-crud-go-sqlite) 示例应用。这是一个基于 Go 的应用，通过 SQLite API 实现 CRUD（创建、读取、更新、删除）操作。

首先，将仓库克隆到本地，并进入 `http-crud-go-sqlite` 目录：

```bash
git clone git@github.com:fermyon/enterprise-architectures-and-patterns.git
cd enterprise-architectures-and-patterns/http-crud-go-sqlite
```

现在，构建应用并将其推送到你有权限访问的镜像仓库。这里我们使用 [ttl.sh](https://ttl.sh)：

```bash
export IMAGE_NAME=ttl.sh/$(uuidgen):1h
spin build
spin registry push ${IMAGE_NAME}
```

## 创建 LibSQL 数据库

如果你还没有可以通过 HTTPS 访问的 LibSQL 数据库，可以跟随我们通过 [Turso](https://turso.tech/) 创建一个。

继续之前，请先安装 [turso CLI](https://docs.turso.tech/quickstart) 并注册账号（如果尚未完成）。

创建一个新数据库并保存其 HTTP URL：

```bash
turso db create spinkube
export DB_URL=$(turso db show spinkube --http-url)
```

接下来，为该数据库创建一个认证令牌（auth token）：

```bash
export DB_TOKEN=$(turso db tokens create spinkube)
```

## 为数据库令牌创建 Kubernetes Secret

数据库令牌属于敏感信息，因此在 Kubernetes 中应将其创建为 Secret 资源：

```bash
kubectl create secret generic turso-auth --from-literal=db-token="${DB_TOKEN}"
```

## 准备 SpinApp 清单

现在你可以着手编写 SpinApp 自定义资源清单了。

- 注意 `image` 的值使用的是上面推送的镜像引用。
- 所有 SQLite 数据库配置都通过 `spec.runtimeConfig.sqliteDatabases` 设置。更多细节请参阅 [sqliteDatabases 参考指南]({{< ref
  "docs/reference/spin-app#spinappspecruntimeconfigsqlitedatabasesindex" >}})。
- 这里我们将 `default` 数据库配置为 `libsql` 提供方类型，并在 `options` 下提供数据库 URL 和认证令牌（通过其 Kubernetes Secret 引用）

将 `$IMAGE_NAME` 和 `$DB_URL` 的值填入下面的清单，并保存为 `spinapp.yaml`：

```yaml
apiVersion: core.spinkube.dev/v1alpha1
kind: SpinApp
metadata:
  name: http-crud-go-sqlite
spec:
  image: "$IMAGE_NAME"
  replicas: 1
  executor: containerd-shim-spin
  runtimeConfig:
    sqliteDatabases:
      - name: "default"
        type: "libsql"
        options:
          - name: "url"
            value: "$DB_URL"
          - name: "token"
            valueFrom:
              secretKeyRef:
                name: "turso-auth"
                key: "db-token"
```

## 创建 SpinApp

将资源清单应用到你的 Kubernetes 集群：

```bash
kubectl apply -f spinapp.yaml
```

Spin Operator 会替你创建底层的 Kubernetes 资源。

## 测试应用

现在你可以测试应用，验证其与所配置 SQLite 数据库的连接和数据存储是否正常。

配置从本地机器到对应 Kubernetes `Service` 的端口转发：

```bash
kubectl port-forward services/http-crud-go-sqlite 8080:80

Forwarding from 127.0.0.1:8080 -> 80
Forwarding from [::1]:8080 -> 80
```

端口转发建立后，你可以在另一个终端会话中向 http-crud-go-sqlite 应用发送 HTTP 请求。下面是一些入门示例。

获取当前的所有条目：

```bash
$ curl -X GET http://localhost:8080/items
[
  {
    "id": "8b933c84-ee60-45a1-848d-428ad3259e2b",
    "name": "Full Self Driving (FSD)",
    "active": true
  },
  {
    "id": "d660b9b2-0406-46d6-9efe-b40b4cca59fc",
    "name": "Sentry Mode",
    "active": true
  }
]
```

创建一个新条目：

```bash
$ curl -X POST -d '{"name":"Engage Thrusters","active":true}' localhost:8080/items
{
  "id": "a5efaa73-a4ac-4ffc-9c5c-61c5740e2d9f",
  "name": "Engage Thrusters",
  "active": true
}
```

再次获取条目，可以看到新增的条目：

```bash
$ curl -X GET http://localhost:8080/items
[
  {
    "id": "8b933c84-ee60-45a1-848d-428ad3259e2b",
    "name": "Full Self Driving (FSD)",
    "active": true
  },
  {
    "id": "d660b9b2-0406-46d6-9efe-b40b4cca59fc",
    "name": "Sentry Mode",
    "active": true
  },
  {
    "id": "a5efaa73-a4ac-4ffc-9c5c-61c5740e2d9f",
    "name": "Engage Thrusters",
    "active": true
  }
]
```
