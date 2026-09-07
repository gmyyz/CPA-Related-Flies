import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { loadSource, pageDir, sourceDir } from "./helpers/load-source.mjs";
import { studyData } from "../data/index.mjs";

function createTestDocument() {
  const createNode = (tagName, textContent = "") => ({
    tagName,
    className: "",
    hidden: false,
    children: [],
    parentNode: null,
    _textContent: textContent,
    get firstChild() {
      return this.children[0] || null;
    },
    get textContent() {
      return this.children.length > 0
        ? this.children.map((child) => child.textContent).join("")
        : this._textContent;
    },
    set textContent(value) {
      this.children = [];
      this._textContent = String(value);
    },
    append(...nodes) {
      nodes.forEach((node) => this.appendChild(node));
    },
    appendChild(node) {
      node.parentNode = this;
      this.children.push(node);
      return node;
    },
    removeChild(node) {
      this.children = this.children.filter((child) => child !== node);
      node.parentNode = null;
      return node;
    }
  });
  return {
    createElement: (tagName) => createNode(tagName),
    createTextNode: (text) => createNode("#text", text)
  };
}

test("study data has unique IDs, required fields, and chapter coverage", async () => {
  const dataSource = await readFile(path.join(pageDir, "study-data.js"), "utf8");
  const dataContext = vm.createContext({ window: {} });
  vm.runInContext(dataSource, dataContext);
  const entries = dataContext.window.studyData?.entries;
  assert.ok(Array.isArray(entries));
  assert.deepEqual(JSON.parse(JSON.stringify(studyData)), JSON.parse(JSON.stringify(dataContext.window.studyData)));
  assert.equal(entries.length, 228);
  assert.equal(new Set(entries.map((entry) => entry.id)).size, entries.length);
  entries.forEach((entry) => {
    assert.equal(typeof entry.id, "string");
    assert.ok(entry.id);
    assert.equal(typeof entry.topic, "string");
    assert.equal(typeof entry.question, "string");
    assert.equal(typeof entry.summary, "string");
    assert.ok(Array.isArray(entry.tags));
  });

  const document = { querySelector: () => ({}), querySelectorAll: () => [] };
  const { api } = await loadSource(
    ["js/app/00-runtime.js"],
    ["chapterDefinitions"],
    { document, window: { studyData: dataContext.window.studyData }, Set, Map }
  );
  const coveredTopics = new Set(api.chapterDefinitions.flatMap((chapter) => chapter.topics));
  const missingTopics = [...new Set(entries.map((entry) => entry.topic))].filter((topic) => !coveredTopics.has(topic));
  assert.deepEqual(missingTopics, []);
});

