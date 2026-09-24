import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { serializeInlineJson } from "./inline-json.mjs";
import { studyData } from "../data/index.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const pageDir = path.resolve(scriptDir, "..");
const outputPath = path.join(pageDir, "study-data.js");

function validateStudyData(data) {
  if (!data || typeof data.updatedAt !== "string" || !Array.isArray(data.entries)) {
    throw new Error("data/index.mjs 必须导出包含 updatedAt 和 entries 的 studyData。");
  }

  const ids = new Set();
  data.entries.forEach((entry) => {
    if (!entry?.id || typeof entry.topic !== "string" || typeof entry.question !== "string" || typeof entry.summary !== "string" || !Array.isArray(entry.tags)) {
      throw new Error(`卡片字段不完整：${entry?.id || "未知 ID"}`);
    }
    if (ids.has(entry.id)) {
      throw new Error(`卡片 ID 重复：${entry.id}`);
    }
    ids.add(entry.id);
  });
}

export function renderStudyData(data = studyData) {
  validateStudyData(data);
  return `// 此文件由 data/ 专题源自动生成；请编辑 data/topics/ 和 data/index.mjs，勿直接修改。\nwindow.studyData = ${serializeInlineJson(data, 2)};\n`;
}

export async function syncStudyData({ check = false } = {}) {
  const output = renderStudyData();
  if (check) {
    const current = await readFile(outputPath, "utf8");
    if (current !== output) {
      throw new Error("study-data.js 不是最新版本，请运行 npm run data:build 或 npm run build。");
    }
    return;
  }
  await writeFile(outputPath, output, "utf8");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    await syncStudyData({ check: process.argv.includes("--check") });
    console.log(process.argv.includes("--check") ? "study-data.js 与专题源一致。" : "已生成 study-data.js。");
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
