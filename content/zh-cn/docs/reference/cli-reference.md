---
title: CLI 参考
description: Spin Plugin kube CLI 参考。
weight: 3
categories: [reference]
tags: [plugins]
aliases:
- /docs/spin-plugin-kube/reference
---

## spin kube completion

```bash
spin kube completion --help
为指定的 shell 生成 kube 的自动补全脚本。
关于如何使用生成的脚本，请参阅各子命令的帮助信息。

Usage:
  kube completion [command]

Available Commands:
  bash        生成 bash 的自动补全脚本
  fish        生成 fish 的自动补全脚本
  powershell  生成 powershell 的自动补全脚本
  zsh         生成 zsh 的自动补全脚本

Flags:
  -h, --help   completion 的帮助信息
```

### spin kube completion bash

```bash
spin kube completion bash --help
为 bash shell 生成自动补全脚本。

此脚本依赖 'bash-completion' 包。
如果尚未安装，可以通过操作系统的包管理器安装。

要在当前 shell 会话中加载补全：

	source <(kube completion bash)

要为每个新会话加载补全，只需执行一次：

#### Linux:

	kube completion bash > /etc/bash_completion.d/kube

#### macOS:

	kube completion bash > $(brew --prefix)/etc/bash_completion.d/kube

此设置需要启动新的 shell 才能生效。

Usage:
  kube completion bash

Flags:
  -h, --help              bash 的帮助信息
      --no-descriptions   禁用补全描述
```

### spin kube completion fish

```bash
spin kube completion fish --help
为 fish shell 生成自动补全脚本。

要在当前 shell 会话中加载补全：

	kube completion fish | source

要为每个新会话加载补全，只需执行一次：

	kube completion fish > ~/.config/fish/completions/kube.fish

此设置需要启动新的 shell 才能生效。

Usage:
  kube completion fish [flags]

Flags:
  -h, --help              fish 的帮助信息
      --no-descriptions   禁用补全描述
```

### spin kube completion powershell

```bash
spin kube completion powershell --help
为 powershell 生成自动补全脚本。

要在当前 shell 会话中加载补全：

	kube completion powershell | Out-String | Invoke-Expression

要为每个新会话加载补全，请将上述命令的输出
添加到你的 powershell 配置文件（profile）中。

Usage:
  kube completion powershell [flags]

Flags:
  -h, --help              powershell 的帮助信息
      --no-descriptions   禁用补全描述
```

### spin kube completion zsh

```bash
spin kube completion zsh --help
为 zsh shell 生成自动补全脚本。

如果你的环境中尚未启用 shell 补全，需要先启用它。
只需执行以下命令一次：

	echo "autoload -U compinit; compinit" >> ~/.zshrc

要在当前 shell 会话中加载补全：

	source <(kube completion zsh)

要为每个新会话加载补全，只需执行一次：

#### Linux:

	kube completion zsh > "${fpath[1]}/_kube"

#### macOS:

	kube completion zsh > $(brew --prefix)/share/zsh/site-functions/_kube

此设置需要启动新的 shell 才能生效。

Usage:
  kube completion zsh [flags]

Flags:
  -h, --help              zsh 的帮助信息
      --no-descriptions   禁用补全描述
```

## spin kube help

```bash
spin kube --help
管理运行在 Kubernetes 上的应用

Usage:
  kube [command]

Available Commands:
  completion  为指定的 shell 生成自动补全脚本
  help        任何命令的帮助信息
  scaffold    生成 SpinApp 清单（manifest）
  version     显示版本信息

Flags:
  -h, --help                kube 的帮助信息
      --kubeconfig string   kubeconfig 文件的路径
  -n, --namespace string    namespace 作用域
  -v, --version             kube 的版本信息
```

## spin kube scaffold

```bash
spin kube scaffold --help
生成 SpinApp 清单（manifest）

Usage:
  kube scaffold [flags]

Flags:
      --autoscaler string                            要使用的 autoscaler。有效值为 'hpa' 和 'keda'
      --autoscaler-target-cpu-utilization int32      要在所有 Pod 上维持的目标 CPU 利用率百分比（默认 60）
      --autoscaler-target-memory-utilization int32   要在所有 Pod 上维持的目标内存利用率百分比（默认 60）
      --cpu-limit string                             允许 Spin 应用使用的最大 CPU 资源量
      --cpu-request string                           Spin 应用请求的 CPU 资源量。用于确定 Spin 应用将运行在哪个节点上
      --executor string                              用于运行 Spin 应用的 executor（默认 "containerd-shim-spin"）
  -f, --from string                                  Spin 应用在 registry 中的引用
  -h, --help                                         scaffold 的帮助信息
  -s, --image-pull-secret strings                     拉取 image 时使用的、位于同一 namespace 中的 secret
      --max-replicas int32                           spin 应用的最大副本数。使用此 flag 需启用自动缩放（默认 3）
      --memory-limit string                          允许 Spin 应用使用的最大内存量
      --memory-request string                        Spin 应用请求的内存量。用于确定 Spin 应用将运行在哪个节点上
  -o, --out string                                   写入 manifest yaml 的文件路径
  -r, --replicas int32                               spin 应用的最小副本数（默认 2）
  -c, --runtime-config-file string                   runtime config 文件的路径
```

## spin kube version

```bash
spin kube version
```
