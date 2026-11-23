---
title: 升级到 v0.4.0
description: 关于如何应对 v0.4.0 版本引入的不兼容变更的说明。
categories: [Spin Operator]
tags: []
---

Spin Operator v0.4.0 引入了一项破坏性的 API 变更：SpinApp 和 SpinAppExecutor 的 API 域名将从 `spinoperator.dev` 迁移到 `spinkube.dev`。这是一项不兼容变更，因此在升级到 v0.4.0 时需要重新安装 Spin Operator。

## 迁移步骤

1. 卸载现有的所有 SpinApp。

   > 注意：先备份它们！TODO
   >
   > ```sh
   > kubectl get spinapps.core.spinoperator.dev -o yaml > spinapps.yaml
   > ```

   ```sh
   kubectl delete spinapp.core.spinoperator.dev --all
   ```

2. 卸载现有的所有 SpinAppExecutor。
   ```sh
   kubectl delete spinappexecutor.core.spinoperator.dev --all
   ```
3. 卸载旧版 Spin Operator。
   > 注意：如果你在安装 Spin Operator 时使用了不同的 release 名称或命名空间，则需要相应地调整命令。另外，如果你当初不是通过 Helm 安装的 Spin Operator，则需要按照你当时所用的安装方式来卸载它。
   ```sh
   helm uninstall spin-operator --namespace spin-operator
   ```
4. 卸载旧的 CRD。
   ```sh
   kubectl delete crd spinapps.core.spinoperator.dev
   kubectl delete crd spinappexecutors.core.spinoperator.dev
   ```
5. 修改你的 SpinApp 以使用新的 `apiVersion`。
   现在你需要修改 SpinApp 中的 `apiVersion`，将 `core.spinoperator.dev/v1alpha1` 替换为 `core.spinkube.dev/v1alpha1`。
   > 注意：如果你的 SpinApp 没有在源代码中进行版本管理，那么你在第 1 步中已经将集群里的 SpinApp 备份到了名为 `spinapps.yaml` 的文件中。如果是这种情况，你需要替换 `spinapps.yaml` 文件中的 `apiVersion`。下面的命令可以帮你完成这件事：
   ```sh
   sed 's|apiVersion: core.spinoperator.dev/v1alpha1|apiVersion: core.spinkube.dev/v1alpha1|g' spinapps.yaml > modified-spinapps.yaml
   ```
6. 安装新的 CRD。
   ```sh
   kubectl apply -f https://github.com/spinframework/spin-operator/releases/download/v0.4.0/spin-operator.crds.yaml
   ```
7. 重新安装 SpinAppExecutor。
   ```sh
   kubectl apply -f https://github.com/spinframework/spin-operator/releases/download/v0.4.0/spin-operator.shim-executor.yaml
   ```
   如果你之前还使用了其他执行器，也需要一并安装。
8. 安装新版 Spin Operator。
   ```sh
   # 使用 Helm 安装 Spin Operator
   helm install spin-operator \
   --namespace spin-operator \
   --create-namespace \
   --version 0.4.0 \
   --wait \
   oci://ghcr.io/spinkube/charts/spin-operator
   ```
9. 重新应用你修改后的 SpinApp。
   按照你平时惯用的方式将 SpinApp 部署到集群中，例如 Kubectl、Flux、Helm 等。
   > 注意：如果你在第 1 步中备份了 SpinApp，可以使用下面的命令重新应用它们：
   >
   > ```sh
   > kubectl apply -f modified-spinapps.yaml
   > ```
10. 升级你的 `spin kube` 插件。
    如果你正在使用 `spin kube` 插件，需要将其升级到新版本，以保证通过脚手架生成的应用仍然有效。
    ```sh
    spin plugins upgrade kube
    ```
