---
title: 集成
description: SpinKube 各项集成的高层次概览。
categories: [SpinKube]
tags: [Integrations]
aliases:
- /docs/integrations
---

# SpinKube 集成

## KEDA

[Kubernetes Event-Driven Autoscaling（KEDA）](https://keda.sh/) 为 Kubernetes 工作负载提供事件驱动的自动伸缩能力。它使 Kubernetes 能够根据外部事件（例如队列中的消息）自动伸缩应用，从而实现更高效的资源利用，并基于实际需求而非静态指标进行响应式伸缩。KEDA 在 Kubernetes 与各类事件源之间充当桥梁，让你在云原生环境中更轻松地动态伸缩应用。如果你想了解 SpinKube 如何与 KEDA 集成，请阅读[《使用 KEDA 进行伸缩》教程]({{< ref "scaling-with-keda" >}})，该教程会将一个 SpinApp 以及 KEDA ScaledObject 实例部署到集群中。教程还会使用 Bombardier 生成流量，以测试 KEDA 对 SpinApp 的伸缩效果。

## Rancher Desktop

[Rancher Desktop 1.13.0 版本](https://www.suse.com/c/rancher_blog/rancher-desktop-1-13-with-support-for-webassembly-and-more/)已提供对运行 WebAssembly（Wasm）容器并将其部署到 Kubernetes 的基本支持。Rancher Desktop 由 SUSE 出品，是一款开源应用，为你在桌面上使用容器和 Kubernetes 提供了所需的一切。如果你想了解 SpinKube 如何与 Rancher Desktop 集成，请阅读[《与 Rancher Desktop 集成》教程]({{< ref
"/docs/install/rancher-desktop" >}})，该教程会逐步介绍安装 SpinKube 所需组件的过程（包括用于 SSL 的 CertManager、CRD，以及通过 Helm chart 安装的 Runtime Class Manager）。随后教程会演示如何创建一个简单的 Spin JavaScript 应用，并将其部署到 Rancher Desktop 的本地集群中。
