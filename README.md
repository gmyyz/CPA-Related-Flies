# CPA 仓库终端操作手册

这个仓库主要用于维护 CPA 学习资料，尤其是：

- `会计复习网页/CICPA会计复习手册.html`
- `会计复习网页/学习问答汇总.md`

以后你可以直接在终端里，按这份手册操作。

---

## 1. 先进入仓库

你的仓库根目录是：

```bash
cd "/Users/yyz/AI Agent/2.CPA/CPA-Related-Flies"
```

注意：路径里有空格，所以一定要加双引号。

---

## 2. 每次开始修改前先同步

先拉取远程最新内容：

```bash
git pull origin main
```

如果你只是想先看看当前状态，也可以先执行：

```bash
git status
```

---

## 3. 修改完成后的标准提交流程

这是你以后最常用的一组命令。

### 查看哪些文件变了

```bash
git status
```

### 查看具体改动

```bash
git diff
```

### 添加所有改动

```bash
git add .
```

### 提交

```bash
git commit -m "更新 CPA 复习资料"
```

### 推送到 GitHub

```bash
git push origin main
```

---

## 4. 只提交某个文件时怎么做

如果你只想提交网页文件：

```bash
git add "会计复习网页/CICPA会计复习手册.html"
git commit -m "更新会计复习手册页面"
git push origin main
```

如果你只想提交 Markdown 问答汇总：

```bash
git add "会计复习网页/学习问答汇总.md"
git commit -m "更新会计学习问答汇总"
git push origin main
```

---

## 5. 推荐日常工作流

每次都按这个顺序走，最稳：

```bash
cd "/Users/yyz/AI Agent/2.CPA/CPA-Related-Flies"
git pull origin main
git status
# 然后开始修改文件
```

修改完后：

```bash
git status
git diff
git add .
git commit -m "更新 CPA 资料"
git push origin main
```

---

## 6. 常用检查命令

### 查看提交历史

```bash
git log --oneline --decorate -n 10
```

### 查看远程仓库地址

```bash
git remote -v
```

### 查看当前分支

```bash
git branch
```

---

## 7. 如果只是改乱了，但还没 commit

### 丢弃某一个文件的本地修改

```bash
git restore "会计复习网页/CICPA会计复习手册.html"
```

### 丢弃全部未提交修改

```bash
git restore .
```

注意：这会直接撤销本地未提交内容，执行前先确认。

---

## 8. 如果已经 add 了，但还没 commit

### 取消暂存

```bash
git restore --staged .
```

### 取消某个文件的暂存

```bash
git restore --staged "会计复习网页/CICPA会计复习手册.html"
```

---

## 9. 如果 push 失败，先试这几步

### 先看当前状态

```bash
git status
```

### 先拉最新代码再推

```bash
git pull origin main
git push origin main
```

### 如果是认证问题

一般是 GitHub 登录状态失效，重新完成终端里的认证流程即可。

---

## 10. 最常用的极简版本

如果你平时只想记最核心的 5 条，就记这个：

```bash
cd "/Users/yyz/AI Agent/2.CPA/CPA-Related-Flies"
git pull origin main
git add .
git commit -m "更新 CPA 资料"
git push origin main
```

---

## 11. 建议

- 每次修改前先 `pull`
- 每次修改后先 `status` 再 `commit`
- 提交说明尽量写清楚，比如：
  - `更新会计复习手册页面`
  - `补充合并财务报表问答`
  - `调整网页交互与筛选逻辑`
- 尽量只在一台设备改完并推送后，再去另一台继续改，避免冲突

---

## 12. 当前仓库说明

当前远程仓库：

```bash
https://github.com/gmyyz/CPA-Related-Flies
```

当前默认分支：

```bash
main
```
