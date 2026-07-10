# CPA 仓库终端操作手册

这个仓库主要用于维护 CPA 学习资料和网页复习资料，主要包括：

- `01-会计/01-章节笔记/`
- `会计复习网页/CICPA会计复习手册.html`
- `会计复习网页/study-data.js`
- `会计复习网页/学习问答汇总.md`

以后可以直接在终端里，按这份手册操作 Git。

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
git pull --ff-only
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
git add "01-会计/03-问答/学习问答汇总.md"
git commit -m "更新会计学习问答汇总"
git push origin main
```

---

## 5. 推荐日常工作流

每次都按这个顺序走，最稳：

```bash
cd "/Users/yyz/AI Agent/2.CPA/CPA-Related-Flies"
git pull --ff-only
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
git pull --ff-only
git push origin main
```

### 如果是认证问题

一般是 GitHub 登录状态失效，重新完成终端里的认证流程即可。

---

## 10. 最常用的极简版本

如果你平时只想记最核心的 5 条，就记这个：

```bash
cd "/Users/yyz/AI Agent/2.CPA/CPA-Related-Flies"
git pull --ff-only
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

### 12.1 当前目录结构

```text
01-会计/01-章节笔记/          完整知识点笔记
会计复习网页/                 静态网页和网页卡片数据
```

---

## 13. 网页卡片与分录模块维护约定

以后如果在新的对话或新的设备里继续维护网页，请先读这一节。网页的知识卡片数据主要维护在：

```text
会计复习网页/study-data.js
```

HTML 文件 `会计复习网页/CICPA会计复习手册.html` 已经内置了“卡片分录模块”和“分录库”的渲染逻辑。新增知识点时，原则上只改 `study-data.js`；除非要改页面样式或交互，否则不要动 HTML 里的分录库代码。

### 13.1 分录不要只散落在正文里

如果某张卡片有关键会计分录，应当把分录作为卡片的一级模块写入 `journalEntries` 字段。这样它会同时出现在：

- 原知识卡片的“分录”区域
- 页面顶部的“分录库”
- 搜索结果中

推荐结构如下：

```js
journalEntries: [
  {
    title: "计量期间调增或有对价",
    scope: "合并报表工作底稿",
    condition: "购买日后 12 个月内取得购买日已存在情况的新证据",
    lines: [
      { side: "借", account: "商誉", amount: "300" },
      { side: "贷", account: "长期股权投资", amount: "300" }
    ],
    note: "单体报表已确认金融负债时，合并层面通常通过长期股权投资把调整转入商誉。"
  }
]
```

如果分录很特殊，也可以直接写 `body`：

```js
journalEntries: [
  {
    title: "确认补偿性资产",
    scope: "购买日合并报表",
    body: "借：补偿性资产 800\n  贷：商誉 800",
    note: "补偿方是外部原股东时，合并层面不抵销。"
  }
]
```

### 13.2 自动识别只是兜底，不是首选

页面会自动识别卡片正文里标记为 `text`、且同时包含 `借：` 和 `贷：` 的代码块，并汇总进分录库。但高价值、容易混淆、考试常考的分录，仍然应当手动写入 `journalEntries`，因为手动结构可以保留适用范围、条件和提示。

### 13.3 新增卡片时的检查清单

- 知识点结论写在 `conclusion`
- 原理解释写在 `reasoning`
- 易错点写在 `pitfalls`
- 需要背的口诀或判断规则写在 `memory`
- 关键分录写在 `journalEntries`
- 标签里可以加入 `分录`，但页面也会对有分录的卡片自动补充这个标签
- 修改后运行：

```bash
node --check "会计复习网页/study-data.js"
git diff --check
```

如果改了网页交互逻辑，要运行 `npm run check`，并尽量用浏览器打开生成后的本地网页做一次页面检查。

---

## 14. 会计复习网页生成和维护说明

本节用于维护 `会计复习网页/CICPA会计复习手册.html` 及其数据文件。以后不要另建独立网页维护文档，统一更新本 README。

### 14.1 文件分工

| 文件 | 用途 | 常见维护动作 |
| --- | --- | --- |
| `会计复习网页/src/` | 网页外壳、模块化样式、领域逻辑、服务和视图源码 | 新增章节筛选、调整页面样式或交互 |
| `会计复习网页/CICPA会计复习手册.html` | `npm run build` 生成的离线单文件成品 | 不直接编辑，构建后用于双击打开和 Git 备份 |
| `会计复习网页/study-data.js` | 网页知识卡片主数据源 | 新增、修改、删除知识卡片 |
| `会计复习网页/学习问答汇总.md` | 学习问答的 Markdown 汇总 | 作为网页内容的文字来源或备份 |
| `01-会计/01-章节笔记/*.md` | 按章节整理的专题笔记 | 先沉淀知识点，再转成网页卡片 |

通常新增知识点时，优先修改 `study-data.js`。只有新增专题筛选、页面结构或交互时，才修改 `会计复习网页/src/`，然后运行构建命令更新 HTML 成品。

### 14.2 新增知识卡片流程

1. 先在对应章节的 Markdown 文件中整理知识点。
2. 将知识点拆成网页卡片，写入 `会计复习网页/study-data.js` 的 `entries` 数组。
3. 如果是全新专题，在 `会计复习网页/src/js/app/00-runtime.js` 的 `chapterDefinitions` 中新增章节筛选。
4. 运行 `npm run check`，生成并验证 HTML 成品。
5. 打开本地网页验证搜索、筛选、卡片展示是否正常。
6. 提交并推送到 GitHub。

