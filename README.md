# SpinKube 中文文档站

[spinkube.dev](https://www.spinkube.dev/docs/) 文档的中文本地化站点，基于上游 [spinframework/spinkube-docs](https://github.com/spinframework/spinkube-docs)（Hugo + Docsy）构建。

- 英文文档：`/docs/…`（与上游同步）
- 中文文档：`/zh-cn/docs/…`
- CRD / CLI 参考页已翻译描述文字；字段名、类型与锚点保留英文（与站内锚点链接保持兼容）
- 未翻译的页面（blog、community 等）不显示语言切换项

## 本地开发

依赖：Node.js ≥ 18、Git（Hugo 与 Docsy 已锁定在 `package.json` / `go.mod`，`_vendor/` 已落盘，无需全局安装 Hugo 或 Go）。

```bash
npm install
npm run serve        # http://localhost:1313，支持中英双语
```

## 构建与部署

```bash
npm run build:production   # 产物输出到 public/
```

推送到 GitHub 后由 [EdgeOne Pages](https://edgeone.ai/pages) 自动构建部署，配置见 `edgeone.json`。

## 同步上游更新

```bash
git remote add upstream https://github.com/spinframework/spinkube-docs.git
git fetch upstream
git merge upstream/main --no-edit          # 合并英文内容与配置更新
node_modules/hugo-extended/vendor/hugo.exe mod get github.com/google/docsy@latest   # 可选：升级 Docsy
node_modules/hugo-extended/vendor/hugo.exe mod vendor                              # 重新落盘 _vendor
```

英文页有改动时，对照更新 `content/zh-cn/` 下同名文件即可。

## 翻译约定

- 简体中文技术文档风格，意译为主
- 代码块、命令、YAML 字段、URL 不翻译
- `SpinApp`、`CRD`、`Helm`、`KEDA` 等 k8s / SpinKube 生态术语保留英文
- 被跨页锚点引用的标题保留英文锚 ID：`## 中文标题 {#english-anchor}`

## License

内容遵循上游 [Apache-2.0](LICENSE)（文档部分 CC BY 4.0，见页脚版权声明）。
