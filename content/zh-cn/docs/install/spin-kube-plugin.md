---
title: 安装 `spin kube` 插件
description: 学习如何安装 `kube` 插件。
categories: [guides]
tags: [plugins, kubernetes, spin]
weight: 3
aliases:
- /docs/spin-plugin-kube/installation
---

`spin`（即 Spin CLI）的 `kube` 插件为在 Kubernetes 环境中使用 Spin 应用提供了一流的体验。

## 前置条件

请确保你的机器上已安装 Spin CLI（[2.3.1 或更新版本](https://developer.fermyon.com/spin/v2/upgrade)）。

## 安装插件

在安装插件之前，你应该先从 spin-plugins 仓库获取最新的 Spin 插件列表：

```sh
# Update the list of latest Spin plugins
spin plugins update
Plugin information updated successfully
```

接下来，使用 `spin plugin install` 安装 `kube`：

```sh
# Install the latest kube plugin
spin plugins install kube
```

此时，查询已安装的 Spin 插件列表时，你应该能看到 `kube` 插件：

```sh
# List all installed Spin plugins
spin plugins list --installed

cloud 0.7.0 [installed]
cloud-gpu 0.1.0 [installed]
kube 0.1.1 [installed]
pluginify 0.6.1 [installed]
```

### 从源码编译

除了使用插件管理器之外，你还可以下载并手动安装该插件。手动安装通常用于测试尚未发布的改动。对普通用户而言，使用 Spin 的插件管理器安装插件是更好的选择。

请参阅 [spin-plugin-kube GitHub
仓库](https://github.com/spinframework/spin-plugin-kube)，了解如何从源码编译该插件。
