# 维护约定

这是个人网站仓库；常用内容入口和本地启动方式见 [README.md](README.md)。

1. 内容修改从对应的 `_pages/` 或 `_data/` 文件入手，不直接编辑 `_site/`。
2. Repository 全文由 LaTeX 生成，操作见 [维护说明](docs/repository.md)。修改正文应回到 LaTeX 源文件；展示调整放在布局和站点样式中。
3. 第三方样式放在 `assets/css/vendor/`，站点覆盖规则放在独立样式文件中。
4. 保持公开的页面地址和 PDF 路径稳定；涉及移动时检查所有引用。
5. 提交前检查修改范围和本地预览，不提交缓存、依赖目录或 `local/` 中的备份。

Academic Pages 模板本身的问题请提交到其 [上游仓库](https://github.com/academicpages/academicpages.github.io/issues)。
