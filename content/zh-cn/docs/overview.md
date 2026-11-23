---
title: 概述
description: SpinKube 各子项目的高层次概述。
weight: 1
categories: [SpinKube]
tags: []
---

# 项目概述

[SpinKube](https://github.com/spinframework) 是一个开源项目，它通过 [Spin
Operator](https://github.com/spinframework/spin-operator) 配合 [runwasi](https://github.com/containerd/runwasi) 和
[runtime class manager](https://github.com/spinframework/runtime-class-manager)，简化了在 Kubernetes 上部署和运维 Wasm 工作负载的体验。

借助 SpinKube，你可以充分利用 WebAssembly（Wasm）为工作负载带来的优势：

- 与容器镜像相比，制品（artifact）体积显著更小。
- 制品可以通过网络快速拉取，并以更快的速度启动（\*注意：我们已知悉仍有若干优化需要实现，以进一步提升工作负载的启动时间）。
- 空闲时所需的资源大幅减少。

得益于 SpinKube，我们在实现上述优势的同时，还能与 Kubernetes 原生机制集成，包括 DNS、探针、自动伸缩、指标，以及众多其他云原生和 CNCF 项目。

![SpinKube 项目概述图](../spinkube-overview-diagram.png)

SpinKube 会监视 [Spin App 自定义资源]({{< ref "glossary#spinapp-manifest" >}})，并在 Kubernetes 集群中实现期望的状态。本项目的基础是使用
[kubebuilder](https://github.com/kubernetes-sigs/kubebuilder) 框架构建的，包含一个 Spin App
自定义资源定义（CRD）和控制器。

SpinKube 是 [云原生计算基金会（CNCF）](https://www.cncf.io/)的沙箱项目。

要开始使用，请查阅我们的[快速开始指南]({{< ref "quickstart" >}})。
