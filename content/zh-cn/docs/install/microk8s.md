---
title: 在 Microk8s 上安装
description: 本指南将带你完成使用 [Microk8s](https://microk8s.io/) 安装 SpinKube 的过程。
date: 2024-06-19
tags: [Installation]
weight: 8
---

本指南将逐步介绍如何安装和配置 Microk8s 与 SpinKube。

## 前置条件

本指南假设你使用的是 Ubuntu 24.04，并且已启用 Snap（这是默认配置）。

> 本次安装的测试平台是一台配备 4G 内存和 2 个核心的 Akamai Edge Linode。

## 安装 Spin

你需要[安装 Spin](https://developer.fermyon.com/spin/quickstart)。最简单的方式是
使用下面的一行命令获取最新版本的 Spin：

```console { data-plausible="copy-quick-deploy-sample" }
$ curl -fsSL https://developer.fermyon.com/downloads/install.sh | bash
```

通常，接下来你需要把 `spin` 移动到 `/usr/local/bin` 或 `$PATH` 上的其他位置：

```console { data-plausible="copy-quick-deploy-sample" }
$ sudo mv spin /usr/local/bin/spin
```

你可以用 `which spin` 来测试它是否在 `$PATH` 上。如果返回为空，你就需要调整
`$PATH` 变量，或者把 Spin 放到已在 `$PATH` 上的某个位置。

## 一个完成这些操作的脚本

如果你更愿意使用 shell 脚本，可以看看[这个
Gist](https://gist.github.com/kate-goldenring/47950ccb30be2fa0180e276e82ac3593#file-spinkube-on-microk8s-sh)，
它是很好的起点。它会安装 Microk8s 和 SpinKube，并对两者进行配置。

## 在 Ubuntu 上安装 Microk8s

使用 `snap` 安装 microk8s：

```console { data-plausible="copy-quick-deploy-sample" }
$ sudo snap install microk8s --classic
```

这会安装并启动 Microk8s。在继续之前，你可能想先阅读[官方安装说明](https://microk8s.io/docs/getting-started)。
等待一两分钟后，使用 `microk8s status` 命令确认 Microk8s 正在运行。

接下来，启用 TLS 证书管理器：

```console { data-plausible="copy-quick-deploy-sample" }
$ microk8s enable cert-manager
```

现在我们就可以安装用于运行 Spin 应用的 SpinKube 环境了。

### 安装 SpinKube

SpinKube 提供了运行 Spin 无服务器应用的完整工具链。在继续之前，你可能想先熟悉一下
[SpinKube 快速开始](https://www.spinkube.dev/docs/install/quickstart/)指南。

首先，我们需要应用 SpinKube 的 CRD：

```console { data-plausible="copy-quick-deploy-sample" }
$ microk8s kubectl apply -f https://github.com/spinframework/spin-operator/releases/download/v0.6.1/spin-operator.crds.yaml
```

这些应该会立即应用完成。

接下来，我们还需要安装 Runtime Class Manager，因为 Microk8s 尚未内置它。它负责在尚未
内置 WebAssembly shim 的 Kubernetes 节点上安装这些 shim。更多细节请参阅项目的
[README.md](https://github.com/spinframework/runtime-class-manager/blob/main/README.md)。

```console { data-plausible="copy-quick-deploy-sample" }
microk8s helm upgrade --install runtime-class-manager  \
  --namespace runtime-class-manager \
  --create-namespace \
  --version 0.2.0 \
  oci://ghcr.io/spinframework/charts/runtime-class-manager

# Create Shim resource for installing the containerd-shim-spin binary
kubectl apply -f https://github.com/spinframework/containerd-shim-spin/releases/download/v0.27.2/runtime-class-manager-shim-v1alpha1-v0.27.2.yaml

# Label all Nodes where the shim should be installed (and thus where Spin Apps may run)
# Note: this specific key and value matches the nodeSelector configuration used in the Shim resource above
microk8s kubectl label node --all spin=true
```

> 上面的最后一行告诉 Microk8s，集群中的所有节点（在本例中只有一个节点）都可以运行
> Spin 应用。

接下来，我们需要使用 Helm（Microk8s 已内置）安装 SpinKube 的 operator：

```console { data-plausible="copy-quick-deploy-sample" }
$ microk8s helm upgrade --install spin-operator --namespace spin-operator --create-namespace --version 0.6.1 --wait oci://ghcr.io/spinframework/charts/spin-operator

```

现在主 operator 已经安装完成。还剩最后一步：我们需要安装 shim executor，它是一个特殊的
CRD，让我们可以为 WebAssembly 使用多个 executor。

```console { data-plausible="copy-quick-deploy-sample" }
$ microk8s kubectl apply -f https://github.com/spinframework/spin-operator/releases/download/v0.6.1/spin-operator.shim-executor.yaml

```

现在 SpinKube 已经安装完成！

### 在 SpinKube 中运行应用

接下来，我们可以在 Microk8s 中运行一个简单的 Spin 应用。

虽然我们可以编写常规的 deployment 或 pod 规约，但部署 Spin 应用最简单的方式是创建一个
简单的 `SpinApp` 资源。让我们使用 SpinKube 提供的简单示例：

```console { data-plausible="copy-quick-deploy-sample" }
$ microk8s kubectl apply -f https://raw.githubusercontent.com/spinframework/spin-operator/main/config/samples/simple.yaml
```

上面的命令会安装一个简单的 `SpinApp` YAML，其内容如下：

```yaml
apiVersion: core.spinkube.dev/v1alpha1
kind: SpinApp
metadata:
  name: simple-spinapp
spec:
  image: "ghcr.io/spinkube/containerd-shim-spin/examples/spin-rust-hello:v0.13.0"
  replicas: 1
  executor: containerd-shim-spin
```

你可以在[文档](https://www.spinkube.dev/docs/reference/spin-app/)中阅读相关定义。

它启动可能需要一小会儿时间，但你应该可以通过 `microk8s
kubectl get pods` 看到该应用：

```console { data-plausible="copy-quick-deploy-sample" }
$ microk8s kubectl get po
NAME                              READY   STATUS    RESTARTS   AGE
simple-spinapp-5c7b66f576-9v9fd   1/1     Running   0          45m
```

### 故障排查

如果 `STATUS` 一直停留在 `ContainerCreating`，可能是 Runtime Class Manager 未能正确安装
`containerd-shim-spin` 二进制文件。要查看日志，可以尝试：

```console { data-plausible="copy-quick-deploy-sample" }
$ microk8s kubectl logs -n runtime-class-manager -l app.kubernetes.io/name=runtime-class-manager
```

### 测试 Spin 应用

测试 Spin 应用最简单的方法是将端口从 Spin 应用转发到外部主机：

```console { data-plausible="copy-quick-deploy-sample" }
$ microk8s kubectl port-forward services/simple-spinapp 8080:80
```

然后你可以运行 `curl localhost:8080/hello`

```console { data-plausible="copy-quick-deploy-sample" }
$ curl localhost:8080/hello
Hello world from Spin!
```

### 接下来做什么

到目前为止，我们安装了 Microk8s、SpinKube 和一个单独的 Spin 应用。要构建一个更接近
生产可用的环境，你可以考虑：

- 生成 TLS 证书并将其挂载到 Spin 应用上以支持 HTTPS。如果你在使用 ingress controller
  （见下文），[这里是 TLS 配置的文档](https://kubernetes.github.io/ingress-nginx/user-guide/tls/)。
- 配置[集群 ingress](https://microk8s.io/docs/addon-ingress)
- 再创建一台 Linode Edge 实例，搭建一个[双节点 Microk8s
  集群](https://microk8s.io/docs/clustering)。

### 附加内容：配置 Microk8s ingress

Microk8s 内置了一个基于 NGINX 的 ingress controller，它与 Spin 应用配合得很好。

启用 ingress controller：`microk8s enable ingress`

现在我们可以创建一个 ingress，把流量路由到 `simple-spinapp` 应用。创建文件
`ingress.yaml`，内容如下。注意 [`service.name`](http://service.name) 就是我们的
Spin 应用名称。

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: http-ingress
spec:
  rules:
    - http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: simple-spinapp
                port:
                  number: 80
```

使用 `microk8s kubectl -f ingress.yaml` 安装上述内容。稍等片刻后，你应该就能运行
`curl [localhost](http://localhost)` 并看到 `Hello World!`。

## 总结

在本指南中，我们安装了 Spin、Microk8s 和 SpinKube，并运行了一个 Spin 应用。

要进一步了解 Spin 应用的更多功能，请访问 [Spin 开发者文档](https://developer.fermyon.com/spin)。
你也可以在 [Spin Up Hub](https://developer.fermyon.com/hub) 上查看各种示例。

如果想尝试不同的 Kubernetes 配置，请查看[其他安装指南](https://www.spinkube.dev/docs/install/)。
