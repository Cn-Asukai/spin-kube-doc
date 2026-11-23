---
title: 编写文档
description: 我们的目标是保持文档信息丰富且内容详尽。你可以帮助改进文档，使其随着项目的演进始终保持时效性。
weight: 11
---

我们高度重视文档的一致性与可读性。我们对待文档如同对待代码一样：力求尽可能频繁地改进它。

文档的变更通常有以下两种形式：

1. 一般性改进：纠正拼写错误、修复错误，并通过更清晰的表述和更多示例来改进说明。
1. 新功能：为上个版本发布之后添加到项目中的功能编写文档。

本节介绍文档作者如何以最有用、最不易出错的方式来编写文档变更。

## 文档是如何编写的

尽管 SpinKube 的文档最终以 HTML 形式发布在 https://spinkube.dev/docs 供人阅读，但我们是以 [Markdown](https://en.wikipedia.org/wiki/Markdown) 编写的纯文本文件集合来编辑它的，以获得最大的灵活性。

SpinKube 的文档使用名为 [docsy](https://www.docsy.dev/) 的文档系统，而 docsy 又基于 [Hugo Web 框架](https://gohugo.io/)。其基本思路是：通过称为[静态站点生成（SSG）](https://en.wikipedia.org/wiki/Static_site_generator)的过程，将轻度格式化的纯文本文档转换为 HTML。

### 在本地预览你的改动

如果你想在工作中运行自己的本地 Hugo 服务器来预览改动：

1. 在 GitHub 上 fork [`spinframework/spinkube-docs`](https://github.com/spinframework/spinkube-docs) 仓库。
1. 将你的 fork 克隆到本地计算机。
1. 阅读 `README.md` 文件，了解如何从源码构建本站点。
1. 按照常规的开发工作流继续：编辑文件、提交、将改动推送到你的 fork，并创建 pull request。如果你不确定如何操作，请参阅[编写代码]({{< ref
  "writing-code" >}})获取提示。

## 快速修改

如果你在使用文档时刚发现了一处想要修改的地方，本网站为你提供了快捷方式：

1. 点击页面右上角的 **Edit this page**。
1. 如果你还没有一个保持最新状态的项目仓库 fork，系统会提示你先获取一个——点击 **Fork this repository and propose changes** 或 **Update your Fork**，获得项目的最新版本以便编辑。

## 提交 issue

如果你在文档中发现了问题，但不确定如何自己修复，请在[文档仓库](https://github.com/spinframework/spinkube-docs/issues)中提交一个 issue。你也可以通过点击页面右上角的 **Create Issue** 按钮，针对某个特定页面提交 issue。
