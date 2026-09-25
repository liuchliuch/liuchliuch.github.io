# Repository 维护说明

## 内容从哪里来

| 内容 | 来源 | 网站中对应位置 |
| --- | --- | --- |
| 标题、摘要、加入日期和论文路径 | 手工维护的清单 | `_data/repository.yml` |
| 可下载的原版 PDF | 论文导出的 PDF | `files/repository/` |
| 完整正文、公式、参考文献 | LaTeX 经转换器生成 | `_pages/repository/<slug>.html` |
| 全文排版和页首信息 | Jekyll 布局与 CSS | `_layouts/repository-paper.html`、`assets/css/repository-paper.css` |

清单中的 `slug` 决定固定地址 `/repository/<slug>/`。列表页标题和 HTML 链接使用这个地址，PDF 链接保留原路径。已公开的 `slug` 应保持稳定。

全文 HTML 是提交到 Git 的生成文件。GitHub Pages 只需构建 Jekyll，不需要访问本地 LaTeX 源文件或安装论文转换器。普通站点预览不会重新生成论文。

## 新增或更新论文

1. 将 PDF 放入 `files/repository/`。
2. 在 `_data/repository.yml` 中维护条目，包括唯一的 `slug`、`pdf` 和 `added`。沿用现有条目的字段和日期格式。
3. 准备对应的 LaTeX 源文件。默认源目录为网站仓库旁的 `../ai-paper-repo/`；生成器先按 PDF 文件名匹配 `.tex`，再尝试论文代码，必须唯一匹配。
4. 需要更新正文时运行生成器。**它会重新生成清单中的全部论文**，因此转换后应检查 diff。

```bash
ruby scripts/generate_repository_html.rb \
  --converter /path/to/latexml_oxide \
  --source-root /path/to/ai-paper-repo
```

也可设置 `LATEXML_OXIDE` 环境变量指定转换器。当前全文使用 [LaTeXML-Oxide](https://github.com/dginev/latexml-oxide) **0.7.6** 生成。

生成器会检查 PDF 是否存在、slug 是否重复、LaTeX 源文件是否唯一，并要求输出包含摘要、正文和参考文献。无法直接包含的相对资源会报错；不要忽略错误后提交部分输出。

生成后，用 `./scripts/serve_local.sh` 检查列表页和论文页，尤其是数学标题、长公式、多行推导、图表、引用跳转和 PDF 链接。正文使用原生 MathML；图片和图表可能是内嵌 SVG。

## 修改展示

- 列表内容：`_pages/repository.html`。
- 论文页布局：`_layouts/repository-paper.html`。
- 样式加载入口：`_layouts/mondrian-home.html`。
- 本站全文样式：`assets/css/repository-paper.css`。

公式使用 LaTeXML 的对齐表格。网站的普通 `table` / `td` 样式不能给公式增加边框或缩小字号；相关覆盖规则已集中在全文样式中。真实表格的显式 `ltx_border_*` 横线与数学公式本身的方框应保留。

仅调整样式时，无需重新转换论文。不要手改生成页面中的 MathML 或把正文变成图片。

## 第三方样式

`assets/css/vendor/latexml/` 中的两个文件原样来自 [LaTeXML 0.8.8](https://github.com/brucemiller/LaTeXML)：

- `latexml.css`：基础 LaTeXML 元素、数学对齐和表格规则。
- `article.css`：论文结构与段落规则。

这些样式由 NIST 开发，以公共领域 / CC0 等效条款发布。网站特有的覆盖规则放在 `assets/css/repository-paper.css`，不要混入第三方文件。升级时同时检查公式、真实表格和窄屏效果。
