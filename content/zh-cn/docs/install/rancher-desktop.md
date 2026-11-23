---
title: 在 Rancher Desktop 上安装
description: 本教程展示如何将 SpinKube 与 Rancher Desktop 集成。
date: 2024-02-16
categories: [Spin Operator]
tags: [Tutorials]
weight: 7
aliases:
- /docs/spin-operator/tutorials/integrating-with-rancher-desktop
---

[Rancher Desktop](https://rancherdesktop.io/) 是一个开源应用，为在桌面环境中使用容器和
Kubernetes 提供了所有必备功能。

### 前置条件

  - 与 Rancher Desktop 兼容的操作系统（Windows、macOS 或 Linux）。
  - 计算机上的管理员或超级用户权限。

### 步骤 1：安装 Rancher Desktop

  1. **下载 Rancher Desktop**：
      - 前往 [Rancher Desktop releases
        页面](https://github.com/rancher-sandbox/rancher-desktop/releases)。本文档使用 Rancher Desktop `1.19.1` 和 Spin `v3.2.0` 进行了测试，但更新的版本应该也能正常工作。
      - 选择适合你操作系统的安装程序。
  2. **安装 Rancher Desktop**：
      - 运行下载好的安装程序，按照屏幕上的提示完成安装。

### 步骤 2：配置 Rancher Desktop

  - 打开 Rancher Desktop
  - 将 `containerd` 配置为你的容器运行时引擎（位于 **Preferences** -> **Container Engine** 下）。
  - 确保在 **Preferences** → **Container Engine** 部分勾选了 Enable Wasm 选项。切记要
    始终应用你的更改。

![Rancher 偏好设置](../rancher-desktop-preferences.png)

  - 进入 **Preferences** -> **Kubernetes** 菜单。
  - 启用 Kubernetes、Traefik 和 Spin Operator（在 **Preferences** -> **Kubernetes** 下，
    确保勾选了 **Enable Kubernetes**、**Enable Traefik** 和 **Install Spin Operator** 选项。）

![Rancher Desktop](../rancher-desktop-kubernetes.png)

  - 请确保在 Kubernetes 上下文中选择了 `rancher-desktop`：`kubectl config use-context rancher-desktop`

  - 更改应用完成后，进入 **Cluster Dashboard** -> **Workloads**。你应该能看到
    `spin-operator-controller-manager` 已部署到 `spin-operator` 命名空间。

### 步骤 3：创建 Spin 应用

1. **打开一个终端**（根据你的操作系统选择命令提示符、Terminal 或等效工具）。
2. **创建一个新的 Spin 应用**：以下命令使用 `http-js` 模板创建一个名为 `hello-k3s` 的
   新 Spin 应用。

```bash
  $ spin new -t http-js hello-k3s --accept-defaults
  $ cd hello-k3s
```

3. 我们可以编辑 `/src/index.js` 文件，让工作负载返回字符串 "Hello from Rancher Desktop"：

```javascript
import { AutoRouter } from 'itty-router';

let router = AutoRouter();

router
    .get("/", () => new Response("Hello from Rancher Desktop")) // <-- this changed
    .get('/hello/:name', ({ name }) => `Hello, ${name}!`)

addEventListener('fetch', (event) => {
    event.respondWith(router.fetch(event.request));
});
```

### 步骤 4：部署你的应用

1. **将应用推送到镜像仓库**：

```bash
$ npm install
$ spin build
$ spin registry push ttl.sh/hello-k3s:0.1.0
```

将 `ttl.sh/hello-k3s:0.1.0` 替换为你的镜像仓库 URL 和标签。

2. **将你的 Spin 应用部署到集群**：

使用 [`spin-kube` 插件](https://github.com/spinframework/spin-plugin-kube)将你的应用部署到集群：

```sh
spin kube scaffold --from ttl.sh/hello-k3s:0.1.0 | kubectl apply -f -
```

如果点击 Rancher Desktop 的 “Cluster Dashboard”，我们可以在 “Workloads” 下拉区域中看到
`hello-k3s` 正在运行：

![Rancher Desktop Preferences Wasm](../rancher-desktop-cluster.png)

要在集群外部访问我们的应用，可以进行端口转发，以便从主机访问该应用：

```bash
$ kubectl port-forward svc/hello-k3s 8083:80
```

要在本地测试，可以发送如下请求：

```bash
$ curl localhost:8083
Hello from Rancher Desktop
```

执行上面的 `curl` 命令，或在浏览器中快速访问 localhost:8083，都会返回 "Hello
from Rancher Desktop" 消息：

![Hello from Rancher Desktop](../rancher-desktop-hello.png)
