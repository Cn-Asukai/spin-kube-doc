---
title: SpinAppExecutor
weight: 2
description: "`SpinAppExecutor` 的 Custom Resource Definition (CRD) 参考"
categories: [Spin Operator]
tags: [reference]
---
资源类型：

- [SpinAppExecutor](#spinappexecutor)

## SpinAppExecutor

SpinAppExecutor 是 spinappexecutors API 的 schema

<table>
    <thead>
        <tr>
            <th>名称</th>
            <th>类型</th>
            <th>描述</th>
            <th>必填</th>
        </tr>
    </thead>
    <tbody><tr>
      <td><b>apiVersion</b></td>
      <td>string</td>
      <td>core.spinkube.dev/v1alpha1</td>
      <td>true</td>
      </tr>
      <tr>
      <td><b>kind</b></td>
      <td>string</td>
      <td>SpinAppExecutor</td>
      <td>true</td>
      </tr>
      <tr>
      <td><b><a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.27/#objectmeta-v1-meta">metadata</a></b></td>
      <td>object</td>
      <td>`metadata` 字段的各字段说明参见 Kubernetes API 文档。</td>
      <td>true</td>
      </tr><tr>
        <td><b><a href="#spinappexecutorspec">spec</a></b></td>
        <td>object</td>
        <td>
          SpinAppExecutorSpec 定义 SpinAppExecutor 的期望状态<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>status</b></td>
        <td>object</td>
        <td>
          SpinAppExecutorStatus 定义 SpinAppExecutor 的实际观测状态<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinAppExecutor.spec` 
<small>[back to parent](#spinappexecutor)</small>


SpinAppExecutorSpec 定义 SpinAppExecutor 的期望状态

<table>
    <thead>
        <tr>
            <th>名称</th>
            <th>类型</th>
            <th>描述</th>
            <th>必填</th>
        </tr>
    </thead>
    <tbody><tr>
        <td><b>createDeployment</b></td>
        <td>boolean</td>
        <td>
          CreateDeployment 指定 Executor 是希望由 SpinKube operator 为应用创建
deployment，还是将由外部方式实现。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b><a href="#spinappexecutorspecdeploymentconfig">deploymentConfig</a></b></td>
        <td>object</td>
        <td>
          DeploymentConfig 指定当 createDeployment 为 true 时
deployment 应如何配置。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinAppExecutor.spec.deploymentConfig` 
<small>[back to parent](#spinappexecutorspec)</small>


DeploymentConfig 指定当 createDeployment 为 true 时 deployment 应如何配置。

<table>
    <thead>
        <tr>
            <th>名称</th>
            <th>类型</th>
            <th>描述</th>
            <th>必填</th>
        </tr>
    </thead>
    <tbody><tr>
        <td><b>caCertSecret</b></td>
        <td>string</td>
        <td>
          CACertSecret 指定包含要挂载到 deployment 的 CA
证书的 secret 名称。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>installDefaultCACerts</b></td>
        <td>boolean</td>
        <td>
          InstallDefaultCACerts 指定是否应生成默认 CA
证书包。设置后将创建一个包含这些证书的新 secret。如果未在
`CACertSecret` 中定义 secret 名称，则 secret 名称为
`spin-ca`。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappexecutorspecdeploymentconfigotel">otel</a></b></td>
        <td>object</td>
        <td>
          Otel 提供到 Otel 变量的 Kubernetes 绑定。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>runtimeClassName</b></td>
        <td>string</td>
        <td>
          RuntimeClassName 是 deployment 所创建的 Pod 应使用的
RuntimeClass 名称。仅应在未定义 SpintainerImage 时定义。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>spinImage</b></td>
        <td>string</td>
        <td>
          SpinImage 指向一个将在容器中运行 Spin 以执行
SpinApp 的 image。这是使用 shim 执行 SpinApp 之外的另一种方式。仅应在未定义 RuntimeClassName 时
定义。指定后，应用 image 必须可在无需认证的情况下获取。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinAppExecutor.spec.deploymentConfig.otel` 
<small>[back to parent](#spinappexecutorspecdeploymentconfig)</small>


Otel 提供到 Otel 变量的 Kubernetes 绑定。

<table>
    <thead>
        <tr>
            <th>名称</th>
            <th>类型</th>
            <th>描述</th>
            <th>必填</th>
        </tr>
    </thead>
    <tbody><tr>
        <td><b>exporter_otlp_endpoint</b></td>
        <td>string</td>
        <td>
          ExporterOtlpEndpoint 配置用于发送遥测数据的默认合并 otlp endpoint<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>exporter_otlp_logs_endpoint</b></td>
        <td>string</td>
        <td>
          ExporterOtlpLogsEndpoint 配置日志专用的 otlp endpoint<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>exporter_otlp_metrics_endpoint</b></td>
        <td>string</td>
        <td>
          ExporterOtlpMetricsEndpoint 配置指标专用的 otlp endpoint<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>exporter_otlp_traces_endpoint</b></td>
        <td>string</td>
        <td>
          ExporterOtlpTracesEndpoint 配置 trace 专用的 otlp endpoint<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>

