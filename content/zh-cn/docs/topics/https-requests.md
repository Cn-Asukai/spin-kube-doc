---
title: 发起 HTTPS 请求
description: 配置 Spin 应用以支持 HTTPS 请求。
date: 2024-09-03
categories: [Spin Operator]
tags: [Tutorials]
weight: 11
aliases:
- /docs/spin-operator/tutorials/https-requests
---

要启用 HTTPS 请求，必须为 [executor](https://www.spinkube.dev/docs/glossary/#spin-app-executor-crd) 配置证书。SpinKube 可以配置为使用默认证书或自定义证书。

如果证书配置不当就发起请求，你会遇到如下错误信息：`error trying to connect: unexpected EOF (unable to get local issuer certificate)`。

## 使用默认证书

将 `installDefaultCACerts` 设置为 `true`，SpinKube 就可以生成默认的 CA 证书包。这会创建一个名为 `spin-ca` 的 Secret，其中填充 curl 的[默认证书包](https://curl.se/ca/cacert.pem)。你也可以通过设置 `caCertSecret` 来指定自定义的 Secret 名称。

```yaml
apiVersion: core.spinkube.dev/v1alpha1
kind: SpinAppExecutor
metadata:
  name: containerd-shim-spin
spec:
  createDeployment: true
  deploymentConfig:
    runtimeClassName: wasmtime-spin-v2
    installDefaultCACerts: true
```

使用 kubectl 应用该 executor：

```console
kubectl apply -f myexecutor.yaml
```

## 使用自定义证书

根据你的证书文件创建一个 Secret：

```console
kubectl create secret generic my-custom-ca --from-file=ca-certificates.crt
```

配置 executor 使用该自定义证书 Secret：

```yaml
apiVersion: core.spinkube.dev/v1alpha1
kind: SpinAppExecutor
metadata:
  name: containerd-shim-spin
spec:
  createDeployment: true
  deploymentConfig:
    runtimeClassName: wasmtime-spin-v2
    caCertSecret: my-custom-ca
```

使用 kubectl 应用该 executor：

```console
kubectl apply -f myexecutor.yaml
```
