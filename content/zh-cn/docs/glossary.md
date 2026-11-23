---
title: 术语表
description: SpinKube 项目所用术语的词汇表。
weight: 100
categories: [SpinKube]
---

以下术语表中的术语，均以在容器化环境中部署、伸缩、自动化和管理 Spin 应用为语境。

## Chart {#chart}

Helm Chart 是 Kubernetes 中用于部署应用的一种包格式。它包含在 Kubernetes 集群上部署和管理应用所需的全部文件、配置和依赖。Helm Chart 提供了一种便捷的方式，以一致且可复现的方式定义、安装和升级复杂应用。

## Cluster {#cluster}

Kubernetes 集群是一组协同工作以运行容器化应用的节点（服务器）。它由控制平面和工作节点组成。控制平面负责管理和编排集群，而工作节点负责承载容器。控制平面包含 API 服务器、调度器和控制器管理等组件；工作节点则使用 Docker 等容器运行时引擎来运行容器。Kubernetes 集群在分布式环境中为容器化应用提供可伸缩性、高可用性和自动化管理。

## Container Runtime {#container-runtime}

容器运行时（container runtime）是管理容器执行的软件，负责容器的启动、停止和生命周期管理。容器运行时与底层操作系统交互，为容器提供隔离和资源管理，同时处理容器化在网络、存储和安全方面的相关事务。常见的容器运行时包括 Docker、containerd 和 CRI-O。它们支持容器化应用的部署和管理，让开发者能够将应用连同其全部必要依赖一起打包，并在不同环境中一致地运行。

## Controller {#controller}

控制器（Controller）是负责管理某个或某组资源期望状态的核心组件。它持续监视集群，并采取行动确保实际状态与期望状态一致。控制器处理资源的创建、更新和删除等任务，并调和当前状态与期望状态之间的偏差。它们提供自动化和自愈能力，即使出现故障或变更，也能确保集群保持在期望状态。控制器对维持 Kubernetes 部署的稳定性和可靠性起着至关重要的作用。

## Custom Resource（CR）{#custom-resource-cr}

在 Kubernetes 语境中，自定义资源（Custom Resource，CR）是一种扩展机制，允许用户定义和管理自己的 API 资源。它可以创建面向特定应用或工作负载的新资源类型。自定义资源通过自定义资源定义（CRD）来定义，并且可以像其他任何 Kubernetes 资源一样被处理和管理。它们提供了一种扩展 Kubernetes API 的方式，并支持开发自定义控制器来管理这些资源的生命周期和行为。自定义资源为 Kubernetes 部署带来了更大的灵活性和可定制性。

## Custom Resource Definition（CRD）{#custom-resource-definition-crd}

自定义资源定义（Custom Resource Definition，CRD）是一种允许用户定义自定义资源的扩展机制。它可以创建具有特定 schema 和行为的新资源类型。CRD 为自定义资源定义结构和校验规则，允许用户在内置 Kubernetes 资源之外存储和管理额外的信息。CRD 创建之后，即可通过 Kubernetes API 创建、更新和删除该自定义资源的实例。CRD 提供了一种扩展 Kubernetes 并使其适配特定应用需求的方式。

## SpinApp CRD {#spinapp-crd}

SpinApp CRD 是一种 Kubernetes 资源，它扩展了 Kubernetes API 的功能以支持 Spin 应用。它定义了一个名为 "SpinApp" 的自定义资源，封装了在 Kubernetes 集群中部署和管理 Spin 应用所需的全部信息。SpinApp CRD 由若干关键字段组成，用于定义 Spin 应用的期望状态。

下面是一个使用 SpinApp CRD schema 的 SpinApp 自定义资源示例：

```yaml
apiVersion: core.spinkube.dev/v1alpha1
kind: SpinApp
metadata:
  name: simple-spinapp
spec:
  image: "ghcr.io/spinframework/containerd-shim-spin/examples/spin-rust-hello:v0.27.2"
  replicas: 1
  executor: "containerd-shim-spin"
```

> SpinApp CRD 与 Helm 保持分离。如果使用 Helm，必须在安装 Helm chart 之前先安装 CustomResourceDefinition（CRD）资源。

你可以修改上面的示例，通过 YAML 文件自定义 SpinApp。下面是一个包含更多自定义选项的更新版 YAML 文件：

```yaml
apiVersion: core.spinkube.dev/v1alpha1
kind: SpinApp
metadata:
  name: simple-spinapp
spec:
  image: 'ghcr.io/spinframework/containerd-shim-spin/examples/spin-rust-hello:v0.27.2'
  replicas: 3
  imagePullSecrets:
    - name: spin-image-secret
  serviceAnnotations:
    key: value
  podAnnotations:
    key: value
  resources:
    limits:
      cpu: '1'
      memory: 512Mi
    requests:
      cpu: '0.5'
      memory: 256Mi
  env:
    - name: ENV_VAR1
      value: value1
    - name: ENV_VAR2
      value: value2
  # 在此处添加任何其他用户自定义的值
```

在这个更新后的示例中，我们添加了以下自定义选项：

- `imagePullSecrets`：可选字段，用于引用一个 Kubernetes secret，其中包含从私有镜像仓库拉取镜像所需的凭据。
- `serviceAnnotations`：可选字段，用于在所创建的底层 Service 上设置特定的注解。
- `podAnnotations`：可选字段，用于在所创建的底层 Pod 上设置特定的注解。
- `resources`：可以为 CPU 和内存指定资源限制与请求。请根据应用的资源需求调整相应数值。
- `env`：可以为 SpinApp 定义环境变量。按需添加任意数量的环境变量，并为每个变量提供名称和值。

