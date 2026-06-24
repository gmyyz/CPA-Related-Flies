# Git同步说明

## 每次开始

```bash
git pull --ff-only
git status
```

## 修改完成

```bash
git status
git diff --stat
git add .
git commit -m "更新 CPA 知识库"
git push origin main
```

## 在 Obsidian 里使用 Git 插件

可以安装社区插件 `Obsidian Git`，常用命令：

- `Obsidian Git: Pull`
- `Obsidian Git: Commit`
- `Obsidian Git: Push`
- `Obsidian Git: Commit-and-sync`

建议先手动同步几次，再开启自动同步。
