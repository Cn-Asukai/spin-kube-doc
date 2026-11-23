---
title: 故障排除
description: 排查 SpinKube 的常见错误和问题。
weight: 13
aliases:
  - /docs/spin-operator/support/troubleshooting
---

以下列出了常见的错误信息以及相应的故障排除建议，希望能对你的工作有所帮助。

## SpinKube 支持政策

SpinKube 在尽力而为（best-effort）的基础上提供支持。对于按照文档手动安装 SpinKube 的用户，请在 [Spin Operator 仓库](https://github.com/spinframework/spin-operator/issues/new)中报告问题。对于通过 Azure Marketplace 安装的用户，请在 [Azure 仓库](https://github.com/spinframework/azure/issues/new)中开一个 issue 以寻求帮助。如果你的问题比较紧急，也可以在 [Slack](https://cloud-native.slack.com/archives/C06PC7JA1EE) 中提出。

## 下载 Helm chart 失败

虽然 [Spin Operator Helm chart](https://github.com/spinframework/spin-operator/pkgs/container/charts%2Fspin-operator) 是公开的，可以匿名拉取，但如果你之前曾对 ghcr.io registry 进行过身份认证，而认证令牌后来已过期，拉取 chart 时就可能出错。

错误大致如下所示：

```console
helm install spin-operator \
 --namespace spin-operator --create-namespace --version 0.6.1 --wait oci://ghcr.io/spinframework/charts/spin-operator
Error: INSTALLATION FAILED: failed to download "oci://ghcr.io/spinframework/charts/spin-operator" at version "0.6.1"
```

解决方法是：要么使用有效的令牌重新向 registry 进行认证（例如 `docker login ghcr.io`），要么退出登录并以匿名方式拉取 chart（例如 `docker logout ghcr.io`）。

## No endpoints available for service "spin-operator-webhook-service"

在按照快速开始指南操作时，运行 `kubectl apply -f
https://github.com/spinframework/spin-operator/releases/download/v0.6.1/spin-operator.shim-executor.yaml`
命令后可能出现如下错误：

```console
Error from server (InternalError): error when creating "https://github.com/spinframework/spin-operator/releases/download/v0.6.1/spin-operator.shim-executor.yaml": Internal error occurred: failed calling webhook "mspinappexecutor.kb.io": failed to call webhook: Post "https://spin-operator-webhook-service.spin-operator.svc:443/mutate-core-spinkube-dev-v1alpha1-spinappexecutor?timeout=10s": no endpoints available for service "spin-operator-webhook-service"
```

要解决上述错误，首先检查 Spin Operator 是否正在运行：

```console
get pods -n spin-operator
NAME                                                READY   STATUS              RESTARTS   AGE
spin-operator-controller-manager-5bdcdf577f-htshb   0/2     ContainerCreating   0          26m
```

如果得到上述结果（READY 为 0/2），则使用结果中的名称对 spin-operator 执行 `kubectl
describe pod`：

```console
kubectl describe pod spin-operator-controller-manager-5bdcdf577f-htshb -n spin-operator
```

如果上述命令的输出中包含 `SetUp failed for volume "cert" : secret
"webhook-server-cert" not found` 这条消息，请检查证书。spin operator 需要该证书来提供 webhook 服务，证书缺失可能是 spin operator 无法启动的原因之一。

检查证书的命令及期望的输出如下：

```console
kubectl get certificate -n spin-operator
NAME                         READY   SECRET                AGE
spin-operator-serving-cert   True    webhook-server-cert   11m
```

你可能得到的是 `No resources found in
spin-operator namespace.` 这样的响应，而不是上面期望的输出。例如：

```console
kubectl get certificate -n spin-operator
No resources found in spin-operator namespace.
```

要解决此问题，请尝试重新安装 Spin Operator。不过这一次，请使用 `helm upgrade --install` 语法，而不只是 `helm install`：

```console
helm upgrade --install spin-operator \
  --namespace spin-operator \
  --create-namespace \
  --version 0.6.1 \
  --wait \
  oci://ghcr.io/spinframework/charts/spin-operator
```

Spin Operator 安装完成后，你可以再次运行 `kubectl apply -f
https://github.com/spinframework/spin-operator/releases/download/v0.6.1/spin-operator.shim-executor.yaml`
命令。此时问题应该已经解决。

## Error Validating Data: Connection Refused

在尝试运行 `kubectl apply -f <URL>` 命令时（例如安装 `cert-manager`
等），你可能会遇到类似下面的错误：

```
$ kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.20.0/cert-manager.yaml

error: error validating "https://github.com/cert-manager/cert-manager/releases/download/v1.20.0/cert-manager.yaml": error validating data: failed to download openapi: Get "https://127.0.0.1:6443/openapi/v2?timeout=32s": dial tcp 127.0.0.1:6443: connect: connection refused; if you choose to ignore these errors, turn validation off with --validate=false
```

这是因为不存在任何集群。你可以按照[快速开始指南]({{< ref
"quickstart" >}})创建一个集群。


## 集群已存在

在尝试创建集群（例如名为 `wasm-cluster` 的集群）时，你可能会收到类似下面的错误消息：

```console
FATA[0000] Failed to create cluster 'wasm-cluster' because a cluster with that name already exists
```

### 集群信息

安装了 `kind` 之后，你可以使用以下命令获取集群列表：

```console
$ kind get clusters
wasm-cluster
```

安装了 `kubectl` 之后，你可以使用以下命令导出集群信息（输出会详细得多）：

```console
kubectl cluster-info dump
```

### 删除集群

安装了 `kind` 之后，你可以按名称删除集群，命令如下所示：

```sh
kind delete cluster --name wasm-cluster
```

## Too long: must have at most 262144 bytes

运行 `kubectl apply -f my-file.yaml` 时，如果 yaml 文件过大，可能出现如下错误：

```console
Too long: must have at most 262144 bytes
```

使用 `--server-side=true` 选项可以解决此问题：

```console
kubectl apply --server-side=true -f my-file.yaml
```

## Redis Operator

安装 Redis Operator 时遇到过一个错误：

```console
$ helm repo add redis-operator https://spotahome.github.io/redis-operator
"redis-operator" has been added to your repositories
$ helm repo update
Hang tight while we grab the latest from your chart repositories...
...Successfully got an update from the "redis-operator" chart repository
Update Complete. ⎈Happy Helming!⎈
$ helm install redis-operator redis-operator/redis-operator
Error: INSTALLATION FAILED: failed to install CRD crds/databases.spotahome.com_redisfailovers.yaml: error parsing : error converting YAML to JSON: yaml: line 4: did not find expected node content
```

在等待[该 PR 修复](https://github.com/spotahome/redis-operator/pull/685)合并期间，使用了以下命令强制安装另一个版本的 Redis Operator：

```console
$ helm install redis-operator redis-operator/redis-operator --version 3.2.9
NAME: redis-operator
LAST DEPLOYED: Mon Jan 22 12:33:54 2024
NAMESPACE: default
STATUS: deployed
REVISION: 1
TEST SUITE: None
```

## error: requires go version

在构建 [cpu-load-gen](https://github.com/spinframework/spin-operator/tree/main/apps/cpu-load-gen) 这类 Spin 应用时，如果你的 TinyGo 不是最新版本，可能会遇到如下错误。该错误提示需要 go 版本 `1.18` 到 `1.20`，但实际情况未必如此。我们**确实**建议你安装最新的 go（例如 `1.21`），无需降级。请直接[安装最新版本的 TinyGo](https://tinygo.org/) 来解决此错误：

```console
user@user:~/spin-operator/apps/cpu-load-gen$ spin build
Building component cpu-load-gen with `tinygo build -target=wasi -gc=leaking -no-debug -o main.wasm main.go`
error: requires go version 1.18 through 1.20, got go1.21
```
