---
title: 编写代码
description: 修复一个 bug，或者添加一个新功能。提交 pull request，让你的代码出现在下一个版本的 SpinKube 中！
weight: 10
---

想为社区做一点回馈吗？也许你在 SpinKube 中发现了一个想要修复的 bug，也许你希望添加一个小功能。

为 SpinKube 本身做贡献，是让你的诉求得到解决的最佳方式。这乍看之下可能令人生畏，但这是一条被无数人走过的路，有文档、工具和社区为你提供支持。我们会带你走完全部流程，让你通过实例来学习。

## 本教程适合谁？

在本教程中，我们假设你对 SpinKube 的工作原理至少有基本的了解。也就是说，你应该能够顺利完成现有教程中“将第一个应用部署到 SpinKube”的部分。另外，学一点 Rust 也很有价值，因为 SpinKube 的许多项目都是用 Rust 编写的。如果你还不会，[Learn Rust](https://www.rust-lang.org/learn) 是一个很好的起点。

如果你不熟悉 `git` 和 GitHub，会发现本教程及其链接中提供的信息足以让你上手。不过，如果你打算长期为 SpinKube 做贡献，可能还需要进一步阅读这些工具的相关资料。

总的来说，本教程会尽可能解释清楚每一个环节，以便惠及最广泛的读者。

## 行为准则

作为一名贡献者，你可以帮助我们保持 SpinKube 社区的开放与包容。请阅读并遵守我们的[行为准则](https://github.com/spinframework/governance/blob/main/CODE_OF_CONDUCT.md)。

## 安装 git

在本教程中，你需要安装 Git，以便下载 SpinKube 的当前开发版本，并为你的修改创建分支。

要检查是否已安装 Git，请在命令行中输入 `git`。如果提示找不到该命令，你就需要下载并安装它。更多信息请参阅 [Git 的下载页面](https://git-scm.com/download)。

如果你对 Git 不太熟悉，在安装之后，随时可以在命令行中输入 `git help` 来了解更多命令的用法。

## Fork 仓库

SpinKube 托管在 GitHub 上，你需要一个 GitHub 账号才能做贡献。如果你还没有，可以在 [GitHub](https://github.com) 上免费注册。

SpinKube 的各个仓库都归属于 [spinframework GitHub 组织](https://github.com/spinframework)。拥有账号后，访问某个仓库的页面，点击右上角的 "Fork"，即可创建该仓库的 fork。

然后，在命令行中克隆你的 fork。例如，如果你 fork 了 `spin-operator` 仓库，可以运行：

```shell
git clone https://github.com/YOUR-USERNAME/spin-operator.git
```

## 阅读 README

SpinKube 组织下的每个仓库都有一个 README 文件，说明项目的功能以及如何开始。这是很好的切入点，它能让你对项目以及如何运行测试套件有一个整体的认识。

## 运行测试套件

为项目做贡献时，非常重要的是你的代码改动不要引入 bug。验证改动之后项目仍然正常工作的一种方式，就是运行项目的测试套件。如果所有测试仍然通过，你就可以比较有把握地认为你的改动是有效的，并且没有破坏项目的其他部分。如果你之前从未运行过项目的测试套件，最好先运行一次，熟悉它的输出。

大多数项目都有运行测试套件的命令，通常是 `make test` 或 `cargo test` 之类。请查看项目的 README 文件以了解如何运行测试套件。如果不确定，随时可以在 `#spinkube` 频道[Slack 上](https://cloud-native.slack.com/archives/C06PC7JA1EE)求助。

## 找一个要处理的 issue

如果不确定从哪里开始，你可以在感兴趣的仓库中寻找带有 `good first issue` 标签的 issue。这类 issue 通常更简单，被特别标记为适合新贡献者上手的工作。

## 创建分支

在进行任何修改之前，先为这个 issue 创建一个新分支：

```shell
git checkout -b issue-123
```

分支名称可以随意取，`issue-123` 只是一个示例。在这个分支中所做的所有修改都只针对该 issue，不会影响我们之前克隆的代码主副本。

## 为你的 issue 编写测试

如果你在修复一个 bug，请编写一个（或多个）能够复现该 bug 的测试。如果你在添加新功能，请编写一个验证该功能按预期工作的测试。这有助于确保你的改动符合预期，并且不会破坏项目的其他部分。

## 确认测试失败

写好测试之后，我们需要确认它确实失败。这一点很重要，因为它能验证测试确实在检验我们认为的东西。如果测试通过了，那说明它并没有真正测试我们要修复的问题。

如何运行测试套件，请参阅项目的 README，或在 [Slack](https://cloud-native.slack.com/archives/C06PC7JA1EE) 上求助。

## 进行修改

现在我们有了一个失败的测试，可以着手修改代码来修复这个问题了。这是有趣的部分！用你喜欢的文本编辑器进行修改吧。

## 确认测试通过

修改完成之后，再次运行测试套件以确认测试通过。如果测试通过，你就可以比较有把握地认为你的改动符合预期。

一旦确认你的改动和测试都能正常工作，建议运行完整的测试套件，验证你的改动没有在项目的其他部分引入 bug。虽然完整测试套件全部通过并不能保证你的代码毫无 bug，但它确实有助于发现许多否则可能被忽视的 bug 和回归问题。

## 提交你的改动

完成修改并确认测试通过后，将你的改动提交到分支上：

```shell
git add .
git commit -m "Fix issue 123"
```

## 推送你的改动

现在你已经把改动提交到了分支上，把分支推送到 GitHub 上的 fork：

```shell
git push origin issue-123
```

## 创建 pull request

将改动推送到 GitHub 上的 fork 之后，你就可以创建 pull request 了。这是请求将你的改动合并到代码主副本的提议。要创建 pull request，请在 GitHub 上访问你的 fork，点击 "New pull request" 按钮。

## 编写文档

如果你的改动引入了新功能或改变了现有行为，务必更新文档。这有助于其他贡献者理解你的改动以及如何使用它们。

更多信息请参阅[编写文档]({{< ref "writing-documentation" >}})指南。

## 后续步骤

恭喜！你已经为 SpinKube 做出了一次贡献。

pull request 提交之后，需要由维护者进行评审。请在 [CNCF Slack](https://cloud-native.slack.com/archives/C06PC7JA1EE) 的 `#spinkube` 频道上发起请求，请大家来评审。
