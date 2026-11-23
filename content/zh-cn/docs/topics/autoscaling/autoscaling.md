---
title: 使用 `spin kube` 插件
description: 介绍如何通过 `spin kube` 命令启用自动伸缩器支持的教程。
date: 2024-02-26
categories: [guides]
tags: [tutorial, autoscaling]
aliases:
- /docs/spin-plugin-kube/tutorials/autoscaler-support
---

## 水平自动伸缩支持

在 Kubernetes 中，水平自动伸缩器会自动更新工作负载资源（例如 Deployment 或 StatefulSet），目标是让工作负载自动随需求变化而伸缩。

水平伸缩的意思是，应对负载增长的方式是部署更多资源。这与垂直伸缩不同；对 Kubernetes 而言，垂直伸缩意味着为工作负载中已在运行的资源分配更多内存或 CPU。

如果负载下降，且资源数量高于配置的最小值，水平自动伸缩器会指示工作负载资源（Deployment、StatefulSet 或其他类似资源）把规模缩减回去。

Spin 的 Kubernetes 插件包含自动伸缩器支持，让你可以告诉 Kubernetes 何时根据需求扩大或缩小 Spin 应用的规模。本教程将展示如何通过 `spin kube scaffold` 命令启用自动伸缩器支持。

### 前提条件

无论使用哪种类型的自动伸缩，你都必须先回答下面几个问题，确定应用应如何伸缩：

1. 你希望应用基于系统指标（CPU 和内存利用率）伸缩，还是基于事件（如队列中的消息数或数据库中的行数）伸缩？
1. 如果应用基于系统指标伸缩，那么每个实例运行时需要多少 CPU 和内存？

### 选择自动伸缩器

Spin 的 Kubernetes 插件支持两种类型的自动伸缩器：Horizontal Pod Autoscaler（HPA）和 Kubernetes Event-driven Autoscaling（KEDA）。选择哪种自动伸缩器取决于你的应用需求。

#### Horizontal Pod Autoscaling (HPA)

Horizontal Pod Autoscaler（HPA）基于 CPU 或内存利用率对 Kubernetes Pod 进行伸缩。通过 Spin 的 Kubernetes 插件设置 `--autoscaler hpa` 选项即可启用这种 HPA 伸缩。本页只讨论通过 Spin 的 Kubernetes 插件进行自动伸缩。

```sh
spin kube scaffold --from user-name/app-name:latest --autoscaler hpa --cpu-limit 100m --memory-limit 128Mi
```

Horizontal Pod Autoscaling 是 Kubernetes 的内置功能，无需安装任何第三方运行时。关于使用 HPA 进行伸缩的更多通用信息，请参阅 Spin Operator 的 [Scaling with HPA 章节]({{< ref "scaling-with-hpa" >}})

#### Kubernetes Event-driven Autoscaling (KEDA)

Kubernetes Event-driven Autoscaling（KEDA）是 Horizontal Pod Autoscaler（HPA）的扩展。除了支持基于 CPU 或内存利用率伸缩之外，KEDA 还支持基于来自各种来源的事件进行伸缩，例如队列中的消息数或数据库中的行数。

通过设置 `--autoscaler keda` 选项即可启用 KEDA：

```sh
spin kube scaffold --from user-name/app-name:latest --autoscaler keda --cpu-limit 100m --memory-limit 128Mi -replicas 1 --max-replicas 10
```

使用 KEDA 为 Spin 应用做自动伸缩需要先在你的 Kubernetes 集群中安装 [KEDA 运行时](https://keda.sh/)。关于使用 KEDA 进行伸缩的更多通用信息，请参阅 Spin Operator 的 [Scaling with KEDA 章节]({{< ref
"scaling-with-keda" >}})

### 设置最小/最大副本数

可以使用 `--replicas` 和 `--max-replicas` 选项来设置应用的最小和最大副本数。`--replicas` 选项的默认值为 2，`--max-replicas` 选项的默认值为 3。

```sh
spin kube scaffold --from user-name/app-name:latest --autoscaler hpa --cpu-limit 100m --memory-limit 128Mi -replicas 1 --max-replicas 10
```

### 设置 CPU/内存限制与 CPU/内存请求

如果应用所在节点上的某项资源足够充裕，那么该应用可以（也允许）使用超过其对应资源请求（request）所规定的数量。但是，应用不得使用超过其资源限制（limit）的数量。

举例来说，如果你为应用设置了 256 MiB 的内存请求，而该应用被调度到一个拥有 8GiB 内存且没有其他应用的节点上，那么应用可以尝试使用更多内存。

如果你为该应用设置了 4GiB 的内存限制，WebAssembly 运行时会强制执行这一限制。运行时会阻止应用使用超过所配置资源限制的资源。例如，当应用中的某个进程试图消耗超过允许数量的内存时，WebAssembly 运行时会以内存不足（OOM）错误终止尝试分配内存的那个进程。

可以使用 `--cpu-limit`、`--memory-limit`、`--cpu-request` 和 `--memory-request` 选项来设置应用的 CPU 与内存限制及请求。`--cpu-limit` 和 `--memory-limit` 选项是必需的，而 `--cpu-request` 和 `--memory-request` 选项是可选的。

需要注意以下几点：

- CPU/内存请求是可选的，未设置时默认取 CPU/内存限制的值。
- CPU/内存请求必须低于对应的 CPU/内存限制。
- 如果你为某项资源指定了限制但没有指定任何请求，且没有任何准入时的机制为该资源应用默认请求，那么 Kubernetes 会复制你指定的限制值，并将其用作该资源的请求值。

```sh
spin kube scaffold --from user-name/app-name:latest --autoscaler hpa --cpu-limit 100m --memory-limit 128Mi --cpu-request 50m --memory-request 64Mi
```

### 设置目标利用率

目标利用率是指你希望资源被使用到什么百分比时自动伸缩器开始介入。自动伸缩器会将应用当前的资源利用率与目标利用率进行比较，并根据结果扩大或缩小应用的规模。

目标利用率基于应用所有实例的平均资源利用率。例如，如果你的应用有 3 个实例，目标 CPU 利用率为 50%，而每个应用实例的平均 CPU 利用率为 80%，那么自动伸缩器会持续增加实例数量，直到所有实例的平均 CPU 利用率达到 50%。

要基于 CPU 利用率进行伸缩，请使用 `--autoscaler-target-cpu-utilization` 选项：

```sh
spin kube scaffold --from user-name/app-name:latest --autoscaler hpa --cpu-limit 100m --memory-limit 128Mi --autoscaler-target-cpu-utilization 50
```

要基于内存利用率进行伸缩，请使用 `--autoscaler-target-memory-utilization` 选项：

```sh
spin kube scaffold --from user-name/app-name:latest --autoscaler hpa --cpu-limit 100m --memory-limit 128Mi --autoscaler-target-memory-utilization 50
```
