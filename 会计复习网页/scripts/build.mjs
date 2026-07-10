import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { transform } from "esbuild";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const pageDir = path.resolve(scriptDir, "..");
const sourceDir = path.join(pageDir, "src");
const outputPath = path.join(pageDir, "CICPA会计复习手册.html");

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
  const [template, cssParts, jsParts] = await Promise.all([
    readFile(path.join(sourceDir, "template.html"), "utf8"),
    readModules(cssModules),
    readModules(jsModules)
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
  if (!template.includes(cssMarker) || !template.includes(jsMarker)) {
    throw new Error("模板缺少内联 CSS 或 JavaScript 占位符。");
  }

  return template
    .replace(cssMarker, css)
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
