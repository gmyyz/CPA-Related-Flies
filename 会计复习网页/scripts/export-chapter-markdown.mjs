import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chapterDefinitions } from "../data/chapters.mjs";
import { revenueEntryIds } from "./revenue-note-ids.mjs";
import { studyData } from "../data/index.mjs";
import { markdownNoteSources } from "./markdown-notes.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const pageDir = path.resolve(scriptDir, "..");
const outputDir = path.resolve(pageDir, "..", "01-会计", "04-章节复习卡片");
const financialNotesPath = path.resolve(pageDir, "..", "01-会计", "01-章节笔记", "金融工具准则知识点.md");
const checkOnly = process.argv.includes("--check");

function normalizeText(value) {
  return String(value || "").replace(/\s+/g, " ").trim().toLowerCase();
}

function removeRepeatedBlocks(items, seen) {
  return (items || []).filter((item) => {
    const key = normalizeText(item);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function renderSummary(summary, seen) {
  const key = normalizeText(summary);
  if (!key) return "";
  seen.add(key);
  return `> **速览**：${summary.replace(/\n/g, "\n> ")}`;
}

function renderBlocks(title, items, seen) {
  const uniqueItems = removeRepeatedBlocks(items, seen);
  if (uniqueItems.length === 0) return "";
  const groups = [];
  uniqueItems.forEach((item, index) => {
    if (!item.includes("\n")) {
      const lastGroup = groups.at(-1);
      if (lastGroup?.type === "list") lastGroup.items.push(item);
      else groups.push({ type: "list", items: [item] });
      return;
    }
    const labeled = item.match(/^【([^】]+)】\s*\n?([\s\S]*)$/);
    const heading = labeled?.[1] || `要点 ${index + 1}`;
    const body = (labeled?.[2] || item).trim();
    const lastGroup = groups.at(-1);
    if (lastGroup?.type === "detail" && lastGroup.heading === heading) lastGroup.items.push(body);
    else groups.push({ type: "detail", heading, items: [body] });
  });
  const content = groups.map((group) => group.type === "list"
    ? group.items.map((item) => `- ${item}`).join("\n")
    : `#### ${group.heading}\n\n${group.items.join("\n\n")}`).join("\n\n");
  return `### ${title}\n\n${content}`;
}

function renderJournalEntries(entries) {
  if (!entries?.length) return "";
  const content = entries.map((entry, index) => {
    const lines = (entry.lines || []).map((line) => `| ${line.side || ""} | ${line.account || ""} | ${line.amount || ""} |`).join("\n");
    const table = lines ? `\n\n| 方向 | 科目 | 金额 |\n| --- | --- | --- |\n${lines}` : "";
    const metadata = [
      entry.scope && `- **适用范围**：${entry.scope}`,
      entry.condition && `- **条件**：${entry.condition}`,
      entry.body && `\n\n\`\`\`text\n${entry.body}\n\`\`\``,
      entry.note && `\n\n> **提示**：${entry.note}`
    ].filter(Boolean).join("\n");
    return `#### ${entry.title || `分录 ${index + 1}`}\n\n${metadata || "- 详见本卡片判断逻辑。"}${table}`;
  }).join("\n\n");
  return `### 关键分录\n\n${content}`;
}

function getCardHeading(entry, index) {
  return `${String(index).padStart(2, "0")}｜${entry.question}`;
}

function renderCardDirectory(entries) {
  if (entries.length === 0) return "## 本章目录\n\n> 当前暂无复习卡片。";
  return "## 本章目录\n\n[toc]";
}

function renderStructuredCard(entry, index) {
  const seen = new Set();
  const compactNote = entry.noteBody && ![...(entry.conclusion || []), ...(entry.reasoning || []), ...(entry.memory || []), ...(entry.pitfalls || [])].length;
  const sections = compactNote ? [renderSummary(entry.summary, seen), entry.noteBody] : [
    renderSummary(entry.summary, seen),
    renderBlocks("核心结论", entry.conclusion, seen),
    renderBlocks("判断与例题", entry.reasoning, seen),
    renderBlocks("记忆线索", entry.memory, seen),
    renderBlocks("易错提醒", entry.pitfalls, seen),
    renderJournalEntries(entry.journalEntries)
  ].filter(Boolean);
  const tags = entry.tags?.length ? `\n\n**标签**：${entry.tags.map((tag) => `\`${tag}\``).join(" · ")}` : "";
  return `## ${getCardHeading(entry, index)}\n\n**难度**：${entry.difficulty}　·　**更新**：${entry.updatedAt}\n\n${sections.join("\n\n")}${tags}`;
}

async function readFinancialCards() {
  const markdown = await readFile(financialNotesPath, "utf8");
  const sections = markdown.split(/^## /m).slice(1)
    .filter((section) => !section.startsWith("待整理规则") && !section.startsWith("一、专题标题"))
    .map((section) => section.trim());
  return sections.map((section, index) => {
    const [question, ...body] = section.split(/\r?\n/);
    return {
      id: `financial-instruments-${String(index + 1).padStart(2, "0")}`,
      topic: "金融工具",
      difficulty: "章节笔记",
      updatedAt: "2026-09-07",
      question: question.trim(),
      body: body.join("\n").trim()
    };
  });
}

function renderFinancialCard(entry, index) {
  return `## ${getCardHeading(entry, index)}\n\n**难度**：${entry.difficulty}　·　**更新**：${entry.updatedAt}\n\n### 完整笔记\n\n${entry.body || "本卡片暂无正文。"}\n\n**标签**：\`金融工具\` · \`Markdown同步\``;
}

function getChapterEntries(chapter, entries) {
  if (chapter.entryIds?.length) {
    const byId = new Map(entries.map((entry) => [entry.id, entry]));
    return chapter.entryIds.map((id) => byId.get(id)).filter(Boolean);
  }
  const topics = new Set(chapter.topics || []);
  return entries.filter((entry) => topics.has(entry.topic));
}

function renderChapter(chapter, entries) {
  const body = entries.length === 0
    ? "## 本章状态\n\n> 当前网页尚未配置本章卡片。为避免把其他章节内容误归入本章，此文件保留为明确的章节占位；后续补卡后运行 `npm run notes:build` 即可更新。"
    : entries.map((entry, index) => entry.body !== undefined
      ? renderFinancialCard(entry, index + 1)
      : renderStructuredCard(entry, index + 1)).join("\n\n---\n\n");
  return `---
title: ${chapter.title}
cards: ${entries.length}
updated: ${studyData.updatedAt}
source: 会计复习网页/data
generated: true
---

# ${chapter.title}

[← 返回章节目录](README.md)　·　**${entries.length} 张复习卡片**　·　生成时间：${studyData.updatedAt}

> 阅读顺序：先从本章目录或阅读器的大纲定位卡片，再看“速览”，并用“核心结论—判断与例题—记忆线索—易错提醒”完成一轮复习。已精简卡片直接保留对应完整笔记；其余卡片省略完全重复的结构化内容。

${renderCardDirectory(entries)}

${body}
`;
}

function renderIndex(chapters, chapterEntries) {
  const rows = chapters.map((chapter) => `| ${chapter.title} | ${chapterEntries.get(chapter.id).length} | [打开](./${chapter.fileName}) |`).join("\n");
  const total = [...chapterEntries.values()].reduce((sum, entries) => sum + entries.length, 0);
  return `# CPA 会计章节复习卡片

将网页的复习卡片按 CPA《会计》30 章拆分为独立 Markdown 文件，便于在 Typora、MarkText、Obsidian 或 GitHub 中按章复习。

## 使用说明

- 每章采用统一结构：**速览 → 核心结论 → 判断与例题 → 记忆线索 → 易错提醒 → 关键分录**。
- 各章节的“本章目录”使用 Typora 原生的 \`[toc]\`：在 Typora 中会自动生成可点击目录，目录项会随着卡片标题更新；其他阅读器可使用其标题大纲浏览。
- Markdown 由网页数据自动导出；不要直接改本目录的文件。修改卡片源后执行 \`npm run notes:build\`。
- 导出时会移除同一卡片内完全相同的文字块，避免“摘要、结论、提示”重复出现；不同卡片之间的必要交叉提示会保留。
- 第十六章目前没有网页卡片，目录保留章节文件但不虚构内容。

## 章节导航

共 **${total} 张**卡片，覆盖 30 个章节文件。

| 章节 | 卡片 | 文件 |
| --- | ---: | --- |
${rows}

## 维护入口

- 网页卡片：\`会计复习网页/data/topics/\`
- 章节映射：\`会计复习网页/data/chapters.mjs\`
- 导出脚本：\`会计复习网页/scripts/export-chapter-markdown.mjs\`
- 校验命令：\`npm run notes:check\`、\`npm run check\`
`;
}

async function readMappedNotes() {
  const notes = new Map();
  for (const source of markdownNoteSources) {
    const sourcePath = path.resolve(pageDir, ...source.path);
    const markdown = await readFile(sourcePath, "utf8");
    const sections = markdown.split(/^## /m).slice(1);
    if (sections.length !== source.entryIds.length) throw new Error(`笔记映射数量不符：${sourcePath}`);
    sections.forEach((section, index) => {
      const id = source.entryIds[index];
      if (!studyData.entries.some((entry) => entry.id === id)) throw new Error(`完整笔记缺少在用卡片：${id}`);
      // Keep each source section once, including merged mappings; local assets remain relative to the export directory.
      const body = (`### ${section.trim()}`).replace(/(!?\[[^\]]*\]\()([^\s)]+)(\))/g, (match, start, url, end) => {
        if (/^(?:[a-z][a-z0-9+.-]*:|#|\/)/i.test(url)) return match;
        const target = path.resolve(path.dirname(sourcePath), decodeURI(url));
        return `${start}${encodeURI(path.relative(outputDir, target).split(path.sep).join("/"))}${end}`;
      });
      notes.set(id, [notes.get(id), body].filter(Boolean).join("\n\n"));
    });
  }
  const revenue = await readFile(path.resolve(pageDir, "../01-会计/01-章节笔记/收入准则知识点.md"), "utf8");
  const sections = revenue.split(/^## /m).slice(1).filter((section) => !section.startsWith("待整理规则") && !section.startsWith("一、专题标题"));
  if (sections.length !== revenueEntryIds.length) throw new Error("收入笔记与卡片映射数量不符");
  revenueEntryIds.forEach((id, index) => notes.set(id, "### " + sections[index].trim()));
  return notes;
}

async function syncChapterMarkdown({ check = false } = {}) {
  const financialCards = await readFinancialCards();
  const mappedNotes = await readMappedNotes();
  const allEntries = [...studyData.entries.map((entry) => ({ ...entry, noteBody: mappedNotes.get(entry.id) })), ...financialCards];
  const chapterEntries = new Map(chapterDefinitions.map((chapter) => [chapter.id, getChapterEntries(chapter, allEntries)]));
  const expectedFiles = new Map([
    ["README.md", renderIndex(chapterDefinitions, chapterEntries)],
    ...chapterDefinitions.map((chapter) => [chapter.fileName, renderChapter(chapter, chapterEntries.get(chapter.id))])
  ]);

  if (check) {
    const existingFiles = await readdir(outputDir);
    const unexpected = existingFiles.filter((file) => file.endsWith(".md") && !expectedFiles.has(file));
    if (unexpected.length) throw new Error(`章节 Markdown 目录存在未登记文件：${unexpected.join("、")}`);
    for (const [fileName, expected] of expectedFiles) {
      const current = await readFile(path.join(outputDir, fileName), "utf8");
      if (current !== expected) throw new Error(`章节 Markdown 不是最新版本：${fileName}`);
    }
    return { chapters: chapterDefinitions.length, cards: allEntries.length };
  }

  await mkdir(outputDir, { recursive: true });
  await Promise.all([...expectedFiles].map(([fileName, content]) => writeFile(path.join(outputDir, fileName), content, "utf8")));
  return { chapters: chapterDefinitions.length, cards: allEntries.length };
}

try {
  const result = await syncChapterMarkdown({ check: checkOnly });
  console.log(checkOnly
    ? `章节 Markdown 与网页数据一致：${result.chapters} 章、${result.cards} 张卡片。`
    : `已生成章节 Markdown：${result.chapters} 章、${result.cards} 张卡片。`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
