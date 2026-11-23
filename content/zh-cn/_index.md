---
title: SpinKube
---

{{< blocks/cover title="在 Kubernetes 上由 WebAssembly 驱动的超高效无服务器方案。"
subtitle="非官方中文翻译 · 社区维护"
image_anchor="top" height="full" >}} <a class="btn btn-lg btn-primary me-3 mb-4" href="/zh-cn/docs/"> 快速开始 <i class="fas fa-arrow-alt-circle-right ms-2"></i> </a>
<p class="lead mt-5">SpinKube 是一个开源的 Kubernetes 原生项目，它简化了 WebAssembly (Wasm) 工作负载在 Kubernetes 中的开发、部署与运维——让你交付更小、更可移植的应用，并享受令人惊喜的计算性能提升。</p>
{{< blocks/link-down color="info" >}}
{{< /blocks/cover >}}

{{% alert color="warning" title="非官方翻译声明" %}}
本站是 [spinkube.dev](https://www.spinkube.dev/) 文档的**非官方**中文翻译站点，由社区志愿者维护，与 SpinKube 官方项目及其赞助方无隶属关系，亦未经其授权或背书。翻译可能滞后于原文；内容若有出入，一律以[英文官方文档](https://www.spinkube.dev/docs/)为准。
{{% /alert %}}


{{% blocks/lead color="secondary" %}}

SpinKube 整合了 <a href="https://github.com/spinframework/spin-operator">Spin operator</a>、<a
href="https://github.com/spinframework/containerd-shim-spin">containerd shim Spin</a> 和 <a
href="https://github.com/spinframework/runtime-class-manager">runtime class manager</a>（前身为 <a
href="https://kwasm.sh/">KWasm</a>）等开源项目，并得到了 Microsoft、SUSE、Liquid Reply 和 Fermyon 的贡献。通过在 Wasm 抽象层上运行应用，SpinKube 为开发者提供了一种更强大、更高效、更可扩展的方式来优化 Kubernetes 上的应用交付。


### 来自以下机构的贡献：

|![Microsoft](../logo-microsoft.png)|![Liquid Reply](../logo-liquidreply.png)|![SUSE](../logo-suse.png)|![Fermyon](../logo-fermyon.png)|
|---|---|---|---|

### 概览

[**Spin Operator**](https://github.com/spinframework/spin-operator/) 是一个 Kubernetes operator，用于在
Kubernetes 中部署和运行 Spin 应用。它包含 SpinApp 和 SpinAppExecutor 这两个 CRD，分别用于配置单个工作负载以及工作负载的执行配置（例如 runtime
class）。Spin Operator 还引入了诸多功能，例如基于资源的伸缩、事件驱动的自动伸缩等等。

[**Containerd Shim Spin**](https://github.com/spinframework/containerd-shim-spin) 为运行由 containerd
管理的 Spin 工作负载提供了一个 shim。Spin 工作负载将此 shim 作为 Kubernetes 中的 runtime class 使用，使这些工作负载能够像 Kubernetes Pod 中的容器工作负载一样运行。

[**Runtime Class Manager**](https://github.com/spinframework/runtime-class-manager) 是一个 operator，
可在 Kubernetes 环境中自动化并管理 containerd shim 的生命周期，包括 shim 的安装、更新、移除和配置等任务，从而减少人为失误，提升管理 WebAssembly
(Wasm) 工作负载及其他 containerd 扩展的可靠性。

[**Spin Kube Plugin**](https://github.com/spinframework/spin-plugin-kube) 是 [Spin](https://developer.fermyon.com/spin/v3/index) CLI 的一个插件，旨在让在 Kubernetes 中搭建脚手架、部署和检查 Spin 工作负载的体验更加轻松。

### 参与其中

我们每两周举行一次[社区电话会议](https://docs.google.com/document/d/10is2YoNC0NpXw4_5lSyTfpPph9_A9wBissKGrpFaIrI/edit?usp=sharing)，并设有 [Slack 频道](https://cloud-native.slack.com/archives/C06PC7JA1EE)。诚邀你的加入！<br>

欢迎查阅[贡献指南](/zh-cn/docs/contrib/)，了解如何参与本项目。

---

{{% /blocks/lead %}}

{{% blocks/section %}}

<img class="responsive mx-auto d-block"
    width="300"
    alt="cloud-native computing"
    src="../cloud-native-computing.svg">

<div class="text-center">SpinKube 是 <a href="https://www.cncf.io">Cloud Native Computing Foundation</a> 的沙箱项目。</div>

<p>
  <div class="text-center">
  本站为 SpinKube 文档的非官方中文翻译站点，与 SpinKube a Series of LF Projects, LLC 无隶属关系，亦未经其授权或背书。
  <br>
  原文、商标及相关政策归其各自权利方所有，详见
  <a href="https://lfprojects.org/policies/">https://lfprojects.org/policies/</a>。</div>
</p>

{{% /blocks/section %}}
