---
title: 连接到你的应用
description: 了解如何连接到你的应用。
weight: 13
---

本主题指南介绍如何连接部署到 SpinKube 的应用，包括如何在本地开发时使用端口转发，以及如何在生产环境中使用 Ingress 规则。

## 运行示例应用

让我们先向你的 Kubernetes 集群部署一个示例应用。整个教程中我们将使用这个应用来演示如何连接它。

如果你还没有搭建 Kubernetes 集群，请参阅[快速开始指南]({{< ref "quickstart" >}})。

```shell
kubectl apply -f https://raw.githubusercontent.com/spinkube/spin-operator/main/config/samples/simple.yaml
```

SpinKube 部署应用时，会创建一个 Kubernetes Service 将应用暴露给集群。你可以使用以下命令查看部署状态：

```shell
kubectl get services
```

你应该会看到一个名为 `simple-spinapp` 的 Service，类型为 `ClusterIP`。这意味着该 Service 只能从集群内部访问。

```shell
NAME             TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)   AGE
simple-spinapp   ClusterIP   10.43.152.184    <none>        80/TCP    1m
```

我们将通过这个 Service 连接到你的应用。

## 端口转发

这种方式非常适合调试和开发。它允许你将本地端口转发到该 Service。

将端口 8083 转发到该 Service，以便从你的计算机访问它：

```shell
kubectl port-forward svc/simple-spinapp 8083:80
```

你应该可以在浏览器中通过 [http://localhost:8083](http://localhost:8083) 访问它：

```shell
curl http://localhost:8083
```

你应该会看到类似 "Hello world from Spin!" 的消息。

这是测试应用最简单的方式之一。但是，它并不适合生产环境使用。下一节将介绍如何使用 Ingress 控制器将你的应用暴露到互联网。

## Ingress

Ingress 将来自集群外部的 HTTP 和 HTTPS 路由暴露给集群内的 Service。流量路由由 Ingress 资源上定义的规则控制。

下面是一个简单的示例，其中一个 Ingress 将其所有流量转发到一个 Service：

![Ingress](../ingress.svg)

（图片来源：[Kubernetes
文档](https://kubernetes.io/docs/concepts/services-networking/ingress/)）

Ingress 可以配置为为应用提供外部可访问的 URL、负载均衡流量、终止 SSL / TLS，以及提供基于名称的虚拟主机。Ingress 控制器负责实现 Ingress 的要求，通常使用负载均衡器，不过它也可能配置你的边缘路由器或额外的前端来帮助处理流量。

### 前提条件

要满足 Ingress 规则的要求，你必须拥有一个 [Ingress
控制器](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/)。在没有控制器的情况下创建 Ingress 规则不会产生任何效果。

理想情况下，所有 Ingress 控制器都应该符合参考规范。但实际情况是，各种 Ingress 控制器的运作方式略有不同。请务必查阅你所使用的 Ingress 控制器的文档，了解其具体工作方式。

[ingress-nginx](https://kubernetes.github.io/ingress-nginx/deploy/) 是一个流行的 Ingress 控制器，因此本教程将使用它：

```shell
helm upgrade --install ingress-nginx ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace ingress-nginx --create-namespace
```

等待 Ingress 控制器就绪：

```shell
kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=120s
```

### 查看 Ingress 控制器的外部 IP 地址

如果你的 Kubernetes 集群是一个支持 `LoadBalancer` 类型 Service 的“真实”集群，它会为 Ingress 控制器分配一个外部 IP 地址或 FQDN。

使用以下命令查看该 IP 地址或 FQDN：

```shell
kubectl get service ingress-nginx-controller --namespace=ingress-nginx
```

它就是 `EXTERNAL-IP` 字段。如果该字段显示 `<pending>`，说明你的 Kubernetes 集群无法创建负载均衡器。通常这是因为该集群不支持 `LoadBalancer` 类型的 Service。

获得外部 IP 地址（或 FQDN）后，请设置一条指向它的 DNS 记录。关于如何向你的域名添加新的 DNS 记录，请参阅你的 DNS 服务商的文档。

你需要创建一条指向该外部 IP 地址的 A 记录。假设你的外部 IP 地址是 `<EXTERNAL-IP>`，则可以创建如下记录：

```shell
A    myapp.spinkube.local    <EXTERNAL-IP>
```

向你的域名添加 DNS 记录并等待其生效后，接下来就可以创建 Ingress 资源了。

### 创建 Ingress 资源

创建一个将流量路由到 `simple-spinapp` Service 的 Ingress 资源。以下示例假设你已经为 `myapp.spinkube.local` 设置了 DNS 记录：

```shell
kubectl create ingress simple-spinapp --class=nginx --rule="myapp.spinkube.local/*=simple-spinapp:80"
```

关于上面的命令，有几点说明：

- `simple-spinapp` 是 Ingress 资源的名称。
- `myapp.spinkube.local` 是 Ingress 将为其路由流量的主机名。这就是你之前设置的 DNS 记录。
- `simple-spinapp:80` 是 SpinKube 为我们创建的 Service。应用在端口 80 上监听请求。

假设 DNS 已正确生效，当你连接到 http://myapp.spinkube.local/ 时，应该会看到类似 "Hello world from Spin!" 的消息。

恭喜，你正在对外提供一个托管在 Kubernetes 集群上的公开网站！🎉

### 使用 kubectl port-forward 连接

这是一种快速测试 Ingress 配置的方式，无需设置 DNS 记录，也适用于不支持 `LoadBalancer` 类型 Service 的集群。

打开一个新终端，将 localhost 的 8080 端口转发到 Ingress 控制器：

```shell
kubectl port-forward --namespace=ingress-nginx service/ingress-nginx-controller 8080:80
```

然后，在另一个终端中测试 Ingress 配置：

```shell
curl --resolve myapp.spinkube.local:8080:127.0.0.1 http://myapp.spinkube.local:8080/hello
```

你应该会看到类似 "Hello world from Spin!" 的消息。

如果你想在浏览器中查看应用的运行情况，可以修改你的 `/etc/hosts` 文件，将来自 `myapp.spinkube.local` 的请求解析到 Ingress 控制器：

```shell
127.0.0.1       myapp.spinkube.local
```
