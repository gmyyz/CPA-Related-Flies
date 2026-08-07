import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { loadSource, pageDir, sourceDir } from "./helpers/load-source.mjs";

test("study data has unique IDs, required fields, and chapter coverage", async () => {
  const dataSource = await readFile(path.join(pageDir, "study-data.js"), "utf8");
  const dataContext = vm.createContext({ window: {} });
  vm.runInContext(dataSource, dataContext);
  const entries = dataContext.window.studyData?.entries;
  assert.ok(Array.isArray(entries));
  assert.equal(entries.length, 196);
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
    { document, window: {}, Set, Map }
  );
  const coveredTopics = new Set(api.chapterDefinitions.flatMap((chapter) => chapter.topics));
  const missingTopics = [...new Set(entries.map((entry) => entry.topic))].filter((topic) => !coveredTopics.has(topic));
  assert.deepEqual(missingTopics, []);
});

test("generated page contains the required offline contracts", async () => {
  const html = await readFile(path.join(pageDir, "CICPA会计复习手册.html"), "utf8");
  assert.match(html, /由 npm run build 生成/);
  assert.match(html, /<script src="\.\/study-data\.js"><\/script>/);
  assert.doesNotMatch(html, /__CPA_INLINE_(CSS|APP)__/);
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
});
