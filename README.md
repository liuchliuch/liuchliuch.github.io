# Chenghua Liu · Personal website

个人主页与论文 Repository，使用 Jekyll 构建，部署在 [liuchliuch.github.io](https://liuchliuch.github.io/)。

## 常用修改入口

| 内容 | 文件或目录 |
| --- | --- |
| 主页介绍、Works & Days、Rising Sea、Publications | `_pages/about.md` |
| Repository 论文清单、摘要、日期、PDF 路径 | `_data/repository.yml` |
| Repository 列表页 | `_pages/repository.html` |
| 论文全文 HTML（由 LaTeX 生成并提交） | `_pages/repository/` |
| Repository 论文 PDF | `files/repository/` |
| 其他论文与附件 | `files/` |
| 主页和列表页公共布局 | `_layouts/mondrian-home.html` |
| 论文全文页布局 | `_layouts/repository-paper.html` |
| 主页和列表页样式 | `assets/css/mondrian-home.css` |
| 论文全文页样式 | `assets/css/repository-paper.css` |
| 第三方 LaTeXML 样式（保留上游原文） | `assets/css/vendor/latexml/` |
| 站点配置 / 本地预览配置 | `_config.yml` / `_config_local.yml` |

全文生成、固定链接和样式维护见 [Repository 维护说明](docs/repository.md)。

## 本地预览

macOS 使用 Homebrew Ruby 3.3 与 Bundler 2.7.2。首次安装依赖：

```bash
./scripts/setup_local.sh
```

之后启动预览：

```bash
./scripts/serve_local.sh
```

打开 [http://127.0.0.1:4000](http://127.0.0.1:4000)。如端口已被占用，可用 `./scripts/serve_local.sh --port 4001`。
本地配置只覆盖 URL，不改变生产站点地址。普通预览无需运行论文转换器。

保留了 Docker / Dev Container 配置；需要时可使用 `docker compose up`。
仅修改 `assets/js/_main.js` 等旧主题脚本时，才需要运行 `npm run build:js`。

## 目录约定

- `_pages/`、`_data/`、`_layouts/`、`assets/`、`files/` 和 `images/` 是网站内容及资源。
- `scripts/` 是本地安装、预览、全文生成与 CV 维护工具；`docs/` 是维护文档。
- `_includes/`、`_sass/`、各旧内容集合，以及 `markdown_generator/`、`talkmap*` 保留了 Academic Pages 的基础功能和历史入口。
- `_site/`、`.sass-cache/`、`.bundle/`、`vendor/` 和 `node_modules/` 是本地产物或依赖，不提交。
- `local/` 用于个人临时文件和整理前备份，既不提交，也不参与站点构建。
- 文档和维护脚本通过 `_config.yml` 排除，不作为网站页面输出。

不要随意更改已经公开的论文 `slug`、PDF 文件名或页面 `permalink`。发布前检查本地效果，再提交和 push；维护约定见 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 来源

网站基于 [Academic Pages](https://github.com/academicpages/academicpages.github.io) / [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes)，设计参考 [uovou.me](https://uovou.me/)。模板许可保留在 [LICENSE](LICENSE)。LaTeXML 样式的版本与来源见 [Repository 维护说明](docs/repository.md#第三方样式)。
