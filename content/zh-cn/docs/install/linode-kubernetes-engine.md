---
title: 在 Linode Kubernetes Engine（LKE）上安装
description: 本指南将带你完成在 [LKE](https://www.linode.com/docs/products/compute/kubernetes/) 上安装 SpinKube 的过程。
date: 2024-07-23
tags: [Installation]
weight: 6
---

本指南将逐步介绍如何在 Linode Kubernetes Engine（LKE）上安装和配置 SpinKube。

## 前置条件

本指南假设你已拥有一个 [Akamai Linode](https://login.linode.com/) 账户，该账户已完成配置，
并具有创建新 LKE 集群的足够权限。

你还需要在系统上安装较新版本的 `kubectl` 和 `helm`。

## 创建 LKE 集群

LKE 的控制平面是托管的，因此你只需要创建工作节点池。在本教程中，我们将使用最小可用的
工作节点创建一个 2 节点的 LKE 集群。对于安装 SpinKube 并运行大约 100 个以内的 Spin 应用来说，
这已经足够了。

如果你计划将容器与 Spin 应用混合部署，可能更倾向于使用更大的集群，因为容器消耗的资源
远多于 Spin 应用。

在 Linode 的 Web 控制台中，点击右侧导航栏中的 `Kubernetes`，然后点击 `Create Cluster`。

![下文所述的 LKE 创建界面](../lke-spinkube-create.png)

在这个界面上你只需做少量选择。以下是我们所做的配置：

* **集群名称**：我们将集群命名为 `spinkube-lke-1`。你可以按照自己喜欢的命名规范来命名。
* **区域**：我们选择了 `Chicago, IL (us-ord)` 区域，但你可以选择任意你喜欢的区域。
* **Kubernetes 版本**：最新受支持的 Kubernetes 版本是 `1.30`，所以我们选择了该版本。
* **高可用控制平面**：对于这个用于测试的集群，我们在 `HA Control Plane` 上选择了 `No`，
  因为我们不需要高可用。
* **节点池配置**：在 `Add Node Pools` 中，我们添加了两个 `Dedicated 4 GB` 节点，仅仅是为了
  展示一个运行多个节点的集群。对于 Spin 应用来说，两个节点已经足够，不过你可能更倾向于
  传统的 3 节点集群。点击 `Add` 添加这些节点，并忽略关于最小规格的警告。

设置完成后，点击 `Create Cluster`。

接下来会进入一个显示集群状态的页面。最初，你需要等待所有 `Node Pool` 启动完成。当所有
节点都上线后，下载 `kubeconfig` 文件，其名称类似于 `spinkube-lke-1-kubeconfig.yaml`。

> `kubeconfig` 文件中包含连接到新 LKE 集群的凭证。请不要共享该文件，也不要将其放在
> 公开的地方。

在后续所有操作中，你都需要将 `spinkube-lke-1-kubeconfig.yaml` 作为主 Kubernetes 配置文件。
最好的做法是设置环境变量 `KUBECONFIG` 指向该文件：

```console
$ export KUBECONFIG=/path/to/spinkube-lke-1-kubeconfig.yaml
```

你可以使用 `kubectl config view` 命令来测试：

```
$ kubectl config view
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: DATA+OMITTED
    server: https://REDACTED.us-ord-1.linodelke.net:443
  name: lke203785
contexts:
- context:
    cluster: lke203785
    namespace: default
    user: lke203785-admin
  name: lke203785-ctx
current-context: lke203785-ctx
kind: Config
preferences: {}
users:
- name: lke203785-admin
  user:
    token: REDACTED
```

这展示了我们的集群配置。你应该可以将 `lkeNNNNNN` 版本的编号与 Akamai Linode 控制面板中
显示的内容进行对照。

## 使用 Helm 安装 SpinKube

到这里，请[使用 Helm 安装 SpinKube](installing-with-helm)。只要你的 `KUBECONFIG`
环境变量指向正确的集群，那里文档中介绍的安装方法就可以正常工作。

完成这些安装步骤后，请返回本页来安装第一个应用。

## 创建第一个应用

我们将使用 `spin kube` 插件来生成一个新应用的骨架。如果你运行以下命令时尚未安装 `kube`
插件，系统会先提示你安装该插件。请选择 `yes` 进行安装。

我们将指向一个已有的 Spin 应用——一个[用 Rust 编写的 Hello World 程序](https://github.com/fermyon/spin/tree/main/examples/http-rust)，
它被编译为 Wasm 并存储在 GitHub Container Registry（GHCR）中：

```console
$ spin kube scaffold --from ghcr.io/spinkube/containerd-shim-spin/examples/spin-rust-hello:v0.13.0 > hello-world.yaml
```

> 请注意，Spin 应用本质上是 WebAssembly，尽管它们并不是 Docker 容器，但可以[存储在大多数容器镜像仓库中](https://developer.fermyon.com/spin/v2/registry-tutorial)。

该命令会将以下内容写入 `hello-world.yaml`：

```yaml
apiVersion: core.spinkube.dev/v1alpha1
kind: SpinApp
metadata:
  name: spin-rust-hello
spec:
  image: "ghcr.io/spinkube/containerd-shim-spin/examples/spin-rust-hello:v0.13.0"
  executor: containerd-shim-spin
  replicas: 2
```

使用 `kubectl apply`，我们就可以部署该应用：

```console
$ kubectl apply -f hello-world.yaml
spinapp.core.spinkube.dev/spin-rust-hello created
```

在 SpinKube 中，SpinApp 会以 `Pod` 资源的形式部署，因此我们可以用 `kubectl
get pods` 查看该应用：

```console
$ kubectl get pods
NAME                              READY   STATUS    RESTARTS   AGE
spin-rust-hello-f6d8fc894-7pq7k   1/1     Running   0          54s
spin-rust-hello-f6d8fc894-vmsgh   1/1     Running   0          54s
```

状态显示为 `Running`，说明我们的应用已经就绪。

## 使用 NodeBalancer 将应用发布到公网

默认情况下，Spin 应用会以内部服务的形式部署。但在 Linode 上，你可以通过 `Service`
对象来供应一个 [NodeBalancer](https://www.linode.com/docs/products/networking/nodebalancers/)。
下面这个 `hello-world-service.yaml` 可以为我们供应一个 `nodebalancer`：

```yaml
apiVersion: v1
kind: Service
metadata:
  name: spin-rust-hello-nodebalancer
  annotations:
    service.beta.kubernetes.io/linode-loadbalancer-throttle: "4"
  labels:
    core.spinkube.dev/app-name: spin-rust-hello
spec:
  type: LoadBalancer
  ports:
  - name: http
    port: 80
    protocol: TCP
    targetPort: 80
  selector:
    core.spinkube.dev/app.spin-rust-hello.status: ready
  sessionAffinity: None
```

当 LKE 收到一个 `type` 为 `LoadBalancer` 的 `Service` 时，它会为你供应一个 NodeBalancer。

> 你只需将文件中所有 `spin-rust-hello` 替换为自己应用的名称，即可针对你的应用进行定制。

我们可以对上述文件运行 `kubectl apply` 来创建 NodeBalancer：

```console
$ kubectl apply -f hello-world-nodebalancer.yaml
service/spin-rust-hello-nodebalancer created
```

供应新的 NodeBalancer 可能需要一些时间，但我们可以使用
`kubectl get service spin-rust-hello-nodebalancer` 来获取其 IP 地址：

```console
$ get service spin-rust-hello-nodebalancer
NAME                           TYPE           CLUSTER-IP       EXTERNAL-IP       PORT(S)        AGE
spin-rust-hello-nodebalancer   LoadBalancer   10.128.235.253   172.234.210.123   80:31083/TCP   40s
```

`EXTERNAL-IP` 字段告诉我们 NodeBalancer 使用的公网 IP。现在我们可以通过互联网访问它，
使用 `curl`，或者在浏览器中输入 URL `http://172.234.210.123/hello`。

```console
$ curl 172.234.210.123/hello
Hello world from Spin!
```

## 删除我们的应用

要删除这个示例应用，我们先删除 NodeBalancer，然后再删除应用：

```console
$ kubectl delete service spin-rust-hello-nodebalancer
service "spin-rust-hello-nodebalancer" deleted
$ kubectl delete spinapp spin-rust-hello
spinapp.core.spinkube.dev "spin-rust-hello" deleted
```

> 如果你直接在 Linode 控制台中删除 NodeBalancer，Kubernetes 中的 `Service` 记录并不会被
> 自动删除，从而造成不一致。因此，最好使用 `kubectl delete service` 来删除你的
> NodeBalancer。

如果你也不再需要 LKE 集群，最简单的删除方式是登录 Akamai Linode 控制面板，进入
`Kubernetes`，然后按下 `Delete` 按钮。这将销毁所有工作节点并注销控制平面。
