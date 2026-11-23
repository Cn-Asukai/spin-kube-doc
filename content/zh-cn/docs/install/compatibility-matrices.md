---
title: Executor 兼容性矩阵
description: 各 SpinKube executor 的兼容性矩阵
date: 2024-11-08
categories: [Spin Operator]
tags: [reference]
weight: 99
---

## `containerd-shim-spin` Executor

[Spin containerd shim](https://github.com/spinframework/containerd-shim-spin) 项目是 Spin 的一种 containerd shim 实现。

### Spin Operator 与 Shim 功能对照表

如果 `SpinApp` 中配置的某个功能在所使用的 shim 版本中不受支持，应用可能无法按预期运行。下表列出了支持特定功能的 [Spin
containerd shim](https://github.com/spinframework/containerd-shim-spin)、Spin Operator 和 `spin kube`
插件的版本。

| 功能                 | SpinApp 字段       | Shim 版本    | Spin Operator 版本    | `spin kube` 插件版本      |
|----------------------|--------------------|--------------|-----------------------|----------------------------|
| OTEL Traces          | `otel`             | v0.15.0      | v0.3.0                | NA                         |
| Selective Deployment | `components`       | v0.17.0      | v0.4.0                | v0.3.0                     |
| Invocation Limits    | `invocationLimits` | v0.20.0      | v0.6.0                | NA                         |

> NA 表示该功能在对应项目中尚未提供

### Spin 与 Spin Containerd Shim 版本对照表

为了追踪 Spin 功能的可用性和 Spin SDK 的兼容性，下表列出了 [Spin containerd
shim](https://github.com/spinframework/containerd-shim-spin) 所使用的各 Spin 运行时版本。

| Shim 版本      | Spin 版本                                                          |
|---------------|--------------------------------------------------------------------|
| **Spin v4.x** |                                                                    |
| *v0.27.2*     | [Spin v4.2.6](https://github.com/fermyon/spin/releases/tag/v4.2.6) |
| *v0.27.1*     | [Spin v4.2.5](https://github.com/fermyon/spin/releases/tag/v4.2.5) |
| *v0.27.0*     | [Spin v4.2.5](https://github.com/fermyon/spin/releases/tag/v4.2.5) |
| *v0.26.0*     | [Spin v4.1.0](https://github.com/fermyon/spin/releases/tag/v4.1.0) |
| *v0.25.1*     | [Spin v4.0.0](https://github.com/fermyon/spin/releases/tag/v4.0.0) |
| *v0.25.0*     | [Spin v4.0.0](https://github.com/fermyon/spin/releases/tag/v4.0.0) |
| **Spin v3.x** |                                                                    |
| *v0.24.0*     | [Spin v3.6.3](https://github.com/fermyon/spin/releases/tag/v3.6.3) |
| *v0.23.0*     | [Spin v3.6.2](https://github.com/fermyon/spin/releases/tag/v3.6.2) |
| *v0.22.0*     | [Spin v3.5.0](https://github.com/fermyon/spin/releases/tag/v3.5.0) |
| *v0.21.0*     | [Spin v3.4.0](https://github.com/fermyon/spin/releases/tag/v3.4.0) |
| *v0.20.0*     | [Spin v3.3.1](https://github.com/fermyon/spin/releases/tag/v3.3.1) |
| *v0.19.0*     | [Spin v3.2.0](https://github.com/fermyon/spin/releases/tag/v3.2.0) |
| *v0.18.0*     | [Spin v3.1.2](https://github.com/fermyon/spin/releases/tag/v3.1.2) |
| *v0.17.0*     | [Spin v3.0.0](https://github.com/fermyon/spin/releases/tag/v3.0.0) |
| **Spin v2.x** |                                                                    |
| *v0.16.0*     | [Spin v2.6.0](https://github.com/fermyon/spin/releases/tag/v2.6.0) |
| *v0.15.1*     | [Spin v2.6.0](https://github.com/fermyon/spin/releases/tag/v2.6.0) |
| *v0.15.0*     | [Spin v2.6.0](https://github.com/fermyon/spin/releases/tag/v2.6.0) |
| *v0.14.1*     | [Spin v2.4.3](https://github.com/fermyon/spin/releases/tag/v2.4.3) |
| *v0.14.0*     | [Spin v2.4.2](https://github.com/fermyon/spin/releases/tag/v2.4.2) |
| *v0.13.0*     | [Spin v2.3.1](https://github.com/fermyon/spin/releases/tag/v2.3.1) |
| *v0.12.0*     | [Spin v2.2.0](https://github.com/fermyon/spin/releases/tag/v2.2.0) |
