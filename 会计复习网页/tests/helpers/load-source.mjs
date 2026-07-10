import { readFile } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const testsDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
export const pageDir = path.resolve(testsDir, "..");
export const sourceDir = path.join(pageDir, "src");

export async function loadSource(relativeFiles, exportedNames, sandbox = {}) {
  const sources = await Promise.all(relativeFiles.map((file) => readFile(path.join(sourceDir, file), "utf8")));
  const context = vm.createContext({
    console,
    Date,
    Intl,
    JSON,
    Map,
    Math,
    Number,
    Object,
    Set,
    String,
    URLSearchParams,
    ...sandbox
  });
  const exportsSource = exportedNames.map((name) => `${JSON.stringify(name)}: ${name}`).join(",");
  vm.runInContext(`${sources.join("\n")}\nglobalThis.__testApi = {${exportsSource}};`, context);
  return { api: context.__testApi, context };
}

export function createDefaultState() {
  return {
    viewMode: "dashboard",
    search: "",
    chapter: "全部",
    topic: "全部",
    tag: "全部",
    reviewFilter: "全部",
    sort: "default",
    quizMode: false,
    journalMode: false,
    journalSearch: "",
    journalSide: "全部",
    journalAccount: "全部",
    journalSource: "全部",
    randomEntryId: null,
    randomEntrySource: ""
  };
}
