# CountingLib 子站维护

公开路径为 `/countinglib/`，文档位于 `/countinglib/docs/`，随个人网站通过 GitHub Pages 部署。网站发布与 Lean 库版本发布相互独立。

`liuchliuch/countinglib` 仓库自身的 GitHub Pages 应保持关闭：同名项目站会优先占用 `/countinglib/`，即使没有部署内容，也会遮蔽个人网站中的整个子目录。2026-10-15 接入时已停用该仓库遗留的空 Pages 配置；页面由本仓库统一发布。

## 内容与来源

- `_pages/countinglib/index.html`：双语交互介绍页，来自 counting-complexity 项目 `website/countinglib/` 的 v7 设计。
- `_pages/countinglib/docs/`：Overview、Guide、API、Examples、References 五页，来自 `projects/release-v011-api-redesign/site/` 的文档预览。
- `countinglib/`：介绍页和文档运行时资源。保留原有相对路径，让两个独立设计在同一个子站运行；不加载主页的 Mondrian 样式。
- `files/counting-problems-for-babies.pdf`：原始英文完整版（38 页），含绘本和 Notes for Grown-ups；复制自最新的 `Counting_Problems_for_Babies_English_Complete.pdf`，不修改 PDF 内容。
- 主页入口位于 `_pages/about.md` 的 Works & Days 中，接在 PinkFold 后。名称旁的四节点图标沿用介绍页左上角的标志，由 `_includes/countinglib-mark.html` 引用 `images/countinglib.svg`。

介绍页默认英文，保留中文切换、六点枚举与加权计数交互。顶部与 Further reading 提供文档和 PDF 入口；文档品牌与页脚返回介绍页。

## 版本与维护

文档保留 v0.1.1 preview 标记，以及原始源码快照 `6ca34e19e6610f1b785d668d085776129a8e8865` 的固定链接。当前收录 333 个精选声明、80 个模块和 30 个合同族，不是全库 API 的自动枚举。网页接入不代表发布新的 Lean 库版本。

原始文档构建清单位于 `countinglib/docs/manifest.json`；`integration` 记录本站接入，输出哈希对应本地 HTML 正文与静态资源。更新目录时应整体更新 JSON、页面与脚本，保留固定源码版本信息。

页面源文件在 `_pages/countinglib/` 中维护，静态资源在 `countinglib/` 中维护；不要再保存一份完整构建产物。`docs/countinglib.md` 是维护说明，会被 Jekyll 排除；公开文档页面由 `_pages/countinglib/docs/` 的 permalink 输出到 `/countinglib/docs/`。

介绍页仅复制使用中的字体与插图；字体许可证、字体来源和插图生成记录保存在 `countinglib/assets/`。旧版插图、设计截图、缓存、Lean 依赖与本地验证文件不进入网站。

新页面使用 `layout: null` 和独立 permalink，由 Jekyll 纳入站点与 sitemap。预览沿用主仓库的 Jekyll 构建与本地 HTTP 服务。检查主页入口、介绍页双语与交互、文档 API 搜索、返回链接和 PDF 路径后，再按用户确认发布。