要应用这些变更，请保存 YAML 文件（例如 `updated-spinapp.yaml`），然后使用以下命令将其应用到你的 Kubernetes 集群：

```bash
kubectl apply -f updated-spinapp.yaml
```

## Helm {#helm}

Helm 是 Kubernetes 的包管理器，用于简化应用的部署和管理。它使用 chart（预先配置好的模板）来定义应用的结构和配置。Helm 让用户能够方便地在 Kubernetes 集群上安装、升级和卸载应用，同时还支持版本管理、依赖管理和部署自定义。Helm chart 可以共享和复用，这使它成为在 Kubernetes 环境中管理复杂应用的得力工具。

## Image {#image}

在 Kubernetes 语境中，镜像（image）指一个打包好的可执行软件制品，其中包含运行特定应用或服务所需的全部依赖和配置。镜像通常由 Dockerfile 构建并存储在容器镜像仓库中。镜像是创建容器的基础，而容器是轻量、隔离的运行时环境。Kubernetes 从镜像仓库拉取所需的镜像，并将其部署到集群的工作节点上。镜像对于保证 Kubernetes 中应用部署的一致性和可复现性至关重要。

## Kubernetes {#kubernetes}

Kubernetes 是一个开源的容器编排平台，可自动化容器化应用的部署、伸缩和管理。它提供了一个跨节点集群运行和协调容器的框架。Kubernetes 对底层基础设施进行了抽象，并提供负载均衡、服务发现和自愈等能力。它帮助组织高效地管理和扩展应用，确保高可用性与韧性。

## Open Container Initiative（OCI）{#open-container-initiative-oci}

开放容器倡议（Open Container Initiative，OCI）是一个开放治理结构和项目，旨在为容器格式和运行时创建行业标准。它的成立是为了确保不同容器技术之间的兼容性与互操作性。OCI 定义了容器镜像和运行时的规范，Docker 和 containerd 等容器运行时均采用这些规范。这些规范为容器的打包和运行提供了通用框架，让用户能够构建和分发可在任何兼容 OCI 的运行时上执行的容器镜像。OCI 在促进容器生态的可移植性和标准化方面发挥着关键作用。

## Pod {#pod}

Pod 是最小、最基本的部署单元，表示集群中一个运行中的进程实例。一个 Pod 可以包含一个或多个紧密耦合的容器，它们共享网络、存储等相同资源。Pod 内的容器会被一起调度并部署到同一节点上。Pod 是短暂的（ephemeral），可以被动态地创建、删除或替换。它们为在 Kubernetes 中封装和管理容器化应用的生命周期提供了一种方式。

## Role Based Access Control（RBAC）{#role-based-access-control-rbac}

基于角色的访问控制（Role-Based Access Control，RBAC）是 Kubernetes 中的一种安全机制，可对集群资源的访问进行细粒度控制。RBAC 允许管理员为用户或组定义角色和权限，从而授予或限制其对集群内特定操作和资源的访问。RBAC 确保只有经过授权的用户才能执行特定操作，有助于落实安全策略并防止对敏感资源的未授权访问。它增强了 Kubernetes 集群的整体安全性和治理能力。

## Runtime Class {#runtime-class}

RuntimeClass 是一种允许用户为工作负载指定不同容器运行时的资源。它提供了一种定义并选择 Pod 运行时环境的方式。通过使用 RuntimeClass，用户可以根据自身特定需求在不同的容器运行时之间进行选择。这种灵活性使得部署具有不同运行时特性的工作负载成为可能，从而在 Kubernetes 集群中实现更好的资源利用和性能优化。

## Scheduler {#scheduler}

调度器（scheduler）是负责将 Pod 分配到集群中各节点的组件。它会综合考虑资源可用性、节点容量以及任何已定义的调度约束或策略等因素。调度器确保 Pod 被放置到合适的节点上，以优化资源利用并保持高可用性。在做出调度决策时，它还会考虑亲和性、反亲和性以及资源需求等因素。调度器持续监视集群，并根据需要进行调整，以维持工作负载分布的期望状态。

## Service {#service}

在 Kubernetes 中，Service 是一种抽象，它定义了一组逻辑上的 Pod，使客户端能够与一个稳定的 Pod 集合交互——无论其代码是为云原生环境而设计，还是被容器化的传统应用。

## Spin {#spin}

[Spin](https://developer.fermyon.com/spin/v2/) 是一个用于使用 WebAssembly（Wasm）组件构建和运行事件驱动微服务应用的框架。

## `SpinApp` 清单 {#spinapp-manifest}

`SpinApp` 清单的目标有两个：

- 呈现在 Kubernetes 中运行 Wasm 工作负载时可用的各种配置选项
- 简化并抽象 Wasm 工作负载执行方式的内部细节，同时允许用户根据自身需求对其进行配置

因此，最简单的 `SpinApp` 清单只需要提供镜像仓库引用，即可创建带有正确 Wasm executor 的 Deployment、Pod 和 Service。

此外，`SpinApp` 清单目前还支持配置以下选项：

- 用于从私有镜像仓库拉取应用的 image pull secret
- 存活探针和就绪探针
- 资源限制（以及请求\*）
- Spin 变量
- 卷挂载
- 自动伸缩

## Spin App Executor（CRD）{#spin-app-executor-crd}

`SpinAppExecutor` CRD 是一种[自定义资源定义](#custom-resource-definition-crd)，Spin Operator 使用它来确定运行 SpinApp 时应采用哪种 executor 类型。

## Spin Operator {#spin-operator}

Spin Operator 是一个 Kubernetes operator，负责根据 SpinApp 资源来管理 Spin 应用的生命周期。
