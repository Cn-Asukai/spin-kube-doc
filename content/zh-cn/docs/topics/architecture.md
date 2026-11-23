---
title: SpinKube 概览
description: SpinKube 各子项目的高层次概览。
weight: 80
---

## spin-operator

[Spin Operator](https://github.com/spinframework/spin-operator/) 是一个 [Kubernetes
operator](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/)，它让平台工程师能够以自定义资源的形式将
[Spin 应用](https://developer.fermyon.com/spin) 部署到他们的 Kubernetes 集群中。Spin Operator
为那些希望在不牺牲性能的前提下提升效率、同时保持工作负载可移植性的平台工程师提供了一个优雅的解决方案。

### 为什么选择 Spin Operator？

通过将 Spin 框架的能力带入 Kubernetes 集群，Spin Operator 让应用开发者和平台工程师两全其美。对开发者而言，这意味着可以使用
Spin 开发者工具轻松构建可移植的 serverless 函数，并借助 Wasm 的强大能力与卓越性能。对平台工程师而言，则可以使用地道的
Kubernetes 原语（Secret、自动伸缩等）和工具，在生产环境中大规模地管理这些工作负载，从而提升整体运营效率。

### Spin Operator 是如何工作的？

Spin Operator 基于 [kubebuilder](https://github.com/kubernetes-sigs/kubebuilder) 框架构建，是一个 Kubernetes
operator。Kubernetes operator 用于在无需修改 Kubernetes API 的前提下，将 Kubernetes 的自动化能力扩展到以自定义资源形式定义的新对象上。Spin
Operator 由两个主要组件构成：
- 一个在 k8s 上定义和管理 Wasm 工作负载的 controller。
- "SpinApps" 自定义资源定义（CRD）。

![spin-operator diagram](../spin-operator-diagram.png)

SpinApps CRD 可以[手动编写]({{< ref "glossary#custom-resource-definition-crd" >}})，也可以使用
[`spin kube scaffold`](#spin-plugin-kube) 命令从现有的 Spin 应用自动生成。前一种方式非常适合
CI/CD 系统，而后一种方式则更适合本地开发者工作流中的本地测试。

一旦应用部署开始，Spin Operator 会负责（借助 [Runtime Class Manager](#runtime-class-manager)，其前身为
Kwasm）将工作负载调度到合适的节点上，并管理资源的生命周期。你无需手动获取
[`containerd-shim-spin`](#containerd-shim-spin) 二进制文件，也不需要修改节点标签，这些都由 Runtime
Class Manager 统一管理，它会在你安装 Spin Operator 时作为依赖一并安装。

## containerd shim {#containerd-shim-spin}

[`containerd-shim-spin`](https://github.com/spinframework/containerd-shim-spin) 是面向
[Spin](https://developer.fermyon.com/spin) 的一个 [containerd
shim](https://github.com/containerd/containerd/blob/main/core/runtime/v2/README.md#runtime-shim) 实现，它通过
[runwasi](https://github.com/deislabs/runwasi) 使得在 Kubernetes 上运行 Spin 工作负载成为可能。也就是说，只要将这个
shim 安装到 Kubernetes 节点上，我们就可以向 Kubernetes 添加一个 [runtime
class](https://kubernetes.io/docs/concepts/containers/runtime-class/)，并将 Spin
工作负载调度到这些节点上。你的 Spin 应用可以像容器工作负载一样运行！

`containerd-shim-spin` 专门用于执行使用 [Spin](https://www.fermyon.com/spin)（一个用于构建和运行 serverless Wasm
应用的开发者工具）构建的应用。该 shim 借助 containerd 的能力，确保 Wasm 工作负载能够在 Kubernetes
环境中得到有效的管理。

在 Kubernetes 集群中，可以为特定节点引导安装 Wasm 运行时，并为其添加相应的标签，以便于 Wasm
工作负载的调度。Kubernetes 中的 `RuntimeClasses` 用于将 Pod 调度到特定节点并指定特定的运行时。通过定义带有合适
`NodeSelector` 和 handler 的 `RuntimeClass`，Kubernetes 可以将 Wasm 工作负载引导到配备了所需 Wasm
运行时的节点上，并确保它们由正确的运行时 handler 执行。

> Note: [Runtime Class Manager](#runtime-class-manager) 会根据 [Shim](https://github.com/spinframework/runtime-class-manager/blob/main/config/crd/bases/runtime.spinkube.dev_shims.yaml) 资源中提供的配置，自动创建相应的 `RuntimeClass`。

总而言之，Containerd Shim Spin 是将 Wasm 工作负载集成到 Kubernetes 集群方面的一项重大进展，它增强了容器编排的多样性与能力。

## runtime-class-manager

[Runtime Class Manager，又称 Containerd Shim Lifecycle
Operator](https://github.com/spinframework/runtime-class-manager)，旨在自动化并管理 Kubernetes 环境中 containerd
shim 的生命周期，包括 shim 的安装、更新、移除和配置等任务，从而减少人为失误，提升 WebAssembly（Wasm）工作负载及其他
containerd 扩展管理的可靠性。

Runtime Class Manager 为在 Kubernetes 环境中安装、更新和移除 shim，以及管理节点标签和 runtime class
提供了一个健壮且可用于生产环境的解决方案。

通过自动化这些流程，runtime-class-manager 提升了可靠性，减少了人为失误，并简化了 Kubernetes 集群中 containerd
shim 的部署与管理。

## spin-plugin-kube

[Spin 的 Kubernetes 插件](https://github.com/spinframework/spin-plugin-kube) 旨在增强 Spin 的能力，使其可以在
Kubernetes 集群内直接执行 Wasm 模块。具体来说，它是一个让 Kubernetes 与 Spin 命令行工具集成的工具。该插件通过对接
containerd shim 进行工作，使 Kubernetes 能够像管理传统容器工作负载那样管理和运行 Wasm 工作负载。

Spin 的 Kubernetes 插件允许开发者使用 Spin 命令行工具部署 Spin 应用，它为在 Kubernetes
环境中构建、推送、部署和管理 Spin 应用提供了无缝的工作流。它包含用于将新组件脚手架生成为 Kubernetes
manifest 的命令，以及部署运行在 Kubernetes 中的 Spin 应用并获取其信息的命令。对于希望简化在 Kubernetes
平台上部署 Spin 应用的开发者来说，这款插件是不可或缺的工具。
