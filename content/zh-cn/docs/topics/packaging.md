---
title: 打包与部署应用
description: 了解如何使用公共或私有的 OCI 兼容镜像仓库来打包和分发 Spin 应用。
date: 2024-02-16
categories: [Spin Operator]
tags: [Tutorials]
weight: 10
aliases:
- /docs/spin-operator/tutorials/package-and-deploy
---

本文介绍 Spin 应用如何通过公共和私有镜像仓库进行打包与分发。你将学到：

- 打包和分发 Spin 应用
- 部署 Spin 应用
- 为 Spin 应用生成（scaffold）Kubernetes 清单
- 使用需要身份验证的私有镜像仓库

## 前提条件

本教程特别需要以下工具：

- [TinyGo](https://tinygo.org/) - 用于构建 Spin 应用
- [kubectl](https://kubernetes.io/docs/tasks/tools/) - Kubernetes CLI
- [spin](https://developer.fermyon.com/spin/v2/install) - Spin CLI
- [spin kube](/docs/spin-plugin-kube/installation) - `spin` 的 Kubernetes 插件

## 创建新的 Spin 应用

你可以使用 `spin` CLI 创建一个新的 Spin 应用。`spin` CLI 提供了多种模板，帮助你快速创建不同类型的 Spin 应用。出于演示目的，这里使用 `http-go` 模板创建一个简单的 Spin 应用。

```shell
# 使用 http-go 模板创建一个新的 Spin 应用
spin new --accept-defaults -t http-go hello-spin

# 进入 hello-spin 目录
cd hello-spin
```

`spin` CLI 在 `hello-spin` 中创建了所有必需的文件。除了 Spin 清单（`spin.toml`）之外，你可以在 `main.go` 中找到应用的具体实现：

```go
package main

import (
	"fmt"
	"net/http"

	spinhttp "github.com/fermyon/spin/sdk/go/v2/http"
)

func init() {
	spinhttp.Handle(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/plain")
		fmt.Fprintln(w, "Hello Fermyon!")
	})
}

func main() {}
```

这段实现会响应所有传入的 HTTP 请求，返回状态码为 200（`Ok`）的 HTTP 响应，并把 `Hello Fermyon` 作为响应体发送回去。

你可以在本地机器上进入 `hello-spin` 文件夹，执行 `spin up` 命令来测试该应用。

## 打包和分发 Spin 应用

Spin 应用以 OCI 工件（artifact）的形式打包和分发。借助 OCI 工件，Spin 应用可以通过任何实现了[开放容器倡议分发规范](https://github.com/opencontainers/distribution-spec)（即 "OCI Distribution Spec"）的镜像仓库进行分发。

`spin` CLI 简化了 Spin 应用的打包与分发，并提供了一条原子命令（`spin registry push`）。你可以像下面这样，把上一节创建的 `hello-spin` 应用打包并分发出去：

```shell
# 打包并分发 hello-spin 应用
spin registry push --build ttl.sh/hello-spin:24h
```

> 建议在 `spin registry push` 时加上 `--build` 标志。这样可以避免把过期版本的 Spin 应用意外推送到你选定的镜像仓库。

## 部署 Spin 应用

要将 Spin 应用部署到运行着 Spin Operator 的 Kubernetes 集群，你需要使用 `spin` 的 `kube` 插件。按下面的方式执行 `spin kube deploy` 命令，即可把 `hello-spin` 应用部署到你的 Kubernetes 集群：

```shell
# 将 hello-spin 应用部署到你的 Kubernetes 集群
spin kube deploy --from ttl.sh/hello-spin:24h

spinapp.core.spinkube.dev/hello-spin created
```
> 你可以使用[选择性部署](./selective-deployments.md)只部署 Spin 应用中的部分组件。

## 生成（scaffold）Spin 应用清单

在上一节中，你使用 `spin kube deploy` 命令部署了 `hello-spin` 应用。虽然这样很方便，但有时你可能希望在应用之前先检查或修改 Kubernetes 清单。这时可以使用 `spin kube scaffold` 命令来生成 Kubernetes 清单：

```shell
spin kube scaffold --from ttl.sh/hello-spin:24h
apiVersion: core.spinkube.dev/v1alpha1
kind: SpinApp
metadata:
  name: hello-spin
spec:
  image: "ttl.sh/hello-spin:24h"
  replicas: 2
```

默认情况下，该命令会把所有 Kubernetes 清单打印到 `STDOUT`。你也可以指定 `out` 参数，将清单保存到文件中：

```shell
# 将清单生成到 spinapp.yaml
spin kube scaffold --from ttl.sh/hello-spin:24h \
    --out spinapp.yaml

# 输出 spinapp.yaml 的内容
cat spinapp.yaml
apiVersion: core.spinkube.dev/v1alpha1
kind: SpinApp
metadata:
  name: hello-spin
spec:
  image: "ttl.sh/hello-spin:24h"
  replicas: 2
```

然后你就可以通过 `kubectl` CLI 应用清单来部署这个 Spin 应用：

```shell
kubectl apply -f spinapp.yaml
```

## 通过私有镜像仓库分发和部署 Spin 应用

在实际场景中，Spin 应用经常通过需要某种身份验证的私有镜像仓库来分发。要将 Spin 应用发布到私有镜像仓库，你必须先使用 `spin registry login` 命令完成身份验证。

出于演示目的，下面将通过 GitHub Container Registry（GHCR）来分发 Spin 应用。你可以按照 [GitHub 的这份指南](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry#authenticating-with-a-personal-access-token-classic)创建一个新的个人访问令牌（PAT），身份验证时会用到它。

```shell
# 将 PAT 和 GitHub 用户名保存为环境变量
export GH_PAT=YOUR_TOKEN
export GH_USER=YOUR_GITHUB_USERNAME

# 使用 GHCR 对 spin CLI 进行身份验证
echo $GH_PAT | spin registry login ghcr.io -u $GH_USER --password-stdin

Successfully logged in as YOUR_GITHUB_USERNAME to registry ghcr.io
```

身份验证成功后，你就可以使用 `spin registry push` 把 Spin 应用推送到 GHCR：

```shell
# 将 hello-spin 推送到 GHCR
spin registry push --build ghcr.io/$GH_USER/hello-spin:0.0.1

Pushing app to the Registry...
Pushed with digest sha256:1611d51b296574f74b99df1391e2dc65f210e9ea695fbbce34d770ecfcfba581
```

在 Kubernetes 中，身份验证信息以 `docker-registry` 类型的 Secret 形式保存。下面的代码片段展示了如何利用你在上一节设置的环境变量，通过 `kubectl` 创建这样一个 Secret：

```shell
# 在 Kubernetes 中创建 Secret
kubectl create secret docker-registry ghcr \
    --docker-server ghcr.io \
    --docker-username $GH_USER \
    --docker-password $CR_PAT

secret/ghcr created
```

使用 `spin kube scaffold` 生成所需的 `SpinApp` 自定义资源（CR）：

```shell
# 生成 SpinApp 清单
spin kube scaffold --from ghcr.io/$GH_USER/hello-spin:0.0.1 \
    --out spinapp.yaml
```

在使用 `kubectl` 部署清单之前，请更新 `spinapp.yaml`，通过 `imagePullSecrets` 属性关联你之前创建的 `ghcr` Secret。你的 `SpinApp` 清单应如下所示：

```yaml
apiVersion: core.spinkube.dev/v1alpha1
kind: SpinApp
metadata:
  name: hello-spin
spec:
  image: ghcr.io/$GH_USER/hello-spin:0.0.1
  imagePullSecrets:
    - name: ghcr
  replicas: 2
  executor: containerd-shim-spin
```

> `$GH_USER` 应与你在本文前面章节中运行命令时实际提供的用户名一致

最后，你可以使用 `kubectl apply` 部署该应用：

```shell
# 使用 kubectl 部署 spinapp.yaml
kubectl apply -f spinapp.yaml
spinapp.core.spinkube.dev/hello-spin created
```
