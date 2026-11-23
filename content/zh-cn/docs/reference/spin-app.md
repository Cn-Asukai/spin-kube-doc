---
title: SpinApp
weight: 1
description: "`SpinApp` 的自定义资源定义（CRD）参考"
categories: [Spin Operator]
tags: [reference]
---
资源类型：

- [SpinApp](#spinapp)

## SpinApp

SpinApp 是 spinapps API 的 Schema

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
      <td>SpinApp</td>
      <td>true</td>
      </tr>
      <tr>
      <td><b><a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.27/#objectmeta-v1-meta">metadata</a></b></td>
      <td>object</td>
      <td>参见 Kubernetes API 文档中 `metadata` 字段的说明。</td>
      <td>true</td>
      </tr><tr>
        <td><b><a href="#spinappspec">spec</a></b></td>
        <td>object</td>
        <td>
          SpinAppSpec 定义 SpinApp 的期望状态<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappstatus">status</a></b></td>
        <td>object</td>
        <td>
          SpinAppStatus 定义 SpinApp 的实际状态<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec` 
<small>[返回父级](#spinapp)</small>


SpinAppSpec 定义 SpinApp 的期望状态<br/>

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
        <td><b>executor</b></td>
        <td>string</td>
        <td>
          Executor 控制此应用在集群中的执行方式。

默认使用集群上可用的 executor。如果有多个可用的 executor，则按字母顺序选择第一个。如果没有可用的 executor，则不设置默认值。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>image</b></td>
        <td>string</td>
        <td>
          Image 是此应用的来源。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b><a href="#spinappspecchecks">checks</a></b></td>
        <td>object</td>
        <td>
          Checks 定义 Kubernetes 监控应用所使用的健康检查。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>components</b></td>
        <td>[]string</td>
        <td>
          要执行的应用组件。

如果未提供，则执行所有组件。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>deploymentAnnotations</b></td>
        <td>map[string]string</td>
        <td>
          DeploymentAnnotations 定义要应用到底层 deployment 的注解。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>enableAutoscaling</b></td>
        <td>boolean</td>
        <td>
          EnableAutoscaling 指示是否允许应用自动扩缩容。若为 true，operator 会将底层 deployment 的副本数交由外部自动扩缩器（HPA/KEDA）管理。启用此选项时不能再定义 replicas。默认情况下 EnableAutoscaling 为 false。<br/> <br/> <i>默认</i>：false<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecimagepullsecretsindex">imagePullSecrets</a></b></td>
        <td>[]object</td>
        <td>
          ImagePullSecrets 是同一命名空间内的 secret 引用列表，用于拉取 image。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>invocationLimits</b></td>
        <td>map[string]string</td>
        <td>
          InvocationLimits 定义每次调用应用时应用的限制。键为限制的名称，值为限制的值。SpinKube executor 可以定义自己的限制。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>podAnnotations</b></td>
        <td>map[string]string</td>
        <td>
          PodAnnotations 定义要应用到底层 Pod 的注解。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>podLabels</b></td>
        <td>map[string]string</td>
        <td>
          PodLabels 定义要应用到底层 Pod 的标签。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>replicas</b></td>
        <td>integer</td>
        <td>
          要运行的副本数。<br/> <br/> <i>格式</i>：int32<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecresources">resources</a></b></td>
        <td>object</td>
        <td>
          Resources 定义此应用的资源需求。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecruntimeconfig">runtimeConfig</a></b></td>
        <td>object</td>
        <td>
          RuntimeConfig 定义此应用在运行时应用的配置。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>serviceAccountName</b></td>
        <td>string</td>
        <td>
          ServiceAccountName 是 Pod 所使用的 Kubernetes service account 的名称。如果未指定，将使用默认的 service account。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>serviceAnnotations</b></td>
        <td>map[string]string</td>
        <td>
          ServiceAnnotations 定义要应用到底层 service 的注解。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvariablesindex">variables</a></b></td>
        <td>[]object</td>
        <td>
          Variables 提供从 Kubernetes 到 Spin 应用变量的绑定。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumemountsindex">volumeMounts</a></b></td>
        <td>[]object</td>
        <td>
          VolumeMounts 定义 volume 在底层容器中的挂载方式。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindex">volumes</a></b></td>
        <td>[]object</td>
        <td>
          Volumes 定义要挂载到底层 Pod 的 volume。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.checks` 
<small>[返回父级](#spinappspec)</small>


Checks 定义 Kubernetes 监控应用所使用的健康检查。<br/>

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
        <td><b><a href="#spinappspecchecksliveness">liveness</a></b></td>
        <td>object</td>
        <td>
          Liveness 定义应用的存活探针。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecchecksreadiness">readiness</a></b></td>
        <td>object</td>
        <td>
          Readiness 定义应用的就绪探针。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.checks.liveness` 
<small>[返回父级](#spinappspecchecks)</small>


Liveness 定义应用的存活探针。<br/>

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
        <td><b>failureThreshold</b></td>
        <td>integer</td>
        <td>
          探针在成功之后连续失败多少次会被判定为失败。默认为 3。最小值为 1。<br/> <br/> <i>格式</i>：int32<br/> <i>默认</i>：3<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspeccheckslivenesshttpget">httpGet</a></b></td>
        <td>object</td>
        <td>
          HTTPGet 描述使用 GET 请求执行的健康检查。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>initialDelaySeconds</b></td>
        <td>integer</td>
        <td>
          应用启动后多少秒开始执行存活探针。默认为 10 秒。<br/> <br/> <i>格式</i>：int32<br/> <i>默认</i>：10<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>periodSeconds</b></td>
        <td>integer</td>
        <td>
          执行探针的频率（单位：秒）。默认为 10 秒。最小值为 1。<br/> <br/> <i>格式</i>：int32<br/> <i>默认</i>：10<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>successThreshold</b></td>
        <td>integer</td>
        <td>
          探针在失败之后连续成功多少次会被判定为成功。默认为 1。liveness 和 startup 探针必须为 1。最小值为 1。<br/> <br/> <i>格式</i>：int32<br/> <i>默认</i>：1<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>timeoutSeconds</b></td>
        <td>integer</td>
        <td>
          探针超时的时间（单位：秒）。默认为 1 秒。最小值为 1。<br/> <br/> <i>格式</i>：int32<br/> <i>默认</i>：1<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.checks.liveness.httpGet` 
<small>[返回父级](#spinappspecchecksliveness)</small>


HTTPGet 描述使用 GET 请求执行的健康检查。<br/>

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
        <td><b>path</b></td>
        <td>string</td>
        <td>
          Path 是为健康检查调用应用时使用的路径，例如 /healthz。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b><a href="#spinappspeccheckslivenesshttpgethttpheadersindex">httpHeaders</a></b></td>
        <td>[]object</td>
        <td>
          HTTPHeaders 是应包含在健康检查请求中的请求头。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.checks.liveness.httpGet.httpHeaders[index]` 
<small>[返回父级](#spinappspeccheckslivenesshttpget)</small>


HTTPHealthProbeHeader 是对 HTTP header 键值对的抽象。

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
        <td><b>name</b></td>
        <td>string</td>
        <td>
          <br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>value</b></td>
        <td>string</td>
        <td>
          <br/>
        </td>
        <td>true</td>
      </tr></tbody>
</table>


### `SpinApp.spec.checks.readiness` 
<small>[返回父级](#spinappspecchecks)</small>


Readiness 定义应用的就绪探针。<br/>

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
        <td><b>failureThreshold</b></td>
        <td>integer</td>
        <td>
          探针在成功之后连续失败多少次会被判定为失败。默认为 3。最小值为 1。<br/> <br/> <i>格式</i>：int32<br/> <i>默认</i>：3<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecchecksreadinesshttpget">httpGet</a></b></td>
        <td>object</td>
        <td>
          HTTPGet 描述使用 GET 请求执行的健康检查。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>initialDelaySeconds</b></td>
        <td>integer</td>
        <td>
          应用启动后多少秒开始执行存活探针。默认为 10 秒。<br/> <br/> <i>格式</i>：int32<br/> <i>默认</i>：10<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>periodSeconds</b></td>
        <td>integer</td>
        <td>
          执行探针的频率（单位：秒）。默认为 10 秒。最小值为 1。<br/> <br/> <i>格式</i>：int32<br/> <i>默认</i>：10<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>successThreshold</b></td>
        <td>integer</td>
        <td>
          探针在失败之后连续成功多少次会被判定为成功。默认为 1。liveness 和 startup 探针必须为 1。最小值为 1。<br/> <br/> <i>格式</i>：int32<br/> <i>默认</i>：1<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>timeoutSeconds</b></td>
        <td>integer</td>
        <td>
          探针超时的时间（单位：秒）。默认为 1 秒。最小值为 1。<br/> <br/> <i>格式</i>：int32<br/> <i>默认</i>：1<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.checks.readiness.httpGet` 
<small>[返回父级](#spinappspecchecksreadiness)</small>


HTTPGet 描述使用 GET 请求执行的健康检查。<br/>

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
        <td><b>path</b></td>
        <td>string</td>
        <td>
          Path 是为健康检查调用应用时使用的路径，例如 /healthz。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b><a href="#spinappspecchecksreadinesshttpgethttpheadersindex">httpHeaders</a></b></td>
        <td>[]object</td>
        <td>
          HTTPHeaders 是应包含在健康检查请求中的请求头。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.checks.readiness.httpGet.httpHeaders[index]` 
<small>[返回父级](#spinappspecchecksreadinesshttpget)</small>


HTTPHealthProbeHeader 是对 HTTP header 键值对的抽象。

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
        <td><b>name</b></td>
        <td>string</td>
        <td>
          <br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>value</b></td>
        <td>string</td>
        <td>
          <br/>
        </td>
        <td>true</td>
      </tr></tbody>
</table>


### `SpinApp.spec.imagePullSecrets[index]` 
<small>[返回父级](#spinappspec)</small>


LocalObjectReference 包含足够的信息，让你能在同一命名空间内定位被引用的对象。

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
        <td><b>name</b></td>
        <td>string</td>
        <td>
          被引用对象的名称。此字段实际上是必填的，但出于向后兼容的考虑，允许为空。此处为空值的实例几乎可以肯定是错误的。更多信息：https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names<br/> <br/> <i>默认</i>： <br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.resources` 
<small>[返回父级](#spinappspec)</small>


Resources 定义此应用的资源需求。<br/>

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
        <td><b>limits</b></td>
        <td>map[string]int or string</td>
        <td>
          Limits 描述允许的最大计算资源量。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>requests</b></td>
        <td>map[string]int or string</td>
        <td>
          Requests 描述所需的最小计算资源量。如果容器未指定 Requests，则在显式指定了 Limits 时默认取 Limits 的值，否则取由实现定义的值。Requests 不能超过 Limits。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.runtimeConfig` 
<small>[返回父级](#spinappspec)</small>


RuntimeConfig 定义此应用在运行时应用的配置。<br/>

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
        <td><b><a href="#spinappspecruntimeconfigkeyvaluestoresindex">keyValueStores</a></b></td>
        <td>[]object</td>
        <td>
          <br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecruntimeconfigllmcompute">llmCompute</a></b></td>
        <td>object</td>
        <td>
          <br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>loadFromSecret</b></td>
        <td>string</td>
        <td>
          LoadFromSecret 是从中加载 runtime config 的 secret 的名称。该 secret 应包含一个名为 "runtime-config.toml" 的键，其内容为 base64 编码的 runtime config。如果提供了此字段，将忽略所有其他 runtime config。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecruntimeconfigsqlitedatabasesindex">sqliteDatabases</a></b></td>
        <td>[]object</td>
        <td>
          SqliteDatabases 为不同的 SQLite 数据库提供者提供 spin 绑定，例如 on-disk 或 turso。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.runtimeConfig.keyValueStores[index]` 
<small>[返回父级](#spinappspecruntimeconfig)</small>




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
        <td><b>name</b></td>
        <td>string</td>
        <td>
          <br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>type</b></td>
        <td>string</td>
        <td>
          <br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b><a href="#spinappspecruntimeconfigkeyvaluestoresindexoptionsindex">options</a></b></td>
        <td>[]object</td>
        <td>
          <br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.runtimeConfig.keyValueStores[index].options[index]` 
<small>[返回父级](#spinappspecruntimeconfigkeyvaluestoresindex)</small>




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
        <td><b>name</b></td>
        <td>string</td>
        <td>
          配置项的名称。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>value</b></td>
        <td>string</td>
        <td>
          Value 是绑定到变量的静态值。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecruntimeconfigkeyvaluestoresindexoptionsindexvaluefrom">valueFrom</a></b></td>
        <td>object</td>
        <td>
          ValueFrom 是动态绑定变量的引用。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.runtimeConfig.keyValueStores[index].options[index].valueFrom` 
<small>[返回父级](#spinappspecruntimeconfigkeyvaluestoresindexoptionsindex)</small>


ValueFrom 是动态绑定变量的引用。<br/>

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
        <td><b><a href="#spinappspecruntimeconfigkeyvaluestoresindexoptionsindexvaluefromconfigmapkeyref">configMapKeyRef</a></b></td>
        <td>object</td>
        <td>
          选择 ConfigMap 的某个键。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecruntimeconfigkeyvaluestoresindexoptionsindexvaluefromsecretkeyref">secretKeyRef</a></b></td>
        <td>object</td>
        <td>
          选择应用命名空间内 secret 的某个键<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.runtimeConfig.keyValueStores[index].options[index].valueFrom.configMapKeyRef` 
<small>[返回父级](#spinappspecruntimeconfigkeyvaluestoresindexoptionsindexvaluefrom)</small>


选择 ConfigMap 的某个键。<br/>

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
        <td><b>key</b></td>
        <td>string</td>
        <td>
          要选择的键。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>name</b></td>
        <td>string</td>
        <td>
          被引用对象的名称。此字段实际上是必填的，但出于向后兼容的考虑，允许为空。此处为空值的实例几乎可以肯定是错误的。更多信息：https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names<br/> <br/> <i>默认</i>： <br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>optional</b></td>
        <td>boolean</td>
        <td>
          指定是否必须定义该 ConfigMap 或其键<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.runtimeConfig.keyValueStores[index].options[index].valueFrom.secretKeyRef` 
<small>[返回父级](#spinappspecruntimeconfigkeyvaluestoresindexoptionsindexvaluefrom)</small>


选择应用命名空间内 secret 的某个键<br/>

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
        <td><b>key</b></td>
        <td>string</td>
        <td>
          要从中选择的 secret 键。必须是有效的 secret 键。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>name</b></td>
        <td>string</td>
        <td>
          被引用对象的名称。此字段实际上是必填的，但出于向后兼容的考虑，允许为空。此处为空值的实例几乎可以肯定是错误的。更多信息：https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names<br/> <br/> <i>默认</i>： <br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>optional</b></td>
        <td>boolean</td>
        <td>
          指定是否必须定义该 Secret 或其键<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.runtimeConfig.llmCompute` 
<small>[返回父级](#spinappspecruntimeconfig)</small>




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
        <td><b>type</b></td>
        <td>string</td>
        <td>
          <br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b><a href="#spinappspecruntimeconfigllmcomputeoptionsindex">options</a></b></td>
        <td>[]object</td>
        <td>
          <br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.runtimeConfig.llmCompute.options[index]` 
<small>[返回父级](#spinappspecruntimeconfigllmcompute)</small>




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
        <td><b>name</b></td>
        <td>string</td>
        <td>
          配置项的名称。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>value</b></td>
        <td>string</td>
        <td>
          Value 是绑定到变量的静态值。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecruntimeconfigllmcomputeoptionsindexvaluefrom">valueFrom</a></b></td>
        <td>object</td>
        <td>
          ValueFrom 是动态绑定变量的引用。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.runtimeConfig.llmCompute.options[index].valueFrom` 
<small>[返回父级](#spinappspecruntimeconfigllmcomputeoptionsindex)</small>


ValueFrom 是动态绑定变量的引用。<br/>

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
        <td><b><a href="#spinappspecruntimeconfigllmcomputeoptionsindexvaluefromconfigmapkeyref">configMapKeyRef</a></b></td>
        <td>object</td>
        <td>
          选择 ConfigMap 的某个键。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecruntimeconfigllmcomputeoptionsindexvaluefromsecretkeyref">secretKeyRef</a></b></td>
        <td>object</td>
        <td>
          选择应用命名空间内 secret 的某个键<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.runtimeConfig.llmCompute.options[index].valueFrom.configMapKeyRef` 
<small>[返回父级](#spinappspecruntimeconfigllmcomputeoptionsindexvaluefrom)</small>


选择 ConfigMap 的某个键。<br/>

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
        <td><b>key</b></td>
        <td>string</td>
        <td>
          要选择的键。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>name</b></td>
        <td>string</td>
        <td>
          被引用对象的名称。此字段实际上是必填的，但出于向后兼容的考虑，允许为空。此处为空值的实例几乎可以肯定是错误的。更多信息：https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names<br/> <br/> <i>默认</i>： <br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>optional</b></td>
        <td>boolean</td>
        <td>
          指定是否必须定义该 ConfigMap 或其键<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.runtimeConfig.llmCompute.options[index].valueFrom.secretKeyRef` 
<small>[返回父级](#spinappspecruntimeconfigllmcomputeoptionsindexvaluefrom)</small>


选择应用命名空间内 secret 的某个键<br/>

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
        <td><b>key</b></td>
        <td>string</td>
        <td>
          要从中选择的 secret 键。必须是有效的 secret 键。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>name</b></td>
        <td>string</td>
        <td>
          被引用对象的名称。此字段实际上是必填的，但出于向后兼容的考虑，允许为空。此处为空值的实例几乎可以肯定是错误的。更多信息：https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names<br/> <br/> <i>默认</i>： <br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>optional</b></td>
        <td>boolean</td>
        <td>
          指定是否必须定义该 Secret 或其键<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.runtimeConfig.sqliteDatabases[index]` 
<small>[返回父级](#spinappspecruntimeconfig)</small>




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
        <td><b>name</b></td>
        <td>string</td>
        <td>
          <br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>type</b></td>
        <td>string</td>
        <td>
          <br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b><a href="#spinappspecruntimeconfigsqlitedatabasesindexoptionsindex">options</a></b></td>
        <td>[]object</td>
        <td>
          <br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.runtimeConfig.sqliteDatabases[index].options[index]` 
<small>[返回父级](#spinappspecruntimeconfigsqlitedatabasesindex)</small>




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
        <td><b>name</b></td>
        <td>string</td>
        <td>
          配置项的名称。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>value</b></td>
        <td>string</td>
        <td>
          Value 是绑定到变量的静态值。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecruntimeconfigsqlitedatabasesindexoptionsindexvaluefrom">valueFrom</a></b></td>
        <td>object</td>
        <td>
          ValueFrom 是动态绑定变量的引用。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.runtimeConfig.sqliteDatabases[index].options[index].valueFrom` 
<small>[返回父级](#spinappspecruntimeconfigsqlitedatabasesindexoptionsindex)</small>


ValueFrom 是动态绑定变量的引用。<br/>

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
        <td><b><a href="#spinappspecruntimeconfigsqlitedatabasesindexoptionsindexvaluefromconfigmapkeyref">configMapKeyRef</a></b></td>
        <td>object</td>
        <td>
          选择 ConfigMap 的某个键。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecruntimeconfigsqlitedatabasesindexoptionsindexvaluefromsecretkeyref">secretKeyRef</a></b></td>
        <td>object</td>
        <td>
          选择应用命名空间内 secret 的某个键<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.runtimeConfig.sqliteDatabases[index].options[index].valueFrom.configMapKeyRef` 
<small>[返回父级](#spinappspecruntimeconfigsqlitedatabasesindexoptionsindexvaluefrom)</small>


选择 ConfigMap 的某个键。<br/>

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
        <td><b>key</b></td>
        <td>string</td>
        <td>
          要选择的键。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>name</b></td>
        <td>string</td>
        <td>
          被引用对象的名称。此字段实际上是必填的，但出于向后兼容的考虑，允许为空。此处为空值的实例几乎可以肯定是错误的。更多信息：https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names<br/> <br/> <i>默认</i>： <br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>optional</b></td>
        <td>boolean</td>
        <td>
          指定是否必须定义该 ConfigMap 或其键<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.runtimeConfig.sqliteDatabases[index].options[index].valueFrom.secretKeyRef` 
<small>[返回父级](#spinappspecruntimeconfigsqlitedatabasesindexoptionsindexvaluefrom)</small>


选择应用命名空间内 secret 的某个键<br/>

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
        <td><b>key</b></td>
        <td>string</td>
        <td>
          要从中选择的 secret 键。必须是有效的 secret 键。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>name</b></td>
        <td>string</td>
        <td>
          被引用对象的名称。此字段实际上是必填的，但出于向后兼容的考虑，允许为空。此处为空值的实例几乎可以肯定是错误的。更多信息：https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names<br/> <br/> <i>默认</i>： <br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>optional</b></td>
        <td>boolean</td>
        <td>
          指定是否必须定义该 Secret 或其键<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.variables[index]` 
<small>[返回父级](#spinappspec)</small>


SpinVar 定义 spin 变量与静态值或动态值之间的绑定。

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
        <td><b>name</b></td>
        <td>string</td>
        <td>
          要绑定的变量名称。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>value</b></td>
        <td>string</td>
        <td>
          Value 是绑定到变量的静态值。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvariablesindexvaluefrom">valueFrom</a></b></td>
        <td>object</td>
        <td>
          ValueFrom 是动态绑定变量的引用。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.variables[index].valueFrom` 
<small>[返回父级](#spinappspecvariablesindex)</small>


ValueFrom 是动态绑定变量的引用。<br/>

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
        <td><b><a href="#spinappspecvariablesindexvaluefromconfigmapkeyref">configMapKeyRef</a></b></td>
        <td>object</td>
        <td>
          选择 ConfigMap 的某个键。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvariablesindexvaluefromfieldref">fieldRef</a></b></td>
        <td>object</td>
        <td>
          选择 Pod 的某个字段：支持 metadata.name、metadata.namespace、`metadata.labels['<KEY>']`、`metadata.annotations['<KEY>']`、spec.nodeName、spec.serviceAccountName、status.hostIP、status.podIP、status.podIPs。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvariablesindexvaluefromresourcefieldref">resourceFieldRef</a></b></td>
        <td>object</td>
        <td>
          选择容器的某个资源：目前仅支持资源的 limits 和 requests（limits.cpu、limits.memory、limits.ephemeral-storage、requests.cpu、requests.memory 和 requests.ephemeral-storage）。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvariablesindexvaluefromsecretkeyref">secretKeyRef</a></b></td>
        <td>object</td>
        <td>
          选择 Pod 命名空间内 secret 的某个键<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.variables[index].valueFrom.configMapKeyRef` 
<small>[返回父级](#spinappspecvariablesindexvaluefrom)</small>


选择 ConfigMap 的某个键。<br/>

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
        <td><b>key</b></td>
        <td>string</td>
        <td>
          要选择的键。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>name</b></td>
        <td>string</td>
        <td>
          被引用对象的名称。此字段实际上是必填的，但出于向后兼容的考虑，允许为空。此处为空值的实例几乎可以肯定是错误的。更多信息：https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names<br/> <br/> <i>默认</i>： <br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>optional</b></td>
        <td>boolean</td>
        <td>
          指定是否必须定义该 ConfigMap 或其键<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.variables[index].valueFrom.fieldRef` 
<small>[返回父级](#spinappspecvariablesindexvaluefrom)</small>


选择 Pod 的某个字段：支持 metadata.name、metadata.namespace、`metadata.labels['<KEY>']`、`metadata.annotations['<KEY>']`、spec.nodeName、spec.serviceAccountName、status.hostIP、status.podIP、status.podIPs。<br/>

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
        <td><b>fieldPath</b></td>
        <td>string</td>
        <td>
          在指定 API 版本中要选择的字段路径。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>apiVersion</b></td>
        <td>string</td>
        <td>
          FieldPath 所基于的 schema 版本，默认为 "v1"。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.variables[index].valueFrom.resourceFieldRef` 
<small>[返回父级](#spinappspecvariablesindexvaluefrom)</small>


选择容器的某个资源：目前仅支持资源的 limits 和 requests（limits.cpu、limits.memory、limits.ephemeral-storage、requests.cpu、requests.memory 和 requests.ephemeral-storage）。<br/>

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
        <td><b>resource</b></td>
        <td>string</td>
        <td>
          必填：要选择的资源<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>containerName</b></td>
        <td>string</td>
        <td>
          容器名称：对 volume 为必填，对环境变量为可选<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>divisor</b></td>
        <td>int or string</td>
        <td>
          指定所公开资源的输出格式，默认为 "1"<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.variables[index].valueFrom.secretKeyRef` 
<small>[返回父级](#spinappspecvariablesindexvaluefrom)</small>


选择 Pod 命名空间内 secret 的某个键<br/>

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
        <td><b>key</b></td>
        <td>string</td>
        <td>
          要从中选择的 secret 键。必须是有效的 secret 键。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>name</b></td>
        <td>string</td>
        <td>
          被引用对象的名称。此字段实际上是必填的，但出于向后兼容的考虑，允许为空。此处为空值的实例几乎可以肯定是错误的。更多信息：https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names<br/> <br/> <i>默认</i>： <br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>optional</b></td>
        <td>boolean</td>
        <td>
          指定是否必须定义该 Secret 或其键<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumeMounts[index]` 
<small>[返回父级](#spinappspec)</small>


VolumeMount 描述 volume 在容器内的挂载。

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
        <td><b>mountPath</b></td>
        <td>string</td>
        <td>
          volume 应挂载到容器内的路径。不得包含 ':'。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>name</b></td>
        <td>string</td>
        <td>
          此值必须与某个 Volume 的 Name 匹配。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>mountPropagation</b></td>
        <td>string</td>
        <td>
          mountPropagation 决定挂载如何在宿主机与容器之间传播。未设置时使用 MountPropagationNone。此字段在 1.10 中为 beta 版。当 RecursiveReadOnly 设置为 IfPossible 或 Enabled 时，MountPropagation 必须为 None 或不指定（默认为 None）。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>readOnly</b></td>
        <td>boolean</td>
        <td>
          若为 true 则以只读方式挂载，否则（false 或未指定）以读写方式挂载。默认为 false。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>recursiveReadOnly</b></td>
        <td>string</td>
        <td>
          RecursiveReadOnly 指定是否以递归方式处理只读挂载。

若 ReadOnly 为 false，此字段无意义且不得指定。

若 ReadOnly 为 true 且此字段设置为 Disabled，则挂载不会被设为递归只读。若此字段设置为 IfPossible，则在容器运行时支持时将挂载设为递归只读。若此字段设置为 Enabled，则在容器运行时支持时将挂载设为递归只读，否则 Pod 不会启动，并会生成错误以说明原因。

若此字段设置为 IfPossible 或 Enabled，则 MountPropagation 必须设置为 None（或不指定，默认为 None）。

若未指定此字段，则视为等同于 Disabled。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>subPath</b></td>
        <td>string</td>
        <td>
          从 volume 中挂载容器 volume 的子路径。默认为 ""（volume 的根目录）。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>subPathExpr</b></td>
        <td>string</td>
        <td>
          从 volume 中挂载容器 volume 的展开路径。行为与 SubPath 类似，但会使用容器的环境变量展开 $(VAR_NAME) 形式的环境变量引用。默认为 ""（volume 的根目录）。SubPathExpr 与 SubPath 互斥。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index]` 
<small>[返回父级](#spinappspec)</small>


Volume 表示 Pod 中的一个具名 volume，可被 Pod 内的任何容器访问。

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
        <td><b>name</b></td>
        <td>string</td>
        <td>
          volume 的名称。必须是 DNS_LABEL 且在 Pod 内唯一。更多信息：https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexawselasticblockstore">awsElasticBlockStore</a></b></td>
        <td>object</td>
        <td>
          awsElasticBlockStore 表示挂接到 kubelet 宿主机并随后暴露给 Pod 的 AWS Disk 资源。已弃用：AWSElasticBlockStore 已弃用。树内 awsElasticBlockStore 类型的所有操作都会重定向到 ebs.csi.aws.com CSI 驱动。更多信息：https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexazuredisk">azureDisk</a></b></td>
        <td>object</td>
        <td>
          azureDisk 表示挂载在宿主机并绑定挂载到 Pod 的 Azure Data Disk。已弃用：AzureDisk 已弃用。树内 azureDisk 类型的所有操作都会重定向到 disk.csi.azure.com CSI 驱动。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexazurefile">azureFile</a></b></td>
        <td>object</td>
        <td>
          azureFile 表示挂载在宿主机并绑定挂载到 Pod 的 Azure File Service。已弃用：AzureFile 已弃用。树内 azureFile 类型的所有操作都会重定向到 file.csi.azure.com CSI 驱动。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexcephfs">cephfs</a></b></td>
        <td>object</td>
        <td>
          cephFS 表示与 Pod 生命周期相同的、挂载在宿主机上的 Ceph FS。已弃用：CephFS 已弃用，不再支持树内 cephfs 类型。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexcinder">cinder</a></b></td>
        <td>object</td>
        <td>
          cinder 表示挂接并挂载在 kubelet 宿主机上的 cinder volume。已弃用：Cinder 已弃用。树内 cinder 类型的所有操作都会重定向到 cinder.csi.openstack.org CSI 驱动。更多信息：https://examples.k8s.io/mysql-cinder-pd/README.md<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexconfigmap">configMap</a></b></td>
        <td>object</td>
        <td>
          configMap 表示应填充此 volume 的 configMap<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexcsi">csi</a></b></td>
        <td>object</td>
        <td>
          csi（Container Storage Interface）表示由某些外部 CSI 驱动处理的临时存储。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexdownwardapi">downwardAPI</a></b></td>
        <td>object</td>
        <td>
          downwardAPI 表示应填充此 volume 的 Pod 相关 downward API 信息<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexemptydir">emptyDir</a></b></td>
        <td>object</td>
        <td>
          emptyDir 表示与 Pod 生命周期相同的临时目录。更多信息：https://kubernetes.io/docs/concepts/storage/volumes#emptydir<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexephemeral">ephemeral</a></b></td>
        <td>object</td>
        <td>
          ephemeral 表示由集群存储驱动处理的 volume。该 volume 的生命周期与定义它的 Pod 绑定——会在 Pod 启动前创建，并在 Pod 删除时删除。

在以下情况使用：a) 仅在 Pod 运行期间需要该 volume；b) 需要普通 volume 的特性（如从快照恢复或容量跟踪）；c) 存储驱动通过 storage class 指定；d) 存储驱动支持通过 PersistentVolumeClaim 进行动态卷供给（关于此 volume 类型与 PersistentVolumeClaim 之间关系的更多信息，请参见 EphemeralVolumeSource）。

对于需要比单个 Pod 生命周期更持久存在的 volume，请使用 PersistentVolumeClaim 或特定厂商的 API。

如果 CSI 驱动的设计用途就是轻量本地临时卷，可将其用于此类 volume——更多信息请参见该驱动的文档。

Pod 可以同时使用这两种临时卷和持久卷。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexfc">fc</a></b></td>
        <td>object</td>
        <td>
          fc 表示挂接到 kubelet 宿主机并随后暴露给 Pod 的 Fibre Channel 资源。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexflexvolume">flexVolume</a></b></td>
        <td>object</td>
        <td>
          flexVolume 表示使用基于 exec 的插件供给/挂接的通用 volume 资源。已弃用：FlexVolume 已弃用。请考虑改用 CSIDriver。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexflocker">flocker</a></b></td>
        <td>object</td>
        <td>
          flocker 表示挂接到 kubelet 宿主机的 Flocker volume。这依赖 Flocker 控制服务的运行。已弃用：Flocker 已弃用，不再支持树内 flocker 类型。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexgcepersistentdisk">gcePersistentDisk</a></b></td>
        <td>object</td>
        <td>
          gcePersistentDisk 表示挂接到 kubelet 宿主机并随后暴露给 Pod 的 GCE Disk 资源。已弃用：GCEPersistentDisk 已弃用。树内 gcePersistentDisk 类型的所有操作都会重定向到 pd.csi.storage.gke.io CSI 驱动。更多信息：https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexgitrepo">gitRepo</a></b></td>
        <td>object</td>
        <td>
          gitRepo 表示特定 revision 的 git 仓库。已弃用：GitRepo 已弃用。若要为容器提供 git 仓库，请将一个 EmptyDir 挂载到使用 git 克隆该仓库的 InitContainer，再将该 EmptyDir 挂载到 Pod 的容器中。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexglusterfs">glusterfs</a></b></td>
        <td>object</td>
        <td>
          glusterfs 表示与 Pod 生命周期相同的、挂载在宿主机上的 Glusterfs。已弃用：Glusterfs 已弃用，不再支持树内 glusterfs 类型。更多信息：https://examples.k8s.io/volumes/glusterfs/README.md<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexhostpath">hostPath</a></b></td>
        <td>object</td>
        <td>
          hostPath 表示宿主机上已存在的、直接暴露给容器的文件或目录。这通常供系统代理或其他允许查看宿主机的特权程序使用。大多数容器不需要此类型。更多信息：https://kubernetes.io/docs/concepts/storage/volumes#hostpath<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindeximage">image</a></b></td>
        <td>object</td>
        <td>
          image 表示拉取并挂载到 kubelet 宿主机上的 OCI 对象（容器镜像或 artifact）。volume 在 Pod 启动时根据提供的 PullPolicy 值进行解析：

- Always：kubelet 始终尝试拉取该引用，如果拉取失败，容器创建将失败。- Never：kubelet 从不拉取该引用，仅使用本地镜像或 artifact，如果该引用不存在，容器创建将失败。- IfNotPresent：如果磁盘上尚不存在该引用，kubelet 会进行拉取，如果该引用不存在且拉取失败，容器创建将失败。

如果 Pod 被删除并重新创建，该 volume 会重新解析，这意味着重新创建 Pod 时新的远端内容将可用。Pod 启动期间解析或拉取镜像失败会阻止容器启动，并可能增加明显的延迟。失败将按常规 volume 回退策略重试，并记录到 Pod 的 reason 和 message 中。此 volume 可挂载的对象类型由宿主机上的容器运行时实现定义，且至少必须包含容器 image 字段所支持的所有有效类型。OCI 对象通过与容器镜像相同的方式合并 manifest 层，挂载到单个目录（spec.containers[*].volumeMounts.mountPath）。该 volume 将以只读（ro）且文件不可执行（noexec）的方式挂载。1.33 之前不支持容器的子路径挂载（spec.containers[*].volumeMounts.subpath）。字段 spec.securityContext.fsGroupChangePolicy 对此 volume 类型无效。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexiscsi">iscsi</a></b></td>
        <td>object</td>
        <td>
          iscsi 表示挂接到 kubelet 宿主机并随后暴露给 Pod 的 ISCSI Disk 资源。更多信息：https://examples.k8s.io/volumes/iscsi/README.md<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexnfs">nfs</a></b></td>
        <td>object</td>
        <td>
          nfs 表示与 Pod 生命周期相同的、挂载在宿主机上的 NFS。更多信息：https://kubernetes.io/docs/concepts/storage/volumes#nfs<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexpersistentvolumeclaim">persistentVolumeClaim</a></b></td>
        <td>object</td>
        <td>
          persistentVolumeClaimVolumeSource 表示对同一命名空间内 PersistentVolumeClaim 的引用。更多信息：https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexphotonpersistentdisk">photonPersistentDisk</a></b></td>
        <td>object</td>
        <td>
          photonPersistentDisk 表示挂接并挂载在 kubelet 宿主机上的 PhotonController 持久磁盘。已弃用：PhotonPersistentDisk 已弃用，不再支持树内 photonPersistentDisk 类型。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexportworxvolume">portworxVolume</a></b></td>
        <td>object</td>
        <td>
          portworxVolume 表示挂接并挂载在 kubelet 宿主机上的 portworx volume。已弃用：PortworxVolume 已弃用。当 CSIMigrationPortworx feature-gate 开启时，树内 portworxVolume 类型的所有操作都会重定向到 pxd.portworx.com CSI 驱动。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexprojected">projected</a></b></td>
        <td>object</td>
        <td>
          将 secrets、configmaps 和 downward API 等资源一次性投影出来的内容<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexquobyte">quobyte</a></b></td>
        <td>object</td>
        <td>
          quobyte 表示与 Pod 生命周期相同的、挂载在宿主机上的 Quobyte。已弃用：Quobyte 已弃用，不再支持树内 quobyte 类型。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexrbd">rbd</a></b></td>
        <td>object</td>
        <td>
          rbd 表示与 Pod 生命周期相同的、挂载在宿主机上的 Rados Block Device。已弃用：RBD 已弃用，不再支持树内 rbd 类型。更多信息：https://examples.k8s.io/volumes/rbd/README.md<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexscaleio">scaleIO</a></b></td>
        <td>object</td>
        <td>
          scaleIO 表示挂接并挂载在 Kubernetes 节点上的 ScaleIO 持久卷。已弃用：ScaleIO 已弃用，不再支持树内 scaleIO 类型。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexsecret">secret</a></b></td>
        <td>object</td>
        <td>
          secret 表示应填充此 volume 的 secret。更多信息：https://kubernetes.io/docs/concepts/storage/volumes#secret<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexstorageos">storageos</a></b></td>
        <td>object</td>
        <td>
          storageOS 表示挂接并挂载在 Kubernetes 节点上的 StorageOS volume。已弃用：StorageOS 已弃用，不再支持树内 storageos 类型。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexvspherevolume">vsphereVolume</a></b></td>
        <td>object</td>
        <td>
          vsphereVolume 表示挂接并挂载在 kubelet 宿主机上的 vSphere volume。已弃用：VsphereVolume 已弃用。树内 vsphereVolume 类型的所有操作都会重定向到 csi.vsphere.vmware.com CSI 驱动。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].awsElasticBlockStore` 
<small>[返回父级](#spinappspecvolumesindex)</small>


awsElasticBlockStore 表示挂接到 kubelet 宿主机并随后暴露给 Pod 的 AWS Disk 资源。已弃用：AWSElasticBlockStore 已弃用。树内 awsElasticBlockStore 类型的所有操作都会重定向到 ebs.csi.aws.com CSI 驱动。更多信息：https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore<br/>

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
        <td><b>volumeID</b></td>
        <td>string</td>
        <td>
          volumeID 是 AWS 中持久磁盘资源（Amazon EBS volume）的唯一 ID。更多信息：https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>fsType</b></td>
        <td>string</td>
        <td>
          fsType 是要挂载的 volume 的文件系统类型。提示：请确保宿主机操作系统支持该文件系统类型。示例："ext4"、"xfs"、"ntfs"。未指定时隐式推断为 "ext4"。更多信息：https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>partition</b></td>
        <td>integer</td>
        <td>
          partition 是要挂载的 volume 中的分区。如果省略，默认按 volume 名称挂载。示例：对于 volume /dev/sda1，分区指定为 "1"；类似地，/dev/sda 的 volume 分区为 "0"（也可以将该属性留空）。<br/> <br/> <i>格式</i>：int32<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>readOnly</b></td>
        <td>boolean</td>
        <td>
          readOnly 值为 true 时将强制在 VolumeMounts 中设置 readOnly。更多信息：https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].azureDisk` 
<small>[返回父级](#spinappspecvolumesindex)</small>


azureDisk 表示挂载在宿主机并绑定挂载到 Pod 的 Azure Data Disk。已弃用：AzureDisk 已弃用。树内 azureDisk 类型的所有操作都会重定向到 disk.csi.azure.com CSI 驱动。<br/>

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
        <td><b>diskName</b></td>
        <td>string</td>
        <td>
          diskName 是 blob 存储中数据磁盘的名称<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>diskURI</b></td>
        <td>string</td>
        <td>
          diskURI 是 blob 存储中数据磁盘的 URI<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>cachingMode</b></td>
        <td>string</td>
        <td>
          cachingMode 是主机缓存模式：None、Read Only、Read Write。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>fsType</b></td>
        <td>string</td>
        <td>
          fsType 是要挂载的文件系统类型。必须是宿主机操作系统支持的文件系统类型。例如 "ext4"、"xfs"、"ntfs"。未指定时隐式推断为 "ext4"。<br/> <br/> <i>默认</i>：ext4<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>kind</b></td>
        <td>string</td>
        <td>
          kind 的可选值：Shared——每个存储账户多个 blob 磁盘；Dedicated——每个存储账户单个 blob 磁盘；Managed——azure 托管数据磁盘（仅限托管可用性集）。默认为 shared<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>readOnly</b></td>
        <td>boolean</td>
        <td>
          readOnly 默认为 false（读写）。此处设为 ReadOnly 将强制在 VolumeMounts 中设置 ReadOnly。<br/> <br/> <i>默认</i>：false<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].azureFile` 
<small>[返回父级](#spinappspecvolumesindex)</small>


azureFile 表示挂载在宿主机并绑定挂载到 Pod 的 Azure File Service。已弃用：AzureFile 已弃用。树内 azureFile 类型的所有操作都会重定向到 file.csi.azure.com CSI 驱动。<br/>

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
        <td><b>secretName</b></td>
        <td>string</td>
        <td>
          secretName 是包含 Azure 存储账户名称和密钥的 secret 的名称<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>shareName</b></td>
        <td>string</td>
        <td>
          shareName 是 azure 共享名称<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>readOnly</b></td>
        <td>boolean</td>
        <td>
          readOnly 默认为 false（读写）。此处设为 ReadOnly 将强制在 VolumeMounts 中设置 ReadOnly。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].cephfs` 
<small>[返回父级](#spinappspecvolumesindex)</small>


cephFS 表示与 Pod 生命周期相同的、挂载在宿主机上的 Ceph FS。已弃用：CephFS 已弃用，不再支持树内 cephfs 类型。<br/>

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
        <td><b>monitors</b></td>
        <td>[]string</td>
        <td>
          monitors 为必填：Monitors 是 Ceph monitor 的集合。更多信息：https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>path</b></td>
        <td>string</td>
        <td>
          path 为可选：用作挂载的根目录而非完整的 Ceph 树，默认为 /<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>readOnly</b></td>
        <td>boolean</td>
        <td>
          readOnly 为可选：默认为 false（读写）。此处设为 ReadOnly 将强制在 VolumeMounts 中设置 ReadOnly。更多信息：https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>secretFile</b></td>
        <td>string</td>
        <td>
          secretFile 为可选：SecretFile 是 User 的 key ring 路径，默认为 /etc/ceph/user.secret。更多信息：https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexcephfssecretref">secretRef</a></b></td>
        <td>object</td>
        <td>
          secretRef 为可选：SecretRef 是对 User 认证 secret 的引用，默认为空。更多信息：https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>user</b></td>
        <td>string</td>
        <td>
          user 为可选：User 是 rados 用户名，默认为 admin。更多信息：https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].cephfs.secretRef` 
<small>[返回父级](#spinappspecvolumesindexcephfs)</small>


secretRef 为可选：SecretRef 是对 User 认证 secret 的引用，默认为空。更多信息：https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it<br/>

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
        <td><b>name</b></td>
        <td>string</td>
        <td>
          被引用对象的名称。此字段实际上是必填的，但出于向后兼容的考虑，允许为空。此处为空值的实例几乎可以肯定是错误的。更多信息：https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names<br/> <br/> <i>默认</i>： <br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].cinder` 
<small>[返回父级](#spinappspecvolumesindex)</small>


cinder 表示挂接并挂载在 kubelet 宿主机上的 cinder volume。已弃用：Cinder 已弃用。树内 cinder 类型的所有操作都会重定向到 cinder.csi.openstack.org CSI 驱动。更多信息：https://examples.k8s.io/mysql-cinder-pd/README.md<br/>

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
        <td><b>volumeID</b></td>
        <td>string</td>
        <td>
          volumeID 用于在 cinder 中标识该 volume。更多信息：https://examples.k8s.io/mysql-cinder-pd/README.md<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>fsType</b></td>
        <td>string</td>
        <td>
          fsType 是要挂载的文件系统类型。必须是宿主机操作系统支持的文件系统类型。示例："ext4"、"xfs"、"ntfs"。未指定时隐式推断为 "ext4"。更多信息：https://examples.k8s.io/mysql-cinder-pd/README.md<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>readOnly</b></td>
        <td>boolean</td>
        <td>
          readOnly 默认为 false（读写）。此处设为 ReadOnly 将强制在 VolumeMounts 中设置 ReadOnly。更多信息：https://examples.k8s.io/mysql-cinder-pd/README.md<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexcindersecretref">secretRef</a></b></td>
        <td>object</td>
        <td>
          secretRef 为可选：指向包含连接 OpenStack 所用参数的 secret 对象。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].cinder.secretRef` 
<small>[返回父级](#spinappspecvolumesindexcinder)</small>


secretRef 为可选：指向包含连接 OpenStack 所用参数的 secret 对象。<br/>

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
        <td><b>name</b></td>
        <td>string</td>
        <td>
          被引用对象的名称。此字段实际上是必填的，但出于向后兼容的考虑，允许为空。此处为空值的实例几乎可以肯定是错误的。更多信息：https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names<br/> <br/> <i>默认</i>： <br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].configMap` 
<small>[返回父级](#spinappspecvolumesindex)</small>


configMap 表示应填充此 volume 的 configMap<br/>

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
        <td><b>defaultMode</b></td>
        <td>integer</td>
        <td>
          defaultMode 为可选：默认用于为创建的文件设置权限的 mode 位。必须是 0000 到 0777 之间的八进制值或 0 到 511 之间的十进制值。YAML 同时接受八进制和十进制值，JSON 要求 mode 位使用十进制值。默认为 0644。路径内的目录不受此设置影响。这可能与影响文件 mode 的其他选项（如 fsGroup）冲突，结果可能是设置了其他 mode 位。<br/> <br/> <i>格式</i>：int32<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexconfigmapitemsindex">items</a></b></td>
        <td>[]object</td>
        <td>
          items 如果未指定，被引用 ConfigMap 的 Data 字段中的每个键值对都会以文件形式投影到 volume 中，文件名为键，内容为值。如果指定，则列出的键会被投影到指定的路径，未列出的键不会出现。如果指定的键不存在于 ConfigMap 中，除非标记为可选，volume 设置将报错。路径必须是相对路径，且不得包含 '..' 路径或以 '..' 开头。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>name</b></td>
        <td>string</td>
        <td>
          被引用对象的名称。此字段实际上是必填的，但出于向后兼容的考虑，允许为空。此处为空值的实例几乎可以肯定是错误的。更多信息：https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names<br/> <br/> <i>默认</i>： <br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>optional</b></td>
        <td>boolean</td>
        <td>
          optional 指定是否必须定义该 ConfigMap 或其键<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].configMap.items[index]` 
<small>[返回父级](#spinappspecvolumesindexconfigmap)</small>


将字符串键映射到 volume 内的某个路径。

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
        <td><b>key</b></td>
        <td>string</td>
        <td>
          key 是要投影的键。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>path</b></td>
        <td>string</td>
        <td>
          path 是将键映射到的文件的相对路径。不得是绝对路径。不得包含路径元素 '..'。不得以字符串 '..' 开头。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>mode</b></td>
        <td>integer</td>
        <td>
          mode 为可选：用于为此文件设置权限的 mode 位。必须是 0000 到 0777 之间的八进制值或 0 到 511 之间的十进制值。YAML 同时接受八进制和十进制值，JSON 要求 mode 位使用十进制值。如果未指定，将使用 volume 的 defaultMode。这可能与影响文件 mode 的其他选项（如 fsGroup）冲突，结果可能是设置了其他 mode 位。<br/> <br/> <i>格式</i>：int32<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].csi` 
<small>[返回父级](#spinappspecvolumesindex)</small>


csi（Container Storage Interface）表示由某些外部 CSI 驱动处理的临时存储。<br/>

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
        <td><b>driver</b></td>
        <td>string</td>
        <td>
          driver 是处理此 volume 的 CSI 驱动的名称。请向管理员确认在集群中注册的正确名称。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>fsType</b></td>
        <td>string</td>
        <td>
          要挂载的 fsType。例如 "ext4"、"xfs"、"ntfs"。如果未提供，空值会传递给关联的 CSI 驱动，由其决定要应用的默认文件系统。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexcsinodepublishsecretref">nodePublishSecretRef</a></b></td>
        <td>object</td>
        <td>
          nodePublishSecretRef 是对包含敏感信息的 secret 对象的引用，这些信息会传递给 CSI 驱动以完成 CSI NodePublishVolume 和 NodeUnpublishVolume 调用。此字段为可选，如果不需要 secret 可以为空。如果 secret 对象包含多个 secret，则所有 secret 引用都会被传递。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>readOnly</b></td>
        <td>boolean</td>
        <td>
          readOnly 指定此 volume 的只读配置。默认为 false（读写）。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>volumeAttributes</b></td>
        <td>map[string]string</td>
        <td>
          volumeAttributes 存储传递给 CSI 驱动的驱动特定属性。支持哪些值请参见所用驱动的文档。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].csi.nodePublishSecretRef` 
<small>[返回父级](#spinappspecvolumesindexcsi)</small>


nodePublishSecretRef 是对包含敏感信息的 secret 对象的引用，这些信息会传递给 CSI 驱动以完成 CSI NodePublishVolume 和 NodeUnpublishVolume 调用。此字段为可选，如果不需要 secret 可以为空。如果 secret 对象包含多个 secret，则所有 secret 引用都会被传递。<br/>

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
        <td><b>name</b></td>
        <td>string</td>
        <td>
          被引用对象的名称。此字段实际上是必填的，但出于向后兼容的考虑，允许为空。此处为空值的实例几乎可以肯定是错误的。更多信息：https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names<br/> <br/> <i>默认</i>： <br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].downwardAPI` 
<small>[返回父级](#spinappspecvolumesindex)</small>


downwardAPI 表示应填充此 volume 的 Pod 相关 downward API 信息<br/>

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
        <td><b>defaultMode</b></td>
        <td>integer</td>
        <td>
          可选：默认用于为创建的文件设置权限的 mode 位。必须是 0000 到 0777 之间的八进制值或 0 到 511 之间的十进制值。YAML 同时接受八进制和十进制值，JSON 要求 mode 位使用十进制值。默认为 0644。路径内的目录不受此设置影响。这可能与影响文件 mode 的其他选项（如 fsGroup）冲突，结果可能是设置了其他 mode 位。<br/> <br/> <i>格式</i>：int32<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexdownwardapiitemsindex">items</a></b></td>
        <td>[]object</td>
        <td>
          Items 是 downward API volume 文件的列表<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].downwardAPI.items[index]` 
<small>[返回父级](#spinappspecvolumesindexdownwardapi)</small>


DownwardAPIVolumeFile 表示用于创建包含 Pod 字段的文件的信息。

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
        <td><b>path</b></td>
        <td>string</td>
        <td>
          必填：Path 是要创建的文件的相对路径名。不得是绝对路径或包含 '..' 路径。必须为 utf-8 编码。相对路径的第一项不得以 '..' 开头<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexdownwardapiitemsindexfieldref">fieldRef</a></b></td>
        <td>object</td>
        <td>
          必填：选择 Pod 的某个字段：仅支持 annotations、labels、name、namespace 和 uid。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>mode</b></td>
        <td>integer</td>
        <td>
          可选：用于为此文件设置权限的 mode 位，必须是 0000 到 0777 之间的八进制值或 0 到 511 之间的十进制值。YAML 同时接受八进制和十进制值，JSON 要求 mode 位使用十进制值。如果未指定，将使用 volume 的 defaultMode。这可能与影响文件 mode 的其他选项（如 fsGroup）冲突，结果可能是设置了其他 mode 位。<br/> <br/> <i>格式</i>：int32<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexdownwardapiitemsindexresourcefieldref">resourceFieldRef</a></b></td>
        <td>object</td>
        <td>
          选择容器的某个资源：目前仅支持资源的 limits 和 requests（limits.cpu、limits.memory、requests.cpu 和 requests.memory）。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].downwardAPI.items[index].fieldRef` 
<small>[返回父级](#spinappspecvolumesindexdownwardapiitemsindex)</small>


必填：选择 Pod 的某个字段：仅支持 annotations、labels、name、namespace 和 uid。<br/>

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
        <td><b>fieldPath</b></td>
        <td>string</td>
        <td>
          在指定 API 版本中要选择的字段路径。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>apiVersion</b></td>
        <td>string</td>
        <td>
          FieldPath 所基于的 schema 版本，默认为 "v1"。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].downwardAPI.items[index].resourceFieldRef` 
<small>[返回父级](#spinappspecvolumesindexdownwardapiitemsindex)</small>


选择容器的某个资源：目前仅支持资源的 limits 和 requests（limits.cpu、limits.memory、requests.cpu 和 requests.memory）。<br/>

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
        <td><b>resource</b></td>
        <td>string</td>
        <td>
          必填：要选择的资源<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>containerName</b></td>
        <td>string</td>
        <td>
          容器名称：对 volume 为必填，对环境变量为可选<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>divisor</b></td>
        <td>int or string</td>
        <td>
          指定所公开资源的输出格式，默认为 "1"<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].emptyDir` 
<small>[返回父级](#spinappspecvolumesindex)</small>


emptyDir 表示与 Pod 生命周期相同的临时目录。更多信息：https://kubernetes.io/docs/concepts/storage/volumes#emptydir<br/>

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
        <td><b>medium</b></td>
        <td>string</td>
        <td>
          medium 表示支持此目录的存储介质类型。默认为 ""，表示使用节点的默认介质。必须是空字符串（默认）或 Memory。更多信息：https://kubernetes.io/docs/concepts/storage/volumes#emptydir<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>sizeLimit</b></td>
        <td>int or string</td>
        <td>
          sizeLimit 是此 EmptyDir volume 所需的本地存储总量。此大小限制同样适用于 memory 介质。memory 介质 EmptyDir 的最大用量为此处指定的 SizeLimit 与 Pod 中所有容器内存 limits 之和中的较小值。默认为 nil，表示未定义限制。更多信息：https://kubernetes.io/docs/concepts/storage/volumes#emptydir<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].ephemeral` 
<small>[返回父级](#spinappspecvolumesindex)</small>


ephemeral 表示由集群存储驱动处理的 volume。该 volume 的生命周期与定义它的 Pod 绑定——会在 Pod 启动前创建，并在 Pod 删除时删除。

在以下情况使用：a) 仅在 Pod 运行期间需要该 volume；b) 需要普通 volume 的特性（如从快照恢复或容量跟踪）；c) 存储驱动通过 storage class 指定；d) 存储驱动支持通过 PersistentVolumeClaim 进行动态卷供给（关于此 volume 类型与 PersistentVolumeClaim 之间关系的更多信息，请参见 EphemeralVolumeSource）。

对于需要比单个 Pod 生命周期更持久存在的 volume，请使用 PersistentVolumeClaim 或特定厂商的 API。

如果 CSI 驱动的设计用途就是轻量本地临时卷，可将其用于此类 volume——更多信息请参见该驱动的文档。

Pod 可以同时使用这两种临时卷和持久卷。<br/>

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
        <td><b><a href="#spinappspecvolumesindexephemeralvolumeclaimtemplate">volumeClaimTemplate</a></b></td>
        <td>object</td>
        <td>
          将用于创建独立的 PVC 来供给此 volume。嵌入了此 EphemeralVolumeSource 的 Pod 将成为该 PVC 的所有者，即 PVC 会随 Pod 一起删除。PVC 的名称为 `<pod name>-<volume name>`，其中 `<volume name>` 是 `PodSpec.Volumes` 数组条目中的名称。如果拼接后的名称对 PVC 无效（例如过长），Pod 校验将拒绝该 Pod。

与该 Pod 无关的同名既有 PVC *不会* 被该 Pod 使用，以避免误用无关的 volume。此时 Pod 的启动会被阻塞，直到该无关 PVC 被删除。如果此类预先创建的 PVC 本意就是供该 Pod 使用，则必须在 Pod 存在后为该 PVC 添加指向 Pod 的 owner reference。通常没有必要这样做，但在手动重建损坏的集群时可能有用。

此字段为只读，PVC 创建后 Kubernetes 不会对其进行任何更改。

必填，不得为 nil。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].ephemeral.volumeClaimTemplate` 
<small>[返回父级](#spinappspecvolumesindexephemeral)</small>


将用于创建独立的 PVC 来供给此 volume。嵌入了此 EphemeralVolumeSource 的 Pod 将成为该 PVC 的所有者，即 PVC 会随 Pod 一起删除。PVC 的名称为 `<pod name>-<volume name>`，其中 `<volume name>` 是 `PodSpec.Volumes` 数组条目中的名称。如果拼接后的名称对 PVC 无效（例如过长），Pod 校验将拒绝该 Pod。

与该 Pod 无关的同名既有 PVC *不会* 被该 Pod 使用，以避免误用无关的 volume。此时 Pod 的启动会被阻塞，直到该无关 PVC 被删除。如果此类预先创建的 PVC 本意就是供该 Pod 使用，则必须在 Pod 存在后为该 PVC 添加指向 Pod 的 owner reference。通常没有必要这样做，但在手动重建损坏的集群时可能有用。

此字段为只读，PVC 创建后 Kubernetes 不会对其进行任何更改。

必填，不得为 nil。<br/>

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
        <td><b><a href="#spinappspecvolumesindexephemeralvolumeclaimtemplatespec">spec</a></b></td>
        <td>object</td>
        <td>
          PersistentVolumeClaim 的规格。全部内容会原样复制到根据此模板创建的 PVC 中。PersistentVolumeClaim 中的相同字段在此同样有效。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>metadata</b></td>
        <td>object</td>
        <td>
          可以包含在创建 PVC 时复制到其中的标签和注解。不允许其他字段，将在校验时被拒绝。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].ephemeral.volumeClaimTemplate.spec` 
<small>[返回父级](#spinappspecvolumesindexephemeralvolumeclaimtemplate)</small>


PersistentVolumeClaim 的规格。全部内容会原样复制到根据此模板创建的 PVC 中。PersistentVolumeClaim 中的相同字段在此同样有效。<br/>

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
        <td><b>accessModes</b></td>
        <td>[]string</td>
        <td>
          accessModes 包含此 volume 应具有的期望访问模式。更多信息：https://kubernetes.io/docs/concepts/storage/persistent-volumes#access-modes-1<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexephemeralvolumeclaimtemplatespecdatasource">dataSource</a></b></td>
        <td>object</td>
        <td>
          dataSource 字段可用于指定以下二者之一：* 已存在的 VolumeSnapshot 对象（snapshot.storage.k8s.io/VolumeSnapshot）* 已存在的 PVC（PersistentVolumeClaim）。如果 provisioner 或外部控制器支持指定的数据源，它将基于指定数据源的内容创建新 volume。启用 AnyVolumeDataSource feature gate 后，dataSource 的内容会被复制到 dataSourceRef；未指定 dataSourceRef.namespace 时，dataSourceRef 的内容会被复制到 dataSource。如果指定了命名空间，则 dataSourceRef 不会被复制到 dataSource。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexephemeralvolumeclaimtemplatespecdatasourceref">dataSourceRef</a></b></td>
        <td>object</td>
        <td>
          dataSourceRef 指定在需要非空 volume 时用于填充数据的对象。可以是非空 API 组（非核心对象）中的任何对象，或 PersistentVolumeClaim 对象。指定此字段后，仅当指定对象的类型与某个已安装的 volume populator 或动态 provisioner 匹配时，volume 绑定才会成功。此字段将取代 dataSource 字段的功能，因此如果两个字段都非空，它们的值必须相同。为了向后兼容，当 dataSourceRef 中未指定命名空间时，如果其中一个字段为空而另一个非空，两个字段（dataSource 和 dataSourceRef）将自动设置为相同的值。当在 dataSourceRef 中指定了命名空间时，dataSource 不会被设置为相同的值且必须为空。dataSource 与 dataSourceRef 有三个重要区别：* dataSource 只允许两种特定类型的对象，而 dataSourceRef 允许任何非核心对象以及 PersistentVolumeClaim 对象。* dataSource 会忽略不允许的值（将其丢弃），而 dataSourceRef 会保留所有值，并在出现不允许的值时生成错误。* dataSource 只允许本地对象，而 dataSourceRef 允许任何命名空间中的对象。(Beta) 使用此字段需要启用 AnyVolumeDataSource feature gate。(Alpha) 使用 dataSourceRef 的命名空间字段需要启用 CrossNamespaceVolumeDataSource feature gate。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexephemeralvolumeclaimtemplatespecresources">resources</a></b></td>
        <td>object</td>
        <td>
          resources 表示此 volume 应具有的最小资源。如果启用了 RecoverVolumeExpansionFailure 特性，用户可以指定低于之前值的资源需求，但仍必须高于 claim 的 status 字段中记录的容量。更多信息：https://kubernetes.io/docs/concepts/storage/persistent-volumes#resources<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexephemeralvolumeclaimtemplatespecselector">selector</a></b></td>
        <td>object</td>
        <td>
          selector 是用于筛选可绑定 volume 的标签查询。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>storageClassName</b></td>
        <td>string</td>
        <td>
          storageClassName 是此 claim 所需的 StorageClass 的名称。更多信息：https://kubernetes.io/docs/concepts/storage/persistent-volumes#class-1<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>volumeAttributesClassName</b></td>
        <td>string</td>
        <td>
          volumeAttributesClassName 可用于设置此 claim 所使用的 VolumeAttributesClass。如果指定，CSI 驱动将使用相应 VolumeAttributesClass 中定义的属性创建或更新 volume。它与 storageClassName 的用途不同，可以在 claim 创建后更改。空字符串值表示不对此 claim 应用任何 VolumeAttributesClass，但一旦设置就不允许将此字段重置为空字符串。如果未指定且 PersistentVolumeClaim 未绑定，则在存在默认 VolumeAttributesClass 时由 persistentvolume controller 设置它。如果 volumeAttributesClass 引用的资源不存在，此 PersistentVolumeClaim 将被设置为 Pending 状态（反映在 modifyVolumeStatus 字段中），直到该资源存在。更多信息：https://kubernetes.io/docs/concepts/storage/volume-attributes-classes/ (Beta) 使用此字段需要启用 VolumeAttributesClass feature gate（默认关闭）。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>volumeMode</b></td>
        <td>string</td>
        <td>
          volumeMode 定义此 claim 所需的 volume 类型。未包含在 claim spec 中时默认为 Filesystem。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>volumeName</b></td>
        <td>string</td>
        <td>
          volumeName 是绑定到支持此 claim 的 PersistentVolume 的引用。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].ephemeral.volumeClaimTemplate.spec.dataSource` 
<small>[返回父级](#spinappspecvolumesindexephemeralvolumeclaimtemplatespec)</small>


dataSource 字段可用于指定以下二者之一：* 已存在的 VolumeSnapshot 对象（snapshot.storage.k8s.io/VolumeSnapshot）* 已存在的 PVC（PersistentVolumeClaim）。如果 provisioner 或外部控制器支持指定的数据源，它将基于指定数据源的内容创建新 volume。启用 AnyVolumeDataSource feature gate 后，dataSource 的内容会被复制到 dataSourceRef；未指定 dataSourceRef.namespace 时，dataSourceRef 的内容会被复制到 dataSource。如果指定了命名空间，则 dataSourceRef 不会被复制到 dataSource。<br/>

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
        <td><b>kind</b></td>
        <td>string</td>
        <td>
          Kind 是被引用资源的类型<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>name</b></td>
        <td>string</td>
        <td>
          Name 是被引用资源的名称<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>apiGroup</b></td>
        <td>string</td>
        <td>
          APIGroup 是被引用资源所属的 API 组。如果未指定 APIGroup，则指定的 Kind 必须位于核心 API 组中。对于任何其他第三方类型，APIGroup 为必填。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].ephemeral.volumeClaimTemplate.spec.dataSourceRef` 
<small>[返回父级](#spinappspecvolumesindexephemeralvolumeclaimtemplatespec)</small>


dataSourceRef 指定在需要非空 volume 时用于填充数据的对象。可以是非空 API 组（非核心对象）中的任何对象，或 PersistentVolumeClaim 对象。指定此字段后，仅当指定对象的类型与某个已安装的 volume populator 或动态 provisioner 匹配时，volume 绑定才会成功。此字段将取代 dataSource 字段的功能，因此如果两个字段都非空，它们的值必须相同。为了向后兼容，当 dataSourceRef 中未指定命名空间时，如果其中一个字段为空而另一个非空，两个字段（dataSource 和 dataSourceRef）将自动设置为相同的值。当在 dataSourceRef 中指定了命名空间时，dataSource 不会被设置为相同的值且必须为空。dataSource 与 dataSourceRef 有三个重要区别：* dataSource 只允许两种特定类型的对象，而 dataSourceRef 允许任何非核心对象以及 PersistentVolumeClaim 对象。* dataSource 会忽略不允许的值（将其丢弃），而 dataSourceRef 会保留所有值，并在出现不允许的值时生成错误。* dataSource 只允许本地对象，而 dataSourceRef 允许任何命名空间中的对象。(Beta) 使用此字段需要启用 AnyVolumeDataSource feature gate。(Alpha) 使用 dataSourceRef 的命名空间字段需要启用 CrossNamespaceVolumeDataSource feature gate。<br/>

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
        <td><b>kind</b></td>
        <td>string</td>
        <td>
          Kind 是被引用资源的类型<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>name</b></td>
        <td>string</td>
        <td>
          Name 是被引用资源的名称<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>apiGroup</b></td>
        <td>string</td>
        <td>
          APIGroup 是被引用资源所属的 API 组。如果未指定 APIGroup，则指定的 Kind 必须位于核心 API 组中。对于任何其他第三方类型，APIGroup 为必填。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>namespace</b></td>
        <td>string</td>
        <td>
          Namespace 是被引用资源所在的命名空间。注意：指定命名空间时，需要在被引用方的命名空间中存在 gateway.networking.k8s.io/ReferenceGrant 对象，以允许该命名空间的所有者接受该引用。详情参见 ReferenceGrant 文档。(Alpha) 此字段需要启用 CrossNamespaceVolumeDataSource feature gate。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].ephemeral.volumeClaimTemplate.spec.resources` 
<small>[返回父级](#spinappspecvolumesindexephemeralvolumeclaimtemplatespec)</small>


resources 表示此 volume 应具有的最小资源。如果启用了 RecoverVolumeExpansionFailure 特性，用户可以指定低于之前值的资源需求，但仍必须高于 claim 的 status 字段中记录的容量。更多信息：https://kubernetes.io/docs/concepts/storage/persistent-volumes#resources<br/>

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
        <td><b>limits</b></td>
        <td>map[string]int or string</td>
        <td>
          Limits 描述允许的最大计算资源量。更多信息：https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>requests</b></td>
        <td>map[string]int or string</td>
        <td>
          Requests 描述所需的最小计算资源量。如果容器未指定 Requests，则在显式指定了 Limits 时默认取 Limits 的值，否则取由实现定义的值。Requests 不能超过 Limits。更多信息：https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].ephemeral.volumeClaimTemplate.spec.selector` 
<small>[返回父级](#spinappspecvolumesindexephemeralvolumeclaimtemplatespec)</small>


selector 是用于筛选可绑定 volume 的标签查询。<br/>

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
        <td><b><a href="#spinappspecvolumesindexephemeralvolumeclaimtemplatespecselectormatchexpressionsindex">matchExpressions</a></b></td>
        <td>[]object</td>
        <td>
          matchExpressions 是标签选择器要求的列表。各要求之间为 AND 关系。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>matchLabels</b></td>
        <td>map[string]string</td>
        <td>
          matchLabels 是一个 {key,value} 键值对映射。matchLabels 中的单个 {key,value} 等价于 matchExpressions 中的一个元素：其 key 字段为 "key"，operator 为 "In"，values 数组只包含 "value"。各要求之间为 AND 关系。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].ephemeral.volumeClaimTemplate.spec.selector.matchExpressions[index]` 
<small>[返回父级](#spinappspecvolumesindexephemeralvolumeclaimtemplatespecselector)</small>


标签选择器要求是一个包含值、键以及关联键和值的 operator 的选择器。

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
        <td><b>key</b></td>
        <td>string</td>
        <td>
          key 是选择器所适用的标签键。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>operator</b></td>
        <td>string</td>
        <td>
          operator 表示键与一组值之间的关系。有效的 operator 为 In、NotIn、Exists 和 DoesNotExist。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>values</b></td>
        <td>[]string</td>
        <td>
          values 是字符串值数组。如果 operator 为 In 或 NotIn，values 数组不能为空。如果 operator 为 Exists 或 DoesNotExist，values 数组必须为空。此数组在 strategic merge patch 时会被替换。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].fc` 
<small>[返回父级](#spinappspecvolumesindex)</small>


fc 表示挂接到 kubelet 宿主机并随后暴露给 Pod 的 Fibre Channel 资源。<br/>

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
        <td><b>fsType</b></td>
        <td>string</td>
        <td>
          fsType 是要挂载的文件系统类型。必须是宿主机操作系统支持的文件系统类型。例如 "ext4"、"xfs"、"ntfs"。未指定时隐式推断为 "ext4"。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>lun</b></td>
        <td>integer</td>
        <td>
          lun 为可选：FC 目标 lun 编号<br/> <br/> <i>格式</i>：int32<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>readOnly</b></td>
        <td>boolean</td>
        <td>
          readOnly 为可选：默认为 false（读写）。此处设为 ReadOnly 将强制在 VolumeMounts 中设置 ReadOnly。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>targetWWNs</b></td>
        <td>[]string</td>
        <td>
          targetWWNs 为可选：FC 目标全球唯一名称（WWN）<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>wwids</b></td>
        <td>[]string</td>
        <td>
          wwids 为可选：FC volume 的全球唯一标识符（wwid）。必须设置 wwids 或 targetWWNs 与 lun 的组合，但不能同时设置二者。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].flexVolume` 
<small>[返回父级](#spinappspecvolumesindex)</small>


flexVolume 表示使用基于 exec 的插件供给/挂接的通用 volume 资源。已弃用：FlexVolume 已弃用。请考虑改用 CSIDriver。<br/>

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
        <td><b>driver</b></td>
        <td>string</td>
        <td>
          driver 是用于此 volume 的驱动名称。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>fsType</b></td>
        <td>string</td>
        <td>
          fsType 是要挂载的文件系统类型。必须是宿主机操作系统支持的文件系统类型。例如 "ext4"、"xfs"、"ntfs"。默认文件系统取决于 FlexVolume 脚本。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>options</b></td>
        <td>map[string]string</td>
        <td>
          options 为可选：此字段保存额外的命令选项（如果有）。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>readOnly</b></td>
        <td>boolean</td>
        <td>
          readOnly 为可选：默认为 false（读写）。此处设为 ReadOnly 将强制在 VolumeMounts 中设置 ReadOnly。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexflexvolumesecretref">secretRef</a></b></td>
        <td>object</td>
        <td>
          secretRef 为可选：secretRef 是对包含传递给插件脚本的敏感信息的 secret 对象的引用。如果未指定 secret 对象，可以为空。如果 secret 对象包含多个 secret，则所有 secret 都会传递给插件脚本。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].flexVolume.secretRef` 
<small>[返回父级](#spinappspecvolumesindexflexvolume)</small>


secretRef 为可选：secretRef 是对包含传递给插件脚本的敏感信息的 secret 对象的引用。如果未指定 secret 对象，可以为空。如果 secret 对象包含多个 secret，则所有 secret 都会传递给插件脚本。<br/>

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
        <td><b>name</b></td>
        <td>string</td>
        <td>
          被引用对象的名称。此字段实际上是必填的，但出于向后兼容的考虑，允许为空。此处为空值的实例几乎可以肯定是错误的。更多信息：https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names<br/> <br/> <i>默认</i>： <br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].flocker` 
<small>[返回父级](#spinappspecvolumesindex)</small>


flocker 表示挂接到 kubelet 宿主机的 Flocker volume。这依赖 Flocker 控制服务的运行。已弃用：Flocker 已弃用，不再支持树内 flocker 类型。<br/>

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
        <td><b>datasetName</b></td>
        <td>string</td>
        <td>
          datasetName 是存储为 Flocker 数据集上 metadata -> name 的数据集名称。应视为已弃用<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>datasetUUID</b></td>
        <td>string</td>
        <td>
          datasetUUID 是数据集的 UUID。这是 Flocker 数据集的唯一标识符<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].gcePersistentDisk` 
<small>[返回父级](#spinappspecvolumesindex)</small>


gcePersistentDisk 表示挂接到 kubelet 宿主机并随后暴露给 Pod 的 GCE Disk 资源。已弃用：GCEPersistentDisk 已弃用。树内 gcePersistentDisk 类型的所有操作都会重定向到 pd.csi.storage.gke.io CSI 驱动。更多信息：https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk<br/>

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
        <td><b>pdName</b></td>
        <td>string</td>
        <td>
          pdName 是 GCE 中 PD 资源的唯一名称。用于在 GCE 中标识该磁盘。更多信息：https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>fsType</b></td>
        <td>string</td>
        <td>
          fsType 是要挂载的 volume 的文件系统类型。提示：请确保宿主机操作系统支持该文件系统类型。示例："ext4"、"xfs"、"ntfs"。未指定时隐式推断为 "ext4"。更多信息：https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>partition</b></td>
        <td>integer</td>
        <td>
          partition 是要挂载的 volume 中的分区。如果省略，默认按 volume 名称挂载。示例：对于 volume /dev/sda1，分区指定为 "1"；类似地，/dev/sda 的 volume 分区为 "0"（也可以将该属性留空）。更多信息：https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk<br/> <br/> <i>格式</i>：int32<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>readOnly</b></td>
        <td>boolean</td>
        <td>
          此处设为 readOnly 将强制在 VolumeMounts 中设置 ReadOnly。默认为 false。更多信息：https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].gitRepo` 
<small>[返回父级](#spinappspecvolumesindex)</small>


gitRepo 表示特定 revision 的 git 仓库。已弃用：GitRepo 已弃用。若要为容器提供 git 仓库，请将一个 EmptyDir 挂载到使用 git 克隆该仓库的 InitContainer，再将该 EmptyDir 挂载到 Pod 的容器中。<br/>

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
        <td><b>repository</b></td>
        <td>string</td>
        <td>
          repository 是仓库的 URL<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>directory</b></td>
        <td>string</td>
        <td>
          directory 是目标目录名。不得包含 '..' 或以 '..' 开头。如果指定为 '.'，volume 目录即为 git 仓库本身；否则，如果指定了名称，volume 将在以该名称命名的子目录中包含 git 仓库。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>revision</b></td>
        <td>string</td>
        <td>
          revision 是指定 revision 的 commit hash。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].glusterfs` 
<small>[返回父级](#spinappspecvolumesindex)</small>


glusterfs 表示与 Pod 生命周期相同的、挂载在宿主机上的 Glusterfs。已弃用：Glusterfs 已弃用，不再支持树内 glusterfs 类型。更多信息：https://examples.k8s.io/volumes/glusterfs/README.md<br/>

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
        <td><b>endpoints</b></td>
        <td>string</td>
        <td>
          endpoints 是描述 Glusterfs 拓扑的 endpoint 名称。更多信息：https://examples.k8s.io/volumes/glusterfs/README.md#create-a-pod<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>path</b></td>
        <td>string</td>
        <td>
          path 是 Glusterfs 的 volume 路径。更多信息：https://examples.k8s.io/volumes/glusterfs/README.md#create-a-pod<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>readOnly</b></td>
        <td>boolean</td>
        <td>
          此处设为 readOnly 将强制以只读权限挂载 Glusterfs volume。默认为 false。更多信息：https://examples.k8s.io/volumes/glusterfs/README.md#create-a-pod<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].hostPath` 
<small>[返回父级](#spinappspecvolumesindex)</small>


hostPath 表示宿主机上已存在的、直接暴露给容器的文件或目录。这通常供系统代理或其他允许查看宿主机的特权程序使用。大多数容器不需要此类型。更多信息：https://kubernetes.io/docs/concepts/storage/volumes#hostpath<br/>

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
        <td><b>path</b></td>
        <td>string</td>
        <td>
          宿主机上目录的路径。如果该路径是符号链接，将跟随链接到真实路径。更多信息：https://kubernetes.io/docs/concepts/storage/volumes#hostpath<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>type</b></td>
        <td>string</td>
        <td>
          HostPath Volume 的类型，默认为 ""。更多信息：https://kubernetes.io/docs/concepts/storage/volumes#hostpath<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].image` 
<small>[返回父级](#spinappspecvolumesindex)</small>


image 表示拉取并挂载到 kubelet 宿主机上的 OCI 对象（容器镜像或 artifact）。volume 在 Pod 启动时根据提供的 PullPolicy 值进行解析：

- Always：kubelet 始终尝试拉取该引用，如果拉取失败，容器创建将失败。- Never：kubelet 从不拉取该引用，仅使用本地镜像或 artifact，如果该引用不存在，容器创建将失败。- IfNotPresent：如果磁盘上尚不存在该引用，kubelet 会进行拉取，如果该引用不存在且拉取失败，容器创建将失败。

如果 Pod 被删除并重新创建，该 volume 会重新解析，这意味着重新创建 Pod 时新的远端内容将可用。Pod 启动期间解析或拉取镜像失败会阻止容器启动，并可能增加明显的延迟。失败将按常规 volume 回退策略重试，并记录到 Pod 的 reason 和 message 中。此 volume 可挂载的对象类型由宿主机上的容器运行时实现定义，且至少必须包含容器 image 字段所支持的所有有效类型。OCI 对象通过与容器镜像相同的方式合并 manifest 层，挂载到单个目录（spec.containers[*].volumeMounts.mountPath）。该 volume 将以只读（ro）且文件不可执行（noexec）的方式挂载。1.33 之前不支持容器的子路径挂载（spec.containers[*].volumeMounts.subpath）。字段 spec.securityContext.fsGroupChangePolicy 对此 volume 类型无效。<br/>

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
        <td><b>pullPolicy</b></td>
        <td>string</td>
        <td>
          拉取 OCI 对象的策略。可选值为：Always——kubelet 始终尝试拉取该引用，如果拉取失败，容器创建将失败；Never——kubelet 从不拉取该引用，仅使用本地镜像或 artifact，如果该引用不存在，容器创建将失败；IfNotPresent——如果磁盘上尚不存在该引用，kubelet 会进行拉取，如果该引用不存在且拉取失败，容器创建将失败。指定了 :latest 标签时默认为 Always，否则默认为 IfNotPresent。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>reference</b></td>
        <td>string</td>
        <td>
          必填：要使用的镜像或 artifact 引用。行为与 pod.spec.containers[*].image 相同。Pull secret 的组装方式与容器镜像相同，会查找节点凭据、SA image pull secret 以及 pod spec 中的 image pull secret。此字段为可选，以便更高层的配置管理能在 Deployments 和 StatefulSets 等工作负载控制器中设置默认值或覆盖容器镜像。更多信息：https://kubernetes.io/docs/concepts/containers/images<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].iscsi` 
<small>[返回父级](#spinappspecvolumesindex)</small>


iscsi 表示挂接到 kubelet 宿主机并随后暴露给 Pod 的 ISCSI Disk 资源。更多信息：https://examples.k8s.io/volumes/iscsi/README.md<br/>

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
        <td><b>iqn</b></td>
        <td>string</td>
        <td>
          iqn 是目标端的 iSCSI Qualified Name。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>lun</b></td>
        <td>integer</td>
        <td>
          lun 表示 iSCSI 目标的 Lun 编号。<br/> <br/> <i>格式</i>：int32<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>targetPortal</b></td>
        <td>string</td>
        <td>
          targetPortal 是 iSCSI 目标 Portal。Portal 为 IP 或 ip_addr:port（端口不是默认端口时，通常为 TCP 端口 860 和 3260）。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>chapAuthDiscovery</b></td>
        <td>boolean</td>
        <td>
          chapAuthDiscovery 定义是否支持 iSCSI Discovery CHAP 认证<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>chapAuthSession</b></td>
        <td>boolean</td>
        <td>
          chapAuthSession 定义是否支持 iSCSI Session CHAP 认证<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>fsType</b></td>
        <td>string</td>
        <td>
          fsType 是要挂载的 volume 的文件系统类型。提示：请确保宿主机操作系统支持该文件系统类型。示例："ext4"、"xfs"、"ntfs"。未指定时隐式推断为 "ext4"。更多信息：https://kubernetes.io/docs/concepts/storage/volumes#iscsi<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>initiatorName</b></td>
        <td>string</td>
        <td>
          initiatorName 是自定义的 iSCSI Initiator Name。如果同时指定了 initiatorName 和 iscsiInterface，将为该连接创建新的 iSCSI 接口 <target portal>:<volume name>。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>iscsiInterface</b></td>
        <td>string</td>
        <td>
          iscsiInterface 是使用 iSCSI 传输的接口名称。默认为 'default'（tcp）。<br/> <br/> <i>默认</i>：default<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>portals</b></td>
        <td>[]string</td>
        <td>
          portals 是 iSCSI 目标 Portal 列表。Portal 为 IP 或 ip_addr:port（端口不是默认端口时，通常为 TCP 端口 860 和 3260）。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>readOnly</b></td>
        <td>boolean</td>
        <td>
          此处设为 readOnly 将强制在 VolumeMounts 中设置 ReadOnly。默认为 false。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexiscsisecretref">secretRef</a></b></td>
        <td>object</td>
        <td>
          secretRef 是用于 iSCSI 目标与发起方认证的 CHAP Secret<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].iscsi.secretRef` 
<small>[返回父级](#spinappspecvolumesindexiscsi)</small>


secretRef 是用于 iSCSI 目标与发起方认证的 CHAP Secret<br/>

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
        <td><b>name</b></td>
        <td>string</td>
        <td>
          被引用对象的名称。此字段实际上是必填的，但出于向后兼容的考虑，允许为空。此处为空值的实例几乎可以肯定是错误的。更多信息：https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names<br/> <br/> <i>默认</i>： <br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].nfs` 
<small>[返回父级](#spinappspecvolumesindex)</small>


nfs 表示与 Pod 生命周期相同的、挂载在宿主机上的 NFS。更多信息：https://kubernetes.io/docs/concepts/storage/volumes#nfs<br/>

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
        <td><b>path</b></td>
        <td>string</td>
        <td>
          由 NFS 服务器导出的路径。更多信息：https://kubernetes.io/docs/concepts/storage/volumes#nfs<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>server</b></td>
        <td>string</td>
        <td>
          server 是 NFS 服务器的主机名或 IP 地址。更多信息：https://kubernetes.io/docs/concepts/storage/volumes#nfs<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>readOnly</b></td>
        <td>boolean</td>
        <td>
          此处设为 readOnly 将强制以只读权限挂载 NFS 导出。默认为 false。更多信息：https://kubernetes.io/docs/concepts/storage/volumes#nfs<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].persistentVolumeClaim` 
<small>[返回父级](#spinappspecvolumesindex)</small>


persistentVolumeClaimVolumeSource 表示对同一命名空间内 PersistentVolumeClaim 的引用。更多信息：https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims<br/>

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
        <td><b>claimName</b></td>
        <td>string</td>
        <td>
          claimName 是与使用此 volume 的 Pod 位于同一命名空间内的 PersistentVolumeClaim 的名称。更多信息：https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>readOnly</b></td>
        <td>boolean</td>
        <td>
          readOnly 将强制在 VolumeMounts 中设置 ReadOnly。默认为 false。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].photonPersistentDisk` 
<small>[返回父级](#spinappspecvolumesindex)</small>


photonPersistentDisk 表示挂接并挂载在 kubelet 宿主机上的 PhotonController 持久磁盘。已弃用：PhotonPersistentDisk 已弃用，不再支持树内 photonPersistentDisk 类型。<br/>

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
        <td><b>pdID</b></td>
        <td>string</td>
        <td>
          pdID 是标识 Photon Controller 持久磁盘的 ID<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>fsType</b></td>
        <td>string</td>
        <td>
          fsType 是要挂载的文件系统类型。必须是宿主机操作系统支持的文件系统类型。例如 "ext4"、"xfs"、"ntfs"。未指定时隐式推断为 "ext4"。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].portworxVolume` 
<small>[返回父级](#spinappspecvolumesindex)</small>


portworxVolume 表示挂接并挂载在 kubelet 宿主机上的 portworx volume。已弃用：PortworxVolume 已弃用。当 CSIMigrationPortworx feature-gate 开启时，树内 portworxVolume 类型的所有操作都会重定向到 pxd.portworx.com CSI 驱动。<br/>

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
        <td><b>volumeID</b></td>
        <td>string</td>
        <td>
          volumeID 唯一标识一个 Portworx volume<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>fsType</b></td>
        <td>string</td>
        <td>
          fSType 表示要挂载的文件系统类型。必须是宿主机操作系统支持的文件系统类型。例如 "ext4"、"xfs"。未指定时隐式推断为 "ext4"。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>readOnly</b></td>
        <td>boolean</td>
        <td>
          readOnly 默认为 false（读写）。此处设为 ReadOnly 将强制在 VolumeMounts 中设置 ReadOnly。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].projected` 
<small>[返回父级](#spinappspecvolumesindex)</small>


将 secrets、configmaps 和 downward API 等资源一次性投影出来的内容<br/>

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
        <td><b>defaultMode</b></td>
        <td>integer</td>
        <td>
          defaultMode 是默认用于为创建的文件设置权限的 mode 位。必须是 0000 到 0777 之间的八进制值或 0 到 511 之间的十进制值。YAML 同时接受八进制和十进制值，JSON 要求 mode 位使用十进制值。路径内的目录不受此设置影响。这可能与影响文件 mode 的其他选项（如 fsGroup）冲突，结果可能是设置了其他 mode 位。<br/> <br/> <i>格式</i>：int32<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexprojectedsourcesindex">sources</a></b></td>
        <td>[]object</td>
        <td>
          sources 是 volume 投影的列表。此列表中的每个条目处理一个来源。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].projected.sources[index]` 
<small>[返回父级](#spinappspecvolumesindexprojected)</small>


可与其他受支持的 volume 类型一起投影的投影项。这些字段必须恰好设置一个。

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
        <td><b><a href="#spinappspecvolumesindexprojectedsourcesindexclustertrustbundle">clusterTrustBundle</a></b></td>
        <td>object</td>
        <td>
          ClusterTrustBundle 允许 Pod 通过自动更新的文件访问 ClusterTrustBundle 对象的 `.spec.trustBundle` 字段。

Alpha 阶段，由 ClusterTrustBundleProjection feature gate 控制。

ClusterTrustBundle 对象可以按名称选择，也可以按签名者名称与标签选择器的组合选择。

Kubelet 会对写入 Pod 文件系统的 PEM 内容执行严格的规范化。诸如块间注释和块头等特殊 PEM 特性会被剥离。证书会被去重。文件内证书的顺序是任意的，Kubelet 可能会随时间改变其顺序。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexprojectedsourcesindexconfigmap">configMap</a></b></td>
        <td>object</td>
        <td>
          configMap 是要投影的 configMap 数据的相关信息<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexprojectedsourcesindexdownwardapi">downwardAPI</a></b></td>
        <td>object</td>
        <td>
          downwardAPI 是要投影的 downwardAPI 数据的相关信息<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexprojectedsourcesindexsecret">secret</a></b></td>
        <td>object</td>
        <td>
          secret 是要投影的 secret 数据的相关信息<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexprojectedsourcesindexserviceaccounttoken">serviceAccountToken</a></b></td>
        <td>object</td>
        <td>
          serviceAccountToken 是要投影的 serviceAccountToken 数据的相关信息<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].projected.sources[index].clusterTrustBundle` 
<small>[返回父级](#spinappspecvolumesindexprojectedsourcesindex)</small>


ClusterTrustBundle 允许 Pod 通过自动更新的文件访问 ClusterTrustBundle 对象的 `.spec.trustBundle` 字段。

Alpha 阶段，由 ClusterTrustBundleProjection feature gate 控制。

ClusterTrustBundle 对象可以按名称选择，也可以按签名者名称与标签选择器的组合选择。

Kubelet 会对写入 Pod 文件系统的 PEM 内容执行严格的规范化。诸如块间注释和块头等特殊 PEM 特性会被剥离。证书会被去重。文件内证书的顺序是任意的，Kubelet 可能会随时间改变其顺序。<br/>

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
        <td><b>path</b></td>
        <td>string</td>
        <td>
          从 volume 根目录写入 bundle 的相对路径。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexprojectedsourcesindexclustertrustbundlelabelselector">labelSelector</a></b></td>
        <td>object</td>
        <td>
          选择所有与此标签选择器匹配的 ClusterTrustBundle。仅在设置了 signerName 时生效。与 name 互斥。如果未设置，解释为"不匹配任何内容"。如果设置但为空，解释为"匹配所有内容"。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>name</b></td>
        <td>string</td>
        <td>
          按对象名称选择单个 ClusterTrustBundle。与 signerName 和 labelSelector 互斥。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>optional</b></td>
        <td>boolean</td>
        <td>
          若为 true，则在所引用的 ClusterTrustBundle 不可用时不阻塞 Pod 启动。如果使用 name，则允许该命名的 ClusterTrustBundle 不存在。如果使用 signerName，则允许 signerName 与 labelSelector 的组合匹配零个 ClusterTrustBundle。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>signerName</b></td>
        <td>string</td>
        <td>
          选择所有与此签名者名称匹配的 ClusterTrustBundle。与 name 互斥。所有被选中的 ClusterTrustBundle 的内容将被合并并去重。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].projected.sources[index].clusterTrustBundle.labelSelector` 
<small>[返回父级](#spinappspecvolumesindexprojectedsourcesindexclustertrustbundle)</small>


选择所有与此标签选择器匹配的 ClusterTrustBundle。仅在设置了 signerName 时生效。与 name 互斥。如果未设置，解释为"不匹配任何内容"。如果设置但为空，解释为"匹配所有内容"。<br/>

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
        <td><b><a href="#spinappspecvolumesindexprojectedsourcesindexclustertrustbundlelabelselectormatchexpressionsindex">matchExpressions</a></b></td>
        <td>[]object</td>
        <td>
          matchExpressions 是标签选择器要求的列表。各要求之间为 AND 关系。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>matchLabels</b></td>
        <td>map[string]string</td>
        <td>
          matchLabels 是一个 {key,value} 键值对映射。matchLabels 中的单个 {key,value} 等价于 matchExpressions 中的一个元素：其 key 字段为 "key"，operator 为 "In"，values 数组只包含 "value"。各要求之间为 AND 关系。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].projected.sources[index].clusterTrustBundle.labelSelector.matchExpressions[index]` 
<small>[返回父级](#spinappspecvolumesindexprojectedsourcesindexclustertrustbundlelabelselector)</small>


标签选择器要求是一个包含值、键以及关联键和值的 operator 的选择器。

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
        <td><b>key</b></td>
        <td>string</td>
        <td>
          key 是选择器所适用的标签键。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>operator</b></td>
        <td>string</td>
        <td>
          operator 表示键与一组值之间的关系。有效的 operator 为 In、NotIn、Exists 和 DoesNotExist。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>values</b></td>
        <td>[]string</td>
        <td>
          values 是字符串值数组。如果 operator 为 In 或 NotIn，values 数组不能为空。如果 operator 为 Exists 或 DoesNotExist，values 数组必须为空。此数组在 strategic merge patch 时会被替换。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].projected.sources[index].configMap` 
<small>[返回父级](#spinappspecvolumesindexprojectedsourcesindex)</small>


configMap 是要投影的 configMap 数据的相关信息<br/>

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
        <td><b><a href="#spinappspecvolumesindexprojectedsourcesindexconfigmapitemsindex">items</a></b></td>
        <td>[]object</td>
        <td>
          items 如果未指定，被引用 ConfigMap 的 Data 字段中的每个键值对都会以文件形式投影到 volume 中，文件名为键，内容为值。如果指定，则列出的键会被投影到指定的路径，未列出的键不会出现。如果指定的键不存在于 ConfigMap 中，除非标记为可选，volume 设置将报错。路径必须是相对路径，且不得包含 '..' 路径或以 '..' 开头。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>name</b></td>
        <td>string</td>
        <td>
          被引用对象的名称。此字段实际上是必填的，但出于向后兼容的考虑，允许为空。此处为空值的实例几乎可以肯定是错误的。更多信息：https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names<br/> <br/> <i>默认</i>： <br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>optional</b></td>
        <td>boolean</td>
        <td>
          optional 指定是否必须定义该 ConfigMap 或其键<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].projected.sources[index].configMap.items[index]` 
<small>[返回父级](#spinappspecvolumesindexprojectedsourcesindexconfigmap)</small>


将字符串键映射到 volume 内的某个路径。

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
        <td><b>key</b></td>
        <td>string</td>
        <td>
          key 是要投影的键。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>path</b></td>
        <td>string</td>
        <td>
          path 是将键映射到的文件的相对路径。不得是绝对路径。不得包含路径元素 '..'。不得以字符串 '..' 开头。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>mode</b></td>
        <td>integer</td>
        <td>
          mode 为可选：用于为此文件设置权限的 mode 位。必须是 0000 到 0777 之间的八进制值或 0 到 511 之间的十进制值。YAML 同时接受八进制和十进制值，JSON 要求 mode 位使用十进制值。如果未指定，将使用 volume 的 defaultMode。这可能与影响文件 mode 的其他选项（如 fsGroup）冲突，结果可能是设置了其他 mode 位。<br/> <br/> <i>格式</i>：int32<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].projected.sources[index].downwardAPI` 
<small>[返回父级](#spinappspecvolumesindexprojectedsourcesindex)</small>


downwardAPI 是要投影的 downwardAPI 数据的相关信息<br/>

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
        <td><b><a href="#spinappspecvolumesindexprojectedsourcesindexdownwardapiitemsindex">items</a></b></td>
        <td>[]object</td>
        <td>
          Items 是 DownwardAPIVolume 文件的列表<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].projected.sources[index].downwardAPI.items[index]` 
<small>[返回父级](#spinappspecvolumesindexprojectedsourcesindexdownwardapi)</small>


DownwardAPIVolumeFile 表示用于创建包含 Pod 字段的文件的信息。

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
        <td><b>path</b></td>
        <td>string</td>
        <td>
          必填：Path 是要创建的文件的相对路径名。不得是绝对路径或包含 '..' 路径。必须为 utf-8 编码。相对路径的第一项不得以 '..' 开头<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexprojectedsourcesindexdownwardapiitemsindexfieldref">fieldRef</a></b></td>
        <td>object</td>
        <td>
          必填：选择 Pod 的某个字段：仅支持 annotations、labels、name、namespace 和 uid。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>mode</b></td>
        <td>integer</td>
        <td>
          可选：用于为此文件设置权限的 mode 位，必须是 0000 到 0777 之间的八进制值或 0 到 511 之间的十进制值。YAML 同时接受八进制和十进制值，JSON 要求 mode 位使用十进制值。如果未指定，将使用 volume 的 defaultMode。这可能与影响文件 mode 的其他选项（如 fsGroup）冲突，结果可能是设置了其他 mode 位。<br/> <br/> <i>格式</i>：int32<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexprojectedsourcesindexdownwardapiitemsindexresourcefieldref">resourceFieldRef</a></b></td>
        <td>object</td>
        <td>
          选择容器的某个资源：目前仅支持资源的 limits 和 requests（limits.cpu、limits.memory、requests.cpu 和 requests.memory）。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].projected.sources[index].downwardAPI.items[index].fieldRef` 
<small>[返回父级](#spinappspecvolumesindexprojectedsourcesindexdownwardapiitemsindex)</small>


必填：选择 Pod 的某个字段：仅支持 annotations、labels、name、namespace 和 uid。<br/>

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
        <td><b>fieldPath</b></td>
        <td>string</td>
        <td>
          在指定 API 版本中要选择的字段路径。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>apiVersion</b></td>
        <td>string</td>
        <td>
          FieldPath 所基于的 schema 版本，默认为 "v1"。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].projected.sources[index].downwardAPI.items[index].resourceFieldRef` 
<small>[返回父级](#spinappspecvolumesindexprojectedsourcesindexdownwardapiitemsindex)</small>


选择容器的某个资源：目前仅支持资源的 limits 和 requests（limits.cpu、limits.memory、requests.cpu 和 requests.memory）。<br/>

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
        <td><b>resource</b></td>
        <td>string</td>
        <td>
          必填：要选择的资源<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>containerName</b></td>
        <td>string</td>
        <td>
          容器名称：对 volume 为必填，对环境变量为可选<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>divisor</b></td>
        <td>int or string</td>
        <td>
          指定所公开资源的输出格式，默认为 "1"<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].projected.sources[index].secret` 
<small>[返回父级](#spinappspecvolumesindexprojectedsourcesindex)</small>


secret 是要投影的 secret 数据的相关信息<br/>

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
        <td><b><a href="#spinappspecvolumesindexprojectedsourcesindexsecretitemsindex">items</a></b></td>
        <td>[]object</td>
        <td>
          items 如果未指定，被引用 Secret 的 Data 字段中的每个键值对都会以文件形式投影到 volume 中，文件名为键，内容为值。如果指定，则列出的键会被投影到指定的路径，未列出的键不会出现。如果指定的键不存在于 Secret 中，除非标记为可选，volume 设置将报错。路径必须是相对路径，且不得包含 '..' 路径或以 '..' 开头。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>name</b></td>
        <td>string</td>
        <td>
          被引用对象的名称。此字段实际上是必填的，但出于向后兼容的考虑，允许为空。此处为空值的实例几乎可以肯定是错误的。更多信息：https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names<br/> <br/> <i>默认</i>： <br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>optional</b></td>
        <td>boolean</td>
        <td>
          optional 字段指定是否必须定义该 Secret 或其键<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].projected.sources[index].secret.items[index]` 
<small>[返回父级](#spinappspecvolumesindexprojectedsourcesindexsecret)</small>


将字符串键映射到 volume 内的某个路径。

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
        <td><b>key</b></td>
        <td>string</td>
        <td>
          key 是要投影的键。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>path</b></td>
        <td>string</td>
        <td>
          path 是将键映射到的文件的相对路径。不得是绝对路径。不得包含路径元素 '..'。不得以字符串 '..' 开头。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>mode</b></td>
        <td>integer</td>
        <td>
          mode 为可选：用于为此文件设置权限的 mode 位。必须是 0000 到 0777 之间的八进制值或 0 到 511 之间的十进制值。YAML 同时接受八进制和十进制值，JSON 要求 mode 位使用十进制值。如果未指定，将使用 volume 的 defaultMode。这可能与影响文件 mode 的其他选项（如 fsGroup）冲突，结果可能是设置了其他 mode 位。<br/> <br/> <i>格式</i>：int32<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].projected.sources[index].serviceAccountToken` 
<small>[返回父级](#spinappspecvolumesindexprojectedsourcesindex)</small>


serviceAccountToken 是要投影的 serviceAccountToken 数据的相关信息<br/>

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
        <td><b>path</b></td>
        <td>string</td>
        <td>
          path 是相对于挂载点、用于投影 token 的文件路径。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>audience</b></td>
        <td>string</td>
        <td>
          audience 是 token 的预期受众。token 的接收方必须以 token audience 中指定的标识符表明身份，否则应拒绝该 token。audience 默认为 apiserver 的标识符。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>expirationSeconds</b></td>
        <td>integer</td>
        <td>
          expirationSeconds 是所请求的 service account token 的有效期。随着 token 接近过期，kubelet volume 插件会主动轮换该 token。如果 token 的存活时间超过其 TTL 的 80% 或超过 24 小时，kubelet 将开始尝试轮换该 token。默认为 1 小时，且不得少于 10 分钟。<br/> <br/> <i>格式</i>：int64<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].quobyte` 
<small>[返回父级](#spinappspecvolumesindex)</small>


quobyte 表示与 Pod 生命周期相同的、挂载在宿主机上的 Quobyte。已弃用：Quobyte 已弃用，不再支持树内 quobyte 类型。<br/>

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
        <td><b>registry</b></td>
        <td>string</td>
        <td>
          registry 表示一个或多个 Quobyte Registry 服务，以字符串形式的 host:port 对指定（多个条目用逗号分隔），作为 volume 的中央注册表<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>volume</b></td>
        <td>string</td>
        <td>
          volume 是按名称引用已创建的 Quobyte volume 的字符串。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>group</b></td>
        <td>string</td>
        <td>
          映射 volume 访问权限的组。默认为无组<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>readOnly</b></td>
        <td>boolean</td>
        <td>
          此处设为 readOnly 将强制以只读权限挂载 Quobyte volume。默认为 false。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>tenant</b></td>
        <td>string</td>
        <td>
          在后端拥有给定 Quobyte volume 的租户。与动态供给的 Quobyte volume 一起使用，其值由插件设置<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>user</b></td>
        <td>string</td>
        <td>
          映射 volume 访问权限的用户。默认为 service account 用户<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].rbd` 
<small>[返回父级](#spinappspecvolumesindex)</small>


rbd 表示与 Pod 生命周期相同的、挂载在宿主机上的 Rados Block Device。已弃用：RBD 已弃用，不再支持树内 rbd 类型。更多信息：https://examples.k8s.io/volumes/rbd/README.md<br/>

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
        <td><b>image</b></td>
        <td>string</td>
        <td>
          image 是 rados 镜像名称。更多信息：https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>monitors</b></td>
        <td>[]string</td>
        <td>
          monitors 是 Ceph monitor 的集合。更多信息：https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>fsType</b></td>
        <td>string</td>
        <td>
          fsType 是要挂载的 volume 的文件系统类型。提示：请确保宿主机操作系统支持该文件系统类型。示例："ext4"、"xfs"、"ntfs"。未指定时隐式推断为 "ext4"。更多信息：https://kubernetes.io/docs/concepts/storage/volumes#rbd<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>keyring</b></td>
        <td>string</td>
        <td>
          keyring 是 RBDUser 的 key ring 路径。默认为 /etc/ceph/keyring。更多信息：https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it<br/> <br/> <i>默认</i>：/etc/ceph/keyring<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>pool</b></td>
        <td>string</td>
        <td>
          pool 是 rados pool 的名称。默认为 rbd。更多信息：https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it<br/> <br/> <i>默认</i>：rbd<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>readOnly</b></td>
        <td>boolean</td>
        <td>
          此处设为 readOnly 将强制在 VolumeMounts 中设置 ReadOnly。默认为 false。更多信息：https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexrbdsecretref">secretRef</a></b></td>
        <td>object</td>
        <td>
          secretRef 是 RBDUser 认证 secret 的名称。如果提供，将覆盖 keyring。默认为 nil。更多信息：https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>user</b></td>
        <td>string</td>
        <td>
          user 是 rados 用户名。默认为 admin。更多信息：https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it<br/> <br/> <i>默认</i>：admin<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].rbd.secretRef` 
<small>[返回父级](#spinappspecvolumesindexrbd)</small>


secretRef 是 RBDUser 认证 secret 的名称。如果提供，将覆盖 keyring。默认为 nil。更多信息：https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it<br/>

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
        <td><b>name</b></td>
        <td>string</td>
        <td>
          被引用对象的名称。此字段实际上是必填的，但出于向后兼容的考虑，允许为空。此处为空值的实例几乎可以肯定是错误的。更多信息：https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names<br/> <br/> <i>默认</i>： <br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].scaleIO` 
<small>[返回父级](#spinappspecvolumesindex)</small>


scaleIO 表示挂接并挂载在 Kubernetes 节点上的 ScaleIO 持久卷。已弃用：ScaleIO 已弃用，不再支持树内 scaleIO 类型。<br/>

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
        <td><b>gateway</b></td>
        <td>string</td>
        <td>
          gateway 是 ScaleIO API Gateway 的主机地址。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexscaleiosecretref">secretRef</a></b></td>
        <td>object</td>
        <td>
          secretRef 引用包含 ScaleIO 用户及其他敏感信息的 secret。如果未提供，Login 操作将失败。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>system</b></td>
        <td>string</td>
        <td>
          system 是在 ScaleIO 中配置的存储系统的名称。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>fsType</b></td>
        <td>string</td>
        <td>
          fsType 是要挂载的文件系统类型。必须是宿主机操作系统支持的文件系统类型。例如 "ext4"、"xfs"、"ntfs"。默认为 "xfs"。<br/> <br/> <i>默认</i>：xfs<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>protectionDomain</b></td>
        <td>string</td>
        <td>
          protectionDomain 是所配置存储的 ScaleIO Protection Domain 的名称。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>readOnly</b></td>
        <td>boolean</td>
        <td>
          readOnly 默认为 false（读写）。此处设为 ReadOnly 将强制在 VolumeMounts 中设置 ReadOnly。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>sslEnabled</b></td>
        <td>boolean</td>
        <td>
          sslEnabled 标志用于启用/禁用与 Gateway 的 SSL 通信，默认为 false<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>storageMode</b></td>
        <td>string</td>
        <td>
          storageMode 指示 volume 的存储应采用 ThickProvisioned 还是 ThinProvisioned。默认为 ThinProvisioned。<br/> <br/> <i>默认</i>：ThinProvisioned<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>storagePool</b></td>
        <td>string</td>
        <td>
          storagePool 是与保护域关联的 ScaleIO Storage Pool。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>volumeName</b></td>
        <td>string</td>
        <td>
          volumeName 是已在 ScaleIO 系统中创建的、与此 volume 源关联的 volume 的名称。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].scaleIO.secretRef` 
<small>[返回父级](#spinappspecvolumesindexscaleio)</small>


secretRef 引用包含 ScaleIO 用户及其他敏感信息的 secret。如果未提供，Login 操作将失败。<br/>

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
        <td><b>name</b></td>
        <td>string</td>
        <td>
          被引用对象的名称。此字段实际上是必填的，但出于向后兼容的考虑，允许为空。此处为空值的实例几乎可以肯定是错误的。更多信息：https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names<br/> <br/> <i>默认</i>： <br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].secret` 
<small>[返回父级](#spinappspecvolumesindex)</small>


secret 表示应填充此 volume 的 secret。更多信息：https://kubernetes.io/docs/concepts/storage/volumes#secret<br/>

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
        <td><b>defaultMode</b></td>
        <td>integer</td>
        <td>
          defaultMode 为可选：默认用于为创建的文件设置权限的 mode 位。必须是 0000 到 0777 之间的八进制值或 0 到 511 之间的十进制值。YAML 同时接受八进制和十进制值，JSON 要求 mode 位使用十进制值。默认为 0644。路径内的目录不受此设置影响。这可能与影响文件 mode 的其他选项（如 fsGroup）冲突，结果可能是设置了其他 mode 位。<br/> <br/> <i>格式</i>：int32<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexsecretitemsindex">items</a></b></td>
        <td>[]object</td>
        <td>
          items 如果未指定，被引用 Secret 的 Data 字段中的每个键值对都会以文件形式投影到 volume 中，文件名为键，内容为值。如果指定，则列出的键会被投影到指定的路径，未列出的键不会出现。如果指定的键不存在于 Secret 中，除非标记为可选，volume 设置将报错。路径必须是相对路径，且不得包含 '..' 路径或以 '..' 开头。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>optional</b></td>
        <td>boolean</td>
        <td>
          optional 字段指定是否必须定义该 Secret 或其键<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>secretName</b></td>
        <td>string</td>
        <td>
          secretName 是要使用的、位于 Pod 命名空间内的 secret 的名称。更多信息：https://kubernetes.io/docs/concepts/storage/volumes#secret<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].secret.items[index]` 
<small>[返回父级](#spinappspecvolumesindexsecret)</small>


将字符串键映射到 volume 内的某个路径。

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
        <td><b>key</b></td>
        <td>string</td>
        <td>
          key 是要投影的键。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>path</b></td>
        <td>string</td>
        <td>
          path 是将键映射到的文件的相对路径。不得是绝对路径。不得包含路径元素 '..'。不得以字符串 '..' 开头。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>mode</b></td>
        <td>integer</td>
        <td>
          mode 为可选：用于为此文件设置权限的 mode 位。必须是 0000 到 0777 之间的八进制值或 0 到 511 之间的十进制值。YAML 同时接受八进制和十进制值，JSON 要求 mode 位使用十进制值。如果未指定，将使用 volume 的 defaultMode。这可能与影响文件 mode 的其他选项（如 fsGroup）冲突，结果可能是设置了其他 mode 位。<br/> <br/> <i>格式</i>：int32<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].storageos` 
<small>[返回父级](#spinappspecvolumesindex)</small>


storageOS 表示挂接并挂载在 Kubernetes 节点上的 StorageOS volume。已弃用：StorageOS 已弃用，不再支持树内 storageos 类型。<br/>

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
        <td><b>fsType</b></td>
        <td>string</td>
        <td>
          fsType 是要挂载的文件系统类型。必须是宿主机操作系统支持的文件系统类型。例如 "ext4"、"xfs"、"ntfs"。未指定时隐式推断为 "ext4"。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>readOnly</b></td>
        <td>boolean</td>
        <td>
          readOnly 默认为 false（读写）。此处设为 ReadOnly 将强制在 VolumeMounts 中设置 ReadOnly。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappspecvolumesindexstorageossecretref">secretRef</a></b></td>
        <td>object</td>
        <td>
          secretRef 指定用于获取 StorageOS API 凭据的 secret。如果未指定，将尝试默认值。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>volumeName</b></td>
        <td>string</td>
        <td>
          volumeName 是 StorageOS volume 的可读名称。volume 名称仅在命名空间内唯一。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>volumeNamespace</b></td>
        <td>string</td>
        <td>
          volumeNamespace 指定 volume 在 StorageOS 中的作用域。如果未指定命名空间，则使用 Pod 的命名空间。这允许将 Kubernetes 的名称作用域映射到 StorageOS 中，以实现更紧密的集成。将 VolumeName 设置为任意名称即可覆盖默认行为。如果在 StorageOS 中未使用命名空间，请设置为 "default"。StorageOS 中预先不存在的命名空间将被创建。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].storageos.secretRef` 
<small>[返回父级](#spinappspecvolumesindexstorageos)</small>


secretRef 指定用于获取 StorageOS API 凭据的 secret。如果未指定，将尝试默认值。<br/>

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
        <td><b>name</b></td>
        <td>string</td>
        <td>
          被引用对象的名称。此字段实际上是必填的，但出于向后兼容的考虑，允许为空。此处为空值的实例几乎可以肯定是错误的。更多信息：https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names<br/> <br/> <i>默认</i>： <br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.spec.volumes[index].vsphereVolume` 
<small>[返回父级](#spinappspecvolumesindex)</small>


vsphereVolume 表示挂接并挂载在 kubelet 宿主机上的 vSphere volume。已弃用：VsphereVolume 已弃用。树内 vsphereVolume 类型的所有操作都会重定向到 csi.vsphere.vmware.com CSI 驱动。<br/>

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
        <td><b>volumePath</b></td>
        <td>string</td>
        <td>
          volumePath 是标识 vSphere volume vmdk 的路径<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>fsType</b></td>
        <td>string</td>
        <td>
          fsType 是要挂载的文件系统类型。必须是宿主机操作系统支持的文件系统类型。例如 "ext4"、"xfs"、"ntfs"。未指定时隐式推断为 "ext4"。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>storagePolicyID</b></td>
        <td>string</td>
        <td>
          storagePolicyID 是与 StoragePolicyName 关联的存储策略管理（SPBM）配置文件 ID。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>storagePolicyName</b></td>
        <td>string</td>
        <td>
          storagePolicyName 是存储策略管理（SPBM）配置文件的名称。<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.status` 
<small>[返回父级](#spinapp)</small>


SpinAppStatus 定义 SpinApp 的实际状态<br/>

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
        <td><b>readyReplicas</b></td>
        <td>integer</td>
        <td>
          表示应用 deployment 上当前活跃副本的数量。<br/> <br/> <i>格式</i>：int32<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>activeScheduler</b></td>
        <td>string</td>
        <td>
          ActiveScheduler 是当前正在调度此 SpinApp 的调度器名称。<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#spinappstatusconditionsindex">conditions</a></b></td>
        <td>[]object</td>
        <td>
          表示对 SpinApp 当前状态的观测。SpinApp.status.conditions.type 包括："Available" 和 "Progressing"。SpinApp.status.conditions.status 为 True、False、Unknown 之一。SpinApp.status.conditions.reason 的值应为 CamelCase 字符串，特定条件类型的生产者可以为此字段定义期望的值和含义，以及这些值是否被视为有保证的 API。SpinApp.status.conditions.Message 是人类可读的消息，用于说明状态转换的详情。更多信息参见：https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md#typical-status-properties<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### `SpinApp.status.conditions[index]` 
<small>[返回父级](#spinappstatus)</small>


Condition 包含此 API 资源当前状态某一方面的详细信息。

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
        <td><b>lastTransitionTime</b></td>
        <td>string</td>
        <td>
          lastTransitionTime 是条件最近一次从一种状态转换到另一种状态的时间。应为底层条件发生变化的时间。如果无法确定，则使用 API 字段发生变化的时间也可接受。<br/> <br/> <i>格式</i>：date-time<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>message</b></td>
        <td>string</td>
        <td>
          message 是人类可读的消息，用于说明状态转换的详情。可以为空字符串。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>reason</b></td>
        <td>string</td>
        <td>
          reason 包含一个程序化标识符，用于说明条件最近一次转换的原因。特定条件类型的生产者可以为此字段定义期望的值和含义，以及这些值是否被视为有保证的 API。值应为 CamelCase 字符串。此字段不得为空。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>status</b></td>
        <td>enum</td>
        <td>
          条件的状态，为 True、False、Unknown 之一。<br/> <br/> <i>枚举</i>：True, False, Unknown<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>type</b></td>
        <td>string</td>
        <td>
          条件的类型，采用 CamelCase 或 foo.example.com/CamelCase 形式。<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>observedGeneration</b></td>
        <td>integer</td>
        <td>
          observedGeneration 表示设置此条件时所基于的 .metadata.generation。例如，如果 .metadata.generation 当前为 12，而 .status.conditions[x].observedGeneration 为 9，则该条件相对于实例的当前状态已过期。<br/> <br/> <i>格式</i>：int64<br/> <i>最小值</i>：0<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>

