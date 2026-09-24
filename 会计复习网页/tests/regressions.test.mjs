import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { readFile } from "node:fs/promises";
import { loadSource } from "./helpers/load-source.mjs";
import { serializeInlineJson } from "../scripts/inline-json.mjs";
import { renderStudyData } from "../scripts/build-study-data.mjs";
import { indexOrderedEntries } from "../data/validate-entry-order.mjs";

// Minimal DOM double for the actual renderCards event wiring (no extracted callback copies).
function node(dataset = {}) {
  const children = new Map();
  const classes = new Set();
  const listeners = {};
  return {
    dataset, hidden: false, textContent: "",
    classList: { toggle(name, active) { active ? classes.add(name) : classes.delete(name); }, contains: (name) => classes.has(name) },
    querySelector(selector) { if (!children.has(selector)) children.set(selector, node()); return children.get(selector); },
    querySelectorAll() { return []; },
    setAttribute() {}, appendChild() {},
    addEventListener(event, callback) { listeners[event] = callback; },
    click() { listeners.click(); }
  };
}

test("rendered mastery buttons toggle repeatedly in both directions without rerendering", async () => {
  for (const initialStatus of ["new", "known", "weak"]) {
    for (const initialFavorite of [false, true]) {
      const fragment = node();
      const buttons = Object.fromEntries(["known", "weak", "favorite", "reviewed"].map((action) => [action, node({ masteryAction: action })]));
      fragment.querySelectorAll = (selector) => selector === "[data-mastery-action]" ? Object.values(buttons) : [];
      const article = fragment.querySelector(".qa-card");
      const baseQuery = article.querySelector.bind(article);
      article.querySelector = (selector) => buttons[selector.match(/data-mastery-action="(.*?)"/)?.[1]] || baseQuery(selector);
      const cardList = node();
      cardList.querySelector = () => article;
      const progressState = { card: { status: initialStatus, favorite: initialFavorite, reviewedAt: "" } };
      const entry = { id: "card", summary: "", conclusion: [], reasoning: [], memory: [], pitfalls: [], journalEntries: [], tags: [] };
      let renders = 0;
      const { api } = await loadSource(["js/domain/progress.js", "js/ui/cards.js"], ["renderCards"], {
        progressState, cardList, cardTemplate: { content: { cloneNode: () => fragment } },
        uiState: { expandedIds: new Set() }, state: {}, studyData: { entries: [entry] }, window: {},
        normalizeText: (s) => s, clearNode() {}, appendInlineMarkdown() {}, formatReviewDate: () => "",
        persistProgress() {}, scheduleCloudAutoPush() {}, isDashboardView: () => false,
        renderResults() { renders++; }, renderMermaidDiagrams() {}
      });
      api.renderCards([entry]);
      for (const action of ["known", "weak", "known", "favorite"]) {
        for (let i = 0; i < 3; i++) {
          const previous = progressState.card;
          buttons[action].click();
          const active = action === "favorite" ? !previous.favorite : previous.status !== action;
          assert.equal(action === "favorite" ? progressState.card.favorite : progressState.card.status, action === "favorite" ? active : active ? action : "new");
          assert.equal(buttons[action].classList.contains("active"), active);
        }
      }
      assert.equal(renders, 0);
    }
  }
});

test("failed progress persistence remains visible until a successful retry saves the latest state", async () => {
  const warning = node(); warning.hidden = true;
  const retry = node();
  let fail = true;
  let stored;
  const progressState = { card: { status: "known" } };
  const { api } = await loadSource(["js/services/cloud-sync.js"], ["persistProgress"], {
    document: { querySelector: (selector) => selector === "#progress-save-warning" ? warning : retry },
    PROGRESS_STORAGE_KEY: "progress", progressState,
    window: { localStorage: { setItem(key, value) { if (fail) throw new Error("Quota exceeded"); stored = value; } } }
  });
  assert.equal(api.persistProgress(), false);
  assert.equal(warning.hidden, false);
  assert.equal(progressState.card.status, "known");
  retry.click();
  assert.equal(warning.hidden, false);
  progressState.card.status = "weak";
  fail = false;
  retry.click();
  assert.equal(warning.hidden, true);
  assert.equal(JSON.parse(stored).card.status, "weak");
});

test("inline JSON preserves dangerous script text without HTML delimiters", () => {
  const text = '</ScRiPt><script>throw 1</script><!--<script>中文<&';
  for (const payload of [{ note: text }, [{ id: "card", question: text }]]) {
    const encoded = serializeInlineJson(payload);
    assert.equal(encoded.includes("<"), false);
    assert.deepEqual(JSON.parse(encoded), payload);
    const context = vm.createContext({});
    vm.runInContext(`globalThis.result = ${encoded};`, context);
    assert.equal(JSON.stringify(context.result), JSON.stringify(payload));
  }
  const source = renderStudyData({ updatedAt: "today", entries: [{ id: "card", topic: text, question: text, summary: text, tags: [] }] });
  assert.equal(source.includes("<"), false);
});

test("entry order rejects omitted, unknown and duplicate cards before Map can hide them", () => {
  const entries = [{ id: "a" }, { id: "b" }];
  assert.throws(() => indexOrderedEntries(entries, ["a"]), /遗漏卡片：b/);
  assert.throws(() => indexOrderedEntries(entries, ["a", "b", "c"]), /不存在的卡片：c/);
  assert.throws(() => indexOrderedEntries(entries, ["a", "b", "b"]), /entryOrder ID 重复：b/);
  assert.throws(() => indexOrderedEntries([...entries, { id: "a" }], ["a", "b"]), /专题卡片 ID 重复：a/);
  assert.equal(indexOrderedEntries(entries, ["b", "a"]).size, 2);
});

test("generated HTML embeds both notes and financial entries as safe executable JSON", async () => {
  const html = await readFile(new URL("../CICPA会计复习手册.html", import.meta.url), "utf8");
  const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script\s*>/gi)].map((match) => match[1]);
  const dataScript = scripts.find((source) => source.includes("window.studyData ="));
  const notesScript = scripts.find((source) => source.includes("window.markdownSections ="));
  assert.ok(dataScript);
  assert.ok(notesScript);
  const notesAssignments = notesScript.match(/window\.markdownSections = [^\n]+\nwindow\.studyData\.entries\.push[^\n]+/)?.[0];
  assert.ok(notesAssignments);
  assert.equal(notesAssignments.includes("<"), false);
  const context = vm.createContext({ window: {} });
  vm.runInContext(dataScript, context);
  vm.runInContext(notesAssignments, context);
  assert.equal(context.window.studyData.entries.length, 258);
  assert.ok(Object.keys(context.window.markdownSections).length > 0);
});