### 14.3 卡片字段约定

每张卡片建议包含以下字段：

```js
{
  id: "唯一英文标识",
  updatedAt: "2026-06-23",
  topic: "借款费用",
  difficulty: "高频基础",
  question: "卡片标题或问题",
  summary: "一句话总结",
  conclusion: ["核心结论"],
  reasoning: ["理解逻辑、计算过程或例题拆解"],
  memory: ["口诀或速记"],
  pitfalls: ["易错点"],
  tags: ["借款费用", "资本化", "专门借款"]
}
```

`difficulty` 常用值：

```text
高频基础
高频提高
高频易错
高频综合
```

### 14.4 分录模块

如果卡片有关键会计分录，应优先使用结构化 `journalEntries` 字段，而不是只把分录写在正文中。

```js
journalEntries: [
  {
    title: "确认资本化利息",
    scope: "在建工程",
    condition: "符合借款费用资本化条件",
    lines: [
      { side: "借", account: "在建工程", amount: "152.42" },
      { side: "贷", account: "应付利息", amount: "180" }
    ],
    note: "金额按题目实际口径填写。"
  }
]
```

页面也会自动识别正文里同时包含 `借：` 和 `贷：` 的代码块，但结构化分录更利于进入分录库和搜索。

### 14.5 新增章节筛选

如果新增了一个全新 `topic`，例如 `借款费用`，需要在 HTML 中找到：

```js
const chapterDefinitions = [
```

然后增加一行：

```js
{ id: "borrowing-costs", title: "借款费用", topics: ["借款费用"] },
```

这样网页顶部章节筛选才会显示新专题。

### 14.6 检查命令

修改数据文件后，至少运行：

```bash
node --check "会计复习网页/study-data.js"
git diff --check
```

如果修改了网页源码，必须运行 `npm run check`，再直接打开生成后的本地网页验证。

### 14.7 本地验证

首次开发或源码变更后先安装依赖并构建：

```bash
npm install
npm run check
```

生成后的网页仍是静态单文件，可以直接打开：

```text
会计复习网页/CICPA会计复习手册.html
```

建议验证：

- 页面能正常加载；
- 顶部统计数字正常；
- 新增章节筛选可见；
- 搜索新增关键词能找到卡片；
- 章节筛选后卡片数量合理；
- 分录库没有异常报错。

### 14.8 Git 提交流程

只提交网页相关内容时，建议明确列文件：

```bash
git add "01-会计/01-章节笔记/借款费用知识点.md"
git add "会计复习网页/study-data.js"
git add "会计复习网页/src"
git add "会计复习网页/CICPA会计复习手册.html"
git add "package.json" "package-lock.json"
git add "README.md"
git commit -m "补充借款费用复习内容"
git push origin main
```

如果远端有更新，先执行：

```bash
git pull --rebase origin main
```

再推送。

### 14.9 维护原则

- Markdown 文件负责完整知识沉淀；网页卡片负责高频复习和检索。
- 卡片不必逐字复制 Markdown，重点保留结论、判断规则、例题题眼和易错点。
- 新增专题时，同步补章节筛选。
- 提交前不要顺手提交无关 PDF、临时输出目录或备份文件。
- 改网页逻辑时，尽量保留已有数据结构，避免影响旧卡片。
- 不要直接编辑生成后的 `CICPA会计复习手册.html`；所有样式和逻辑改动从 `会计复习网页/src/` 开始。
- `npm run build` 只生成成品；`npm test` 运行单元和数据检查；提交前统一运行 `npm run check`。

### 14.10 Markdown 到网页卡片迁移规则

从 `01-会计/01-章节笔记/*.md` 知识点文件迁移到 `会计复习网页/study-data.js` 时，不能只迁移标题和一句摘要。网页卡片可以压缩表达，但不能遗漏 MD 中的核心考试信息。

迁移时按以下规则检查：

1. 每个 `##` 二级章节原则上至少要能在网页中找到对应卡片，或者能明确并入同主题的相邻卡片。
2. 如果并入相邻卡片，必须把该章节的核心结论、判断口径、例题题眼和易错点放进对应卡片，不能只保留笼统总结。
3. MD 中的表格、公式、数字例题、分录、口诀、特殊列报规则，属于高风险遗漏项，迁移时要逐项确认。
4. 对于综合性章节，网页卡片不必逐字搬运，但至少要覆盖：
   - `核心结论`
   - `判断逻辑`
   - `例题计算或关键数字`
   - `易错点`
   - `记忆口诀`
5. 如果 MD 中存在关键会计分录，优先写入 `journalEntries`，不要只放在正文段落里。
6. 如果 MD 中有 Mermaid 图或思维导图，网页卡片中的 `diagram` 应保留主要分支；图中细分节点不能被压缩到只剩总标题。
7. 如果新增或补齐了一个全新专题，除了写入 `study-data.js`，还要确认 HTML 的章节筛选中能看到该专题。

迁移完成后，建议做一次覆盖审计：

```bash
node --check "会计复习网页/study-data.js"
git diff --check
```

还应人工抽查低覆盖或低相似章节，尤其是：

- 例题型章节；
- 思维导图型章节；
- 表格型章节；
- 分录型章节；
- “特殊问题”“提示”“易错点”密集的章节。

如果发现网页卡片已经有同名知识点，但缺少 MD 后半段的例题、列报规则、特殊处理或口诀，应优先补强现有卡片，避免另建重复卡片。

维护口径：

```text
MD 是完整笔记；
网页是复习卡片；
卡片可以短，但不能漏掉考试判断点。
```