test("chapter Markdown export covers every chapter and remains plain text", async () => {
  const outputDir = path.resolve(pageDir, "..", "01-会计", "04-章节复习卡片");
  const files = (await readdir(outputDir)).filter((file) => file.endsWith(".md")).sort();
  const expectedFiles = ["README.md", ...studyData.chapters.map((chapter) => chapter.fileName)].sort();
  assert.deepEqual(files, expectedFiles);

  let exportedCards = 0;
  for (const chapter of studyData.chapters) {
    const markdown = await readFile(path.join(outputDir, chapter.fileName), "utf8");
    const cardCount = Number(markdown.match(/^cards: (\d+)$/m)?.[1]);
    assert.doesNotMatch(markdown, /^%TSD-Header-###%/);
    assert.match(markdown, new RegExp(`^---\\ntitle: ${chapter.title}\\n`, "m"));
    assert.match(markdown, new RegExp(`title: ${chapter.title}`));
    assert.match(markdown, /## 本章目录/);
    if (cardCount === 0) {
      assert.match(markdown, /当前暂无复习卡片/);
    } else {
      const cardHeadings = [...markdown.matchAll(/^## (\d{2})｜(.+)$/gm)];
      assert.equal(cardHeadings.length, cardCount);
      assert.match(markdown, /\n\[toc\]\n/);
      assert.doesNotMatch(markdown, /<a\s+id=/);
    }
    exportedCards += cardCount;
  }
  assert.equal(exportedCards, 258);
  const index = await readFile(path.join(outputDir, "README.md"), "utf8");
  assert.match(index, /^# CPA 会计章节复习卡片/m);
  assert.match(index, /共 \*\*258 张\*\*卡片/);
});

test("source note renderer supports tilde fenced code blocks", async () => {
  const document = createTestDocument();
  const { api } = await loadSource(
    ["js/ui/dom.js", "js/ui/cards.js"],
    ["renderSourceNotes"],
    {
      document,
      studyData: { entries: [] },
      uiState: { expandedIds: new Set() },
      state: {},
      cardList: document.createElement("div"),
      renderMermaidDiagrams: () => {}
    }
  );
  const container = document.createElement("div");
  api.renderSourceNotes(container, "段落\n~~~text\n第一层\n第二层\n~~~\n结尾", []);

  assert.deepEqual(container.children.map((child) => child.tagName), ["p", "pre", "p"]);
  assert.equal(container.children[1].textContent, "第一层\n第二层");
  assert.equal(container.textContent.includes("~~~text"), false);
});

test("source note renderer supports embedded data images", async () => {
  const document = createTestDocument();
  const { api } = await loadSource(
    ["js/ui/dom.js", "js/ui/cards.js"],
    ["renderSourceNotes"],
    {
      document,
      studyData: { entries: [] },
      uiState: { expandedIds: new Set() },
      state: {},
      cardList: document.createElement("div"),
      renderMermaidDiagrams: () => {}
    }
  );
  const container = document.createElement("div");
  api.renderSourceNotes(container, "![流程图](data:image/png;base64,aGVsbG8=)", []);

  assert.equal(container.children[0].tagName, "figure");
  assert.equal(container.children[0].children[0].tagName, "img");
  assert.equal(container.textContent.includes("data:image/png"), false);
});

test("generated page contains the required offline contracts", async () => {
  const html = await readFile(path.join(pageDir, "CICPA会计复习手册.html"), "utf8");
  assert.match(html, /由 npm run build 生成/);
  assert.match(html, /window\.studyData\s*=/);
  assert.match(html, /id="mermaid-source"/);
  assert.doesNotMatch(html, /<script[^>]+src=/);
  assert.doesNotMatch(html, /cdn\.jsdelivr\.net/);
  assert.doesNotMatch(html, /\/\* __CPA_INLINE_(?:CSS|APP)__ \*\//);
  [
    "search-input", "dashboard-view", "cards-view", "journal-library", "clear-filters",
    "chapter-filters", "tag-filters", "card-list", "gist-token-input", "gist-id-input"
  ].forEach((id) => assert.match(html, new RegExp(`id="${id}"`)));

  const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map((match) => match[1]);
  assert.ok(scripts.length >= 1);
  assert.doesNotThrow(() => new Function(scripts.at(-1)));
});

test("source template retains both build markers", async () => {
  const template = await readFile(path.join(sourceDir, "template.html"), "utf8");
  assert.match(template, /__CPA_INLINE_CSS__/);
  assert.match(template, /__CPA_INLINE_APP__/);
  assert.match(template, /__CPA_INLINE_DATA__/);
  assert.match(template, /__CPA_MERMAID_SOURCE__/);
});


test("compacted cards retain source calculations and previously unindexed long-term investment section", async () => {
  const outputDir = path.resolve(pageDir, "..", "01-会计", "04-章节复习卡片");
  const borrowing = await readFile(path.join(outputDir, "11-借款费用.md"), "utf8");
  assert.match(borrowing, /2,750×\(920\/12,000\)＝210.83/);
  assert.match(borrowing, /1,245|3,300－2,054.384/);
  assert.match(borrowing, /2,652.42/);
  const card = studyData.entries.find((entry) => entry.id === "long-term-equity-investment-disposal-partial-interest-without-loss-control");
  assert.ok(card, "existing authored card must be reachable in the webpage");
  const longTerm = await readFile(path.join(outputDir, "06-长期股权投资与合营安排.md"), "utf8");
  assert.match(longTerm, /商誉/);
  assert.match(longTerm, /不丧失控制权/);
});

test("merged financial cards retain examples and structured journal entries", async () => {
  const html = await readFile(path.join(pageDir, "CICPA会计复习手册.html"), "utf8");
  const appended = html.match(/window\.studyData\.entries\.push\(\.\.\.(\[.*?\])\);/s);
  assert.ok(appended, "financial cards are included in generated page");
  const cards = JSON.parse(appended[1]);
  assert.equal(cards.length, 30);
  for (const id of ["financial-instruments-05", "financial-instruments-25"]) {
    const card = cards.find((item) => item.id === id);
    assert.equal(card.journalEntries.length, 2);
    assert.equal(card.conclusion.length, 0, "source notes open without placeholder overview");
  }
  const equity = cards.find((item) => item.id === "financial-instruments-05");
  assert.equal(equity.journalEntries[1].lines.at(-1).amount, "380");
  assert.ok(!studyData.entries.some((entry) => [
    "financial-instruments-fair-value-hedge-carrying-adjustment",
    "financial-instruments-written-call-fixed-for-fixed-equity"
  ].includes(entry.id)), "duplicate standalone cards no longer render");
  const notes = await readFile(path.resolve(pageDir, "../01-会计/01-章节笔记/金融工具准则知识点.md"), "utf8");
  assert.match(notes, /500−20=480/);
  assert.match(notes, /股本溢价 380/);
  assert.match(notes, /留存收益累计减少30−7.5=22.5/);
});
