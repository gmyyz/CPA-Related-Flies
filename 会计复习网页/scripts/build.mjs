import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { transform } from "esbuild";
import { markdownNoteSources } from "./markdown-notes.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const pageDir = path.resolve(scriptDir, "..");
const sourceDir = path.join(pageDir, "src");
const outputPath = path.join(pageDir, "CICPA会计复习手册.html");
const revenueNotesPath = path.resolve(pageDir, "..", "01-会计", "01-章节笔记", "收入准则知识点.md");
const financialNotesPath = path.resolve(pageDir, "..", "01-会计", "01-章节笔记", "金融工具准则知识点.md");
const revenueEntryIds = [
  "revenue-five-step-and-control", "revenue-contract-formation-five-conditions", "revenue-distinct-performance-obligation", "revenue-contract-combination-vs-po-combination", "revenue-performance-and-control", "revenue-over-time-three-criteria", "revenue-point-in-time-control-indicators", "revenue-transaction-price-variable-consideration-ip-royalty", "revenue-transaction-price-significant-financing", "revenue-transaction-price-noncash-consideration", "revenue-transaction-price-consideration-payable-to-customer", "revenue-allocation-subsequent-changes", "revenue-material-right-rebates-points", "revenue-contract-costs-fulfillment-acquisition-impairment", "revenue-transportation-costs", "revenue-sales-with-right-of-return", "revenue-principal-vs-agent", "revenue-ip-license-special-rules", "revenue-repurchase-arrangements", "revenue-customer-unexercised-rights", "revenue-nonrefundable-upfront-fee", "revenue-refund-liability-vs-other-payables"
];

async function readRevenueNotes() {
  const markdown = await readFile(revenueNotesPath, "utf8");
  const sections = markdown.split(/^## /m).slice(1).filter((section) => !section.startsWith("待整理规则") && !section.startsWith("一、专题标题"));
  if (sections.length !== revenueEntryIds.length) {
    throw new Error(`收入 Markdown 专题数量（${sections.length}）与网页卡片数量（${revenueEntryIds.length}）不一致。`);
  }
  return Object.fromEntries(revenueEntryIds.map((id, index) => [id, sections[index].trim()]));
}

async function readOtherMarkdownNotes() {
  const notes = {};
  for (const { path: sourcePath, entryIds } of markdownNoteSources) {
    const markdown = await readFile(path.resolve(pageDir, ...sourcePath), "utf8");
    const sections = markdown.split(/^## /m).slice(1).map((section) => section.trim());
    if (sections.length !== entryIds.length) {
      throw new Error(`Markdown 专题数量（${sections.length}）与卡片映射数量（${entryIds.length}）不一致：${sourcePath.at(-1)}`);
    }
    entryIds.forEach((id, index) => {
      notes[id] = notes[id] ? `${notes[id]}\n\n${sections[index]}` : sections[index];
    });
  }
  return notes;
}

async function readFinancialNotes() {
  const markdown = await readFile(financialNotesPath, "utf8");
  const sections = markdown.split(/^## /m).slice(1).filter((section) => !section.startsWith("待整理规则") && !section.startsWith("一、专题标题")).map((section) => section.trim());
  const entries = sections.map((section, index) => {
    const title = section.split(/\r?\n/, 1)[0];
    const id = `financial-instruments-${String(index + 1).padStart(2, "0")}`;
    return {
      id,
      updatedAt: "2026-08-02",
      topic: "金融工具",
      difficulty: "章节笔记",
      question: title,
      summary: "展开查看完整 Markdown 笔记。",
      conclusion: ["本卡片已同步完整章节笔记，可在下方查看判断逻辑、例题和易错点。"],
      reasoning: [],
      memory: [],
      pitfalls: [],
      journalEntries: [],
      tags: ["金融工具", "Markdown同步"]
    };
  });
  return { entries, notes: Object.fromEntries(entries.map((entry, index) => [entry.id, sections[index]])) };
}

const cssModules = [
  "styles/00-core.css",
  "styles/20-dashboard.css",
  "styles/30-cards.css",
  "styles/40-journal.css",
  "styles/90-responsive.css"
];

const jsModules = [
  "js/app/00-runtime.js",
  "js/domain/review.js",
  "js/domain/progress.js",
  "js/domain/journal.js",
  "js/services/mermaid.js",
  "js/services/cloud-sync.js",
  "js/app/state.js",
  "js/ui/dom.js",
  "js/ui/filters.js",
  "js/ui/cards.js",
  "js/ui/journal.js",
  "js/ui/dashboard.js",
  "js/app/main.js",
  "js/app/99-boot.js"
];

async function readModules(files) {
  return Promise.all(files.map((file) => readFile(path.join(sourceDir, file), "utf8")));
}

async function buildPage() {
  const [template, cssParts, jsParts, revenueNotes, otherNotes, financialNotes] = await Promise.all([
    readFile(path.join(sourceDir, "template.html"), "utf8"),
    readModules(cssModules),
    readModules(jsModules),
    readRevenueNotes(),
    readOtherMarkdownNotes(),
    readFinancialNotes()
  ]);

  const css = cssParts.map((part) => part.trimEnd()).join("\n\n");
  const combinedJs = jsParts.map((part) => part.trim()).join("\n\n");
  const result = await transform(combinedJs, {
    charset: "utf8",
    format: "iife",
    legalComments: "none",
    loader: "js",
    minify: false,
    sourcefile: "cicpa-review-app.js",
    target: "es2020"
  });

  const cssMarker = "/* __CPA_INLINE_CSS__ */";
  const jsMarker = "/* __CPA_INLINE_APP__ */";
  const revenueNotesMarker = "/* __CPA_REVENUE_NOTES__ */";
  if (!template.includes(cssMarker) || !template.includes(jsMarker) || !template.includes(revenueNotesMarker)) {
    throw new Error("模板缺少内联 CSS 或 JavaScript 占位符。");
  }

  return template
    .replace(cssMarker, css)
    .replace(revenueNotesMarker, `window.markdownSections = ${JSON.stringify({ ...otherNotes, ...revenueNotes, ...financialNotes.notes })};\nwindow.studyData.entries.push(...${JSON.stringify(financialNotes.entries)});`)
    .replace(jsMarker, result.code.trimEnd())
    .replace(/\r\n/g, "\n");
}

const output = await buildPage();
if (process.argv.includes("--check")) {
  const current = (await readFile(outputPath, "utf8")).replace(/\r\n/g, "\n");
  if (current !== output) {
    console.error("生成文件不是最新版本，请运行 npm run build。");
    process.exitCode = 1;
  } else {
    console.log("生成文件与模块化源码一致。");
  }
} else {
  await writeFile(outputPath, output, "utf8");
  console.log(`已生成 ${path.relative(process.cwd(), outputPath)}`);
}
