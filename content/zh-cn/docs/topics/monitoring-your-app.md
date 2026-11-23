---
title: 监控你的应用
description: 如何查看运行在 SpinKube 中的 Spin 应用的遥测数据。
weight: 13
---

本主题指南介绍如何配置 SpinKube，使你的 Spin 应用导出可观测性数据。这些数据将导出到一个 OpenTelemetry collector，再由其发送到 Jaeger。

## 前提条件

在继续之前，请确保你已安装以下工具：

- 一个运行 SpinKube 的 Kubernetes 集群。更多信息请参阅[安装指南](https://www.spinkube.dev/docs/install/)
- [kubectl CLI](https://kubernetes.io/docs/tasks/tools/)
- [Helm CLI](https://helm.sh)

## 关于 OpenTelemetry Collector

摘自 OpenTelemetry [文档](https://opentelemetry.io/docs/collector/)：

> OpenTelemetry Collector 提供了一种与厂商无关的实现，用于接收、处理和导出遥测数据。它免去了运行、操作和维护多个 agent/collector 的需要。它具备更好的可伸缩性，并支持将开源可观测性数据格式（如 Jaeger、Prometheus、Fluent Bit 等）发送到一个或多个开源或商业后端。

在我们的场景中，OpenTelemetry collector 作为接收和路由遥测数据的统一端点，让我们能够通过偏好的界面监控指标、链路追踪和日志。

## 关于 Jaeger

摘自 Jaeger [文档](https://www.jaegertracing.io/docs/)：

> Jaeger 是由 Uber Technologies 开源发布的分布式链路追踪平台。使用 Jaeger，你可以：监控和排查分布式工作流，识别性能瓶颈，追查问题根因，分析服务依赖关系。

在这里，我们让 OpenTelemetry collector 将链路追踪数据发送到 Jaeger。

## 部署 OpenTelemetry Collector

首先，添加 OpenTelemetry collector 的 Helm 仓库：

```sh
helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
helm repo update
```

接下来，将 OpenTelemetry collector 部署到你的集群：

```sh
helm upgrade --install otel-collector open-telemetry/opentelemetry-collector \
    --set image.repository="otel/opentelemetry-collector-k8s" \
    --set nameOverride=otel-collector \
    --set mode=deployment \
    --set config.exporters.otlp.endpoint=http://jaeger-collector.default.svc.cluster.local:4317 \
    --set config.exporters.otlp.tls.insecure=true \
    --set config.service.pipelines.traces.exporters\[0\]=otlp \
    --set config.service.pipelines.traces.processors\[0\]=batch \
    --set config.service.pipelines.traces.receivers\[0\]=otlp \
    --set config.service.pipelines.traces.receivers\[1\]=jaeger
```

## 部署 Jaeger

接下来，添加 Jaeger 的 Helm 仓库：

```sh
helm repo add jaegertracing https://jaegertracing.github.io/helm-charts
helm repo update
```

然后，将 Jaeger 部署到你的集群：

```sh
helm upgrade --install jaeger jaegertracing/jaeger \
    --set provisionDataStore.cassandra=false \
    --set allInOne.enabled=true \
    --set agent.enabled=false \
    --set collector.enabled=false \
    --set query.enabled=false \
    --set storage.type=memory
```

## 配置 SpinAppExecutor

`SpinAppExecutor` 资源决定了 Spin 应用在集群中的部署方式。以下配置将确保任何使用该 executor 的 `SpinApp` 资源都会将遥测数据发送到 OpenTelemetry collector。要查看 `SpinAppExecutor` 的完整 OTel 选项列表，请参阅 [API 参考](https://www.spinkube.dev/docs/reference/spin-app-executor/)。

创建一个名为 `executor.yaml` 的文件，内容如下：

```yaml
apiVersion: core.spinkube.dev/v1alpha1
kind: SpinAppExecutor
metadata:
  name: otel-shim-executor
spec:
  createDeployment: true
  deploymentConfig:
    runtimeClassName: wasmtime-spin-v2
    installDefaultCACerts: true
    otel:
      exporter_otlp_endpoint: http://otel-collector.default.svc.cluster.local:4318
```

运行以下命令部署该 executor：

```sh
kubectl apply -f executor.yaml
```

## 部署一个用于观测的 Spin 应用

一切就绪后，我们现在可以部署一个使用 `otel-shim-executor` executor 的 `SpinApp` 资源。

创建一个名为 `app.yaml` 的文件，内容如下：

```yaml
apiVersion: core.spinkube.dev/v1alpha1
kind: SpinApp
metadata:
  name: otel-spinapp
spec:
  image: ghcr.io/spinkube/spin-operator/cpu-load-gen:20240311-163328-g1121986
  executor: otel-shim-executor
  replicas: 1
```

运行以下命令部署该应用：

```sh
kubectl apply -f app.yaml
```

恭喜！你现在拥有了一个导出遥测数据的 Spin 应用。

接下来，我们需要生成一些遥测数据供 Spin 应用导出。使用以下命令对 Spin 应用进行端口转发：

```sh
kubectl port-forward svc/otel-spinapp 3000:80
```

在新的终端窗口中，执行一个 `curl` 请求：

```sh
curl localhost:3000
```

该请求需要运行片刻，完成后你应该会看到类似下面的输出：

```
fib(43) = 433494437
```

## 与 Jaeger 交互

要查看 Jaeger 中的链路追踪数据，请使用以下端口转发命令：

```sh
kubectl port-forward svc/jaeger-query 16686:16686
```

然后，打开浏览器并访问 `localhost:16686`，即可与 Jaeger 的界面进行交互。
