---
title: 外部变量提供程序
description: 为你的 Spin 应用配置外部变量提供程序。
date: 2024-07-17
categories: [Spin Operator]
tags: [Tutorials]
weight: 12
---

在[变量赋值](./assigning-variables.md)指南中，你已经了解了如何通过 SpinApp 的
[variables](../reference/spin-app.md#spinappspecvariablesindex) 部分为其配置变量，既可以直接内联提供值，也可以通过
Kubernetes ConfigMap 或 Secret 来提供。

你还可以使用外部服务（例如 [Vault](https://vaultproject.io) 或 [Azure Key
Vault](https://azure.microsoft.com/en-us/products/key-vault)）来为你的应用提供变量值。本指南将结合相应的示例应用，向你展示如何使用和配置这两个服务。

## 前提条件

要跟随本教程操作，你需要：

- 一个运行 SpinKube 的 Kubernetes 集群。更多信息请参阅[安装](../install/_index.md)指南。
- [kubectl CLI](https://kubernetes.io/docs/tasks/tools/#kubectl)
- [spin CLI](https://developer.fermyon.com/spin/v2/install )
- Spin 的 [kube
  插件](https://github.com/spinframework/spin-plugin-kube?tab=readme-ov-file#install)

## 支持的提供程序

Spin 目前支持 [Vault](#vault-provider) 和 [Azure Key Vault](#azure-key-vault-provider)
作为外部变量提供程序。配置通过[运行时配置文件](https://developer.fermyon.com/spin/v2/dynamic-configuration#dynamic-and-runtime-application-configuration)提供给应用。

在 SpinKube 中，该配置文件可以以 Kubernetes secret 的形式提供，并通过 SpinApp 的
[runtimeConfig.loadFromSecret](https://www.spinkube.dev/docs/reference/spin-app/#spinappspecruntimeconfig)
部分与之关联。

> Note: `loadFromSecret` 的优先级高于任何其他 `runtimeConfig` 配置。因此，*所有*
> 运行时配置都必须包含在这个 Kubernetes secret 中，包括
> [SQLite](../reference/spin-app.md#spinappspecruntimeconfigsqlitedatabasesindex)、[Key
> Value](../reference/spin-app.md#spinappspecruntimeconfigkeyvaluestoresindex) 和
> [LLM](../reference/spin-app.md#spinappspecruntimeconfigllmcompute)
> 选项，即使它们原本可以通过各自专属的 spec 来指定。

接下来让我们看一些使用特定提供程序配置的示例。

# Vault 提供程序 {#vault-provider}

[Vault](https://vaultproject.io) 是存储机密数据并充当安全键值存储的热门选择。

本指南假设你已具备：

- 一个 [Vault 集群](https://www.vaultproject.io/)
- [vault CLI](https://developer.hashicorp.com/vault/docs/install)

### 构建并发布 Spin 应用

我们将使用 [variable explorer
应用](https://github.com/spinframework/spin-operator/tree/main/apps/variable-explorer)来测试这一集成。

首先，将仓库克隆到本地并进入 `variable-explorer` 目录：

```bash
git clone git@github.com:spinkube/spin-operator.git
cd apps/variable-explorer
```

现在，构建应用并将其推送到你有访问权限的 registry。这里我们使用
[ttl.sh](https://ttl.sh)：

```bash
spin build
spin registry push ttl.sh/variable-explorer:1h
```

### 创建 `runtime-config.toml` 文件

下面是一个包含 Vault 提供程序配置的 `runtime-config.toml` 文件示例：

```toml
[[config_provider]]
type = "vault"
url = "https://my-vault-server:8200"
token = "my_token"
mount = "admin/secret"
```

要使用这个示例，你需要将 `url` 和 `token` 字段更新为与你的 Vault 集群匹配的值。`mount`
的值取决于 Vault 命名空间以及 `kv-v2` secrets 引擎的名称。在本示例中，命名空间为 `admin`，引擎名为 `secret`，例如可以运行
`vault secrets enable --path=secret kv-v2` 来创建。

### 在 Vault 中创建 secrets

在 Vault 中创建 variable-explorer 应用所需的 `log_level`、`platform_name` 和
`db_password` secrets：

```bash
vault kv put secret/log_level value=INFO
vault kv put secret/platform_name value=Kubernetes
vault kv put secret/db_password value=secret_sauce
```

### 创建 SpinApp 和 Secret

接下来，通过 `kube` 插件一次性脚手架生成 SpinApp 以及包含 `runtime-config.toml` 数据的 Secret 资源：

```bash
spin kube scaffold -f ttl.sh/variable-explorer:1h -c runtime-config.toml -o scaffold.yaml
```

### 部署应用

```bash
kubectl apply -f scaffold.yaml
```

### 测试应用

现在你可以测试应用，验证所有变量都已从 Vault 提供程序正确传递给 SpinApp。

配置从本地机器到对应 Kubernetes `Service` 的端口转发：

```bash
kubectl port-forward services/variable-explorer 8080:80

Forwarding from 127.0.0.1:8080 -> 80
Forwarding from [::1]:8080 -> 80
```

端口转发建立后，你可以在另一个终端会话中向 variable-explorer 发送 HTTP 请求：

```bash
curl http://localhost:8080
Hello from Kubernetes
```

最后，你可以使用 `kubectl logs` 查看 variable-explorer 在运行时产生的所有日志：

```bash
kubectl logs -l core.spinkube.dev/app-name=variable-explorer

# Log Level: INFO
# Platform Name: Kubernetes
# DB Password: secret_sauce
```

# Azure Key Vault 提供程序 {#azure-key-vault-provider}

[Azure Key Vault](https://azure.microsoft.com/en-us/products/key-vault) 是托管在
[Azure](https://azure.microsoft.com) 平台上的分布式应用的安全机密存储。

本指南假设你已具备：

- 一个 [Azure 账户](https://azure.microsoft.com/en-us/free/)
- [az CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)

### 构建并发布 Spin 应用

本练习中我们将使用 [Azure Key Vault
Provider](https://github.com/fermyon/enterprise-architectures-and-patterns/tree/main/application-variable-providers/azure-key-vault-provider)
示例应用。

首先，将仓库克隆到本地并进入 `azure-key-vault-provider` 目录：

```bash
git clone git@github.com:fermyon/enterprise-architectures-and-patterns.git
cd enterprise-architectures-and-patterns/application-variable-providers/azure-key-vault-provider
```

现在，构建应用并将其推送到你有访问权限的 registry。这里我们使用
[ttl.sh](https://ttl.sh)：

```bash
spin build
spin registry push ttl.sh/azure-key-vault-provider:1h
```

接下来的步骤将引导你创建并配置 Azure Key Vault，并将连接凭据填入运行时配置文件。

### 部署 Azure Key Vault

```bash
# Variable Definition
KV_NAME=spinkube-keyvault
LOCATION=westus2
RG_NAME=rg-spinkube-keyvault

# Create Azure Resource Group and Azure Key Vault
az group create -n $RG_NAME -l $LOCATION
az keyvault create -n $KV_NAME \
  -g $RG_NAME \
  -l $LOCATION \
  --enable-rbac-authorization true

# Grab the Azure Resource Identifier of the Azure Key Vault instance
KV_SCOPE=$(az keyvault show -n $KV_NAME -g $RG_NAME -otsv --query "id")
```

### 向 Azure Key Vault 实例添加 Secret

```bash
# Grab the ID of the currently signed in user in Azure CLI
CURRENT_USER_ID=$(az ad signed-in-user show -otsv --query "id")

# Make the currently signed in user a Key Vault Secrets Officer
# on the scope of the new Azure Key Vault instance
az role assignment create --assignee $CURRENT_USER_ID \
  --role "Key Vault Secrets Officer" \
  --scope $KV_SCOPE

# Create a test secret called 'secret` in the Azure Key Vault instance
az keyvault secret set -n secret --vault-name $KV_NAME --value secret_value -o none
```

### 为 Spin 创建 Service Principal 和 Role Assignment

```bash
SP_NAME=sp-spinkube-keyvault
SP=$(az ad sp create-for-rbac -n $SP_NAME -ojson)

CLIENT_ID=$(echo $SP | jq -r '.appId')
CLIENT_SECRET=$(echo $SP | jq -r '.password')
TENANT_ID=$(echo $SP | jq -r '.tenant')

az role assignment create --assignee $CLIENT_ID \
  --role "Key Vault Secrets User" \
  --scope $KV_SCOPE
```

### 创建 `runtime-config.toml` 文件

创建一个包含以下内容的 `runtime-config.toml` 文件，并将前面步骤中获得的 `KV_NAME`、`CLIENT_ID`、`CLIENT_SECRET`
和 `TENANT_ID` 的值代入其中。

```toml
[[config_provider]]
type = "azure_key_vault"
vault_url = "https://<$KV_NAME>.vault.azure.net/"
client_id = "<$CLIENT_ID>"
client_secret = "<$CLIENT_SECRET>"
tenant_id = "<$TENANT_ID>"
authority_host = "AzurePublicCloud"
```

### 创建 SpinApp 和 Secret

通过 `kube` 插件一次性脚手架生成 SpinApp 以及包含 `runtime-config.toml` 数据的 Secret 资源：

```bash
spin kube scaffold -f ttl.sh/azure-key-vault-provider:1h -c runtime-config.toml -o scaffold.yaml
```

### 部署应用

```bash
kubectl apply -f scaffold.yaml
```

### 测试应用

现在你可以测试应用，验证 secret 的值是从 Azure Key Vault 解析得到的。

配置从本地机器到对应 Kubernetes `Service` 的端口转发：

```bash
kubectl port-forward services/azure-key-vault-provider 8080:80

Forwarding from 127.0.0.1:8080 -> 80
Forwarding from [::1]:8080 -> 80
```

端口转发建立后，你可以在另一个终端会话中向 azure-key-vault-provider 应用发送 HTTP 请求：

```bash
curl http://localhost:8080
Loaded secret from Azure Key Vault: secret_value
```
