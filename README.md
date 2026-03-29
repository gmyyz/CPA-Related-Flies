# CPA Review Sync Guide

这个仓库现在只用于同步会计复习网页。

## 主要文件

- `会计复习网页/CICPA会计复习手册.html`
- `会计复习网页/学习问答汇总.md`

## 日常使用

### Windows 或 Mac 开始修改前

```powershell
git pull
```

### 修改完成后

```powershell
git status
git add .
git commit -m "Update CPA review notes"
git push
```

## 推荐工作流

- 网页内容优先维护 `会计复习网页/CICPA会计复习手册.html`
- `学习问答汇总.md` 作为阅读版备份
- 每次只在一台设备修改，改完后先 `push`，另一台再 `pull`

## 如果遇到冲突

- 先执行 `git status`
- 看冲突文件是否是 `CICPA会计复习手册.html`
- 如果是同一时间两台设备都改了，优先保留你最新整理的版本，再重新 `add`、`commit`

## 说明

- 这个仓库已经清理过历史，只保留复习网页相关内容
- `.idea/`、系统缓存文件等已通过 `.gitignore` 排除

## 上传测试

- 这是一条用于测试 Git 提交和上传功能的说明更新
