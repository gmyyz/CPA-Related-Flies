import test from "node:test";
import assert from "node:assert/strict";
import { createDefaultState, loadSource } from "./helpers/load-source.mjs";

function domainSandbox(overrides = {}) {
  return {
    DAILY_TASK_LIMIT: 18,
    DAY_IN_MS: 24 * 60 * 60 * 1000,
    REVIEW_INTERVAL_DAYS: 7,
    chapterDefinitions: [{ id: "全部", title: "全部章节", topics: [] }],
    chapters: [{ id: "全部", title: "全部章节", topics: [] }],
    defaultState: createDefaultState(),
    difficultyRank: { 高频易错: 3, 高频提高: 2, 高频基础: 1 },
    getDeviceId: () => "device-test",
    hiddenTags: new Set(["Markdown同步"]),
    persistProgress: () => {},
    progressState: {},
    renderResults: () => {},
    scheduleCloudAutoPush: () => {},
    state: createDefaultState(),
    studyData: { updatedAt: "2026-07-07" },
    ...overrides
  };
}

test("progress merge keeps the newest record and the latest review time", async () => {
  const { api } = await loadSource(
    ["js/domain/review.js", "js/domain/progress.js"],
    ["mergeProgressStates"],
    domainSandbox()
  );
  const local = {
    card: { status: "weak", favorite: false, reviewedAt: "2026-07-01T00:00:00.000Z", updatedAt: "2026-07-01T00:00:00.000Z" }
  };
  const remote = {
    card: { status: "known", favorite: true, reviewedAt: "2026-07-02T00:00:00.000Z", updatedAt: "2026-07-02T00:00:00.000Z" }
  };
  const { merged, changed } = api.mergeProgressStates(local, remote);
  assert.equal(merged.card.status, "known");
  assert.equal(merged.card.favorite, true);
  assert.equal(merged.card.reviewedAt, "2026-07-02T00:00:00.000Z");
  assert.equal(changed, 1);
});

test("equal-time progress merge preserves favorite from either device", async () => {
  const { api } = await loadSource(
    ["js/domain/review.js", "js/domain/progress.js"],
    ["mergeProgressStates"],
    domainSandbox()
  );
  const timestamp = "2026-07-01T00:00:00.000Z";
  const { merged } = api.mergeProgressStates(
    { card: { status: "weak", favorite: false, reviewedAt: timestamp, updatedAt: timestamp } },
    { card: { status: "weak", favorite: true, reviewedAt: timestamp, updatedAt: timestamp } }
  );
  assert.equal(merged.card.favorite, true);
});

test("progress payload keeps the public version-one contract", async () => {
  const { api } = await loadSource(
    ["js/domain/review.js", "js/domain/progress.js"],
    ["buildProgressPayload", "parseProgressPayload"],
    domainSandbox()
  );
  const payload = api.buildProgressPayload({ card: { status: "known", favorite: false } });
  assert.equal(payload.version, 1);
  assert.equal(payload.app, "cicpa-review-handbook");
  assert.equal(payload.deviceId, "device-test");
  assert.equal(payload.dataUpdatedAt, "2026-07-07");
  assert.equal(payload.progress.card.status, "known");
  assert.deepEqual(api.parseProgressPayload('{"legacy":{"status":"weak"}}').progress.legacy.status, "weak");
});

test("daily task ordering prioritizes weak then stale then high-risk entries", async () => {
  const now = Date.now();
  const progressState = {
    weak: { status: "weak", reviewedAt: new Date(now).toISOString() },
    stale: { status: "new", reviewedAt: new Date(now - 8 * 24 * 60 * 60 * 1000).toISOString() },
    risk: { status: "new", reviewedAt: "" }
  };
  const { api } = await loadSource(
    ["js/domain/review.js", "js/domain/progress.js"],
    ["sortDailyTaskEntries"],
    domainSandbox({ progressState })
  );
  const entries = [
    { id: "risk", difficulty: "高频易错", updatedAtValue: 1, order: 2 },
    { id: "stale", difficulty: "高频基础", updatedAtValue: 1, order: 1 },
    { id: "weak", difficulty: "高频基础", updatedAtValue: 1, order: 0 }
  ];
  assert.deepEqual(Array.from(api.sortDailyTaskEntries(entries), (entry) => entry.id), ["weak", "stale", "risk"]);
});

test("journal parsing normalizes structured lines and auto-extracts code blocks", async () => {
  const { api } = await loadSource(
    ["js/domain/review.js", "js/domain/journal.js"],
    ["parseJournalBodyLines", "extractJournalEntriesFromText", "getJournalAccounts"],
    domainSandbox()
  );
  const body = "借：银行存款  100\n贷：主营业务收入  100";
  const lines = api.parseJournalBodyLines(body);
  assert.equal(lines.length, 2);
  assert.equal(lines[0].side, "借");
  assert.equal(lines[1].account, "主营业务收入");
  assert.deepEqual(Array.from(api.getJournalAccounts({ lines })), ["银行存款", "主营业务收入"]);
  const extracted = api.extractJournalEntriesFromText(`【确认收入】\n\`\`\`text\n${body}\n\`\`\``);
  assert.equal(extracted.length, 1);
  assert.equal(extracted[0].title, "确认收入");
  assert.equal(extracted[0].source, "auto");
});

test("URL state reads and writes the existing query contract", async () => {
  const defaultState = createDefaultState();
  const state = createDefaultState();
  const storage = new Map();
  let replacedUrl = "";
  const window = {
    location: { pathname: "/CICPA会计复习手册.html", search: "?q=%E6%94%B6%E5%85%A5&view=journal&journal=1&jside=%E5%80%9F" },
    localStorage: {
      getItem: (key) => storage.get(key) || null,
      setItem: (key, value) => storage.set(key, value)
    },
    history: { replaceState: (_state, _title, url) => { replacedUrl = url; } }
  };
  const { api } = await loadSource(
    ["js/domain/review.js", "js/domain/progress.js", "js/app/state.js"],
    ["readUrlState", "readSavedState", "syncPersistence", "mergedEntryAliases"],
    domainSandbox({
      STORAGE_KEY: "cicpa-review-state",
      defaultState,
      state,
      window,
      restoreSessionButton: { hidden: true },
      searchInput: {}, sortSelect: {}, quizModeCheckbox: {}, contentTitle: {}, contentSubtitle: {}, modeTip: {},
      viewModeButtons: [], mobileActionButtons: [], chapters: [{ id: "全部", topics: [] }], topics: ["全部"], tags: ["全部"]
    })
  );
  Object.assign(state, api.readUrlState());
  assert.equal(state.search, "收入");
  assert.equal(state.viewMode, "journal");
  assert.equal(state.journalSide, "借");
  api.syncPersistence();
  assert.match(replacedUrl, /view=journal/);
  assert.match(replacedUrl, /journal=1/);
  assert.match(replacedUrl, /jside=/);
  for (const [oldId, targetId] of Object.entries(api.mergedEntryAliases)) {
    window.location.search = `?view=cards&random=${encodeURIComponent(oldId)}&source=legacy`;
    const fromUrl = api.readUrlState();
    assert.equal(fromUrl.randomEntryId, targetId);
    assert.equal(fromUrl.randomEntrySource, "legacy");
    storage.set("cicpa-review-state", JSON.stringify({ randomEntryId: oldId }));
    assert.equal(api.readSavedState().randomEntryId, targetId);
    Object.assign(state, fromUrl);
    api.syncPersistence();
    assert.equal(new URL(replacedUrl, "https://example.test").searchParams.get("random"), targetId);
  }
  window.location.search = "?random=unknown-entry";
  assert.equal(api.readUrlState().randomEntryId, "unknown-entry");
  window.location.search = "?random=constructor";
  assert.equal(api.readUrlState().randomEntryId, "constructor");

});

test("Gist service writes the versioned progress file without calling the real API", async () => {
  const requests = [];
  const cloudSyncState = { gistId: "gist-test" };
  const fetch = async (url, options) => {
    requests.push({ url, options });
    return {
      ok: true,
      json: async () => ({ id: "gist-test", files: {} })
    };
  };
  const { api } = await loadSource(
    ["js/services/cloud-sync.js"],
    ["writeRemoteProgressPayload"],
    {
      CLOUD_SYNC_STORAGE_KEY: "cicpa-review-cloud-sync",
      GIST_PROGRESS_FILENAME: "cicpa-review-progress.json",
      cloudSessionToken: "token-test",
      cloudSyncState,
      fetch,
      window: {
        localStorage: {
          setItem: () => {}
        }
      },
      parseDate: (value) => Date.parse(value),
      gistTokenInput: { value: "" },
      gistIdInput: { value: "" },
      gistAutoSyncCheckbox: { checked: false },
      cloudSyncStatus: {
        textContent: "",
        classList: { toggle: () => {} }
      }
    }
  );
  await api.writeRemoteProgressPayload({ version: 1, progress: {} });
  assert.equal(requests.length, 1);
  assert.equal(requests[0].url, "https://api.github.com/gists/gist-test");
  assert.equal(requests[0].options.method, "PATCH");
  assert.equal(requests[0].options.headers.Authorization, "Bearer token-test");
  const body = JSON.parse(requests[0].options.body);
  assert.equal(JSON.parse(body.files["cicpa-review-progress.json"].content).version, 1);
});

test("retired cards migrate without losing favorites or newest study state", async () => {
  const { api } = await loadSource(["js/domain/review.js", "js/domain/progress.js"],
    ["normalizeProgressState", "mergedEntryAliases"], domainSandbox());
  for (const [oldId, targetId] of Object.entries(api.mergedEntryAliases)) {
    const records = {
      [targetId]: { status: "known", favorite: false, reviewedAt: "2026-09-08", updatedAt: "2026-09-08" },
      [oldId]: { status: "weak", favorite: true, reviewedAt: "2026-09-07", updatedAt: "2026-09-07" }
    };
    const migrated = api.normalizeProgressState(records);
    assert.equal(migrated[oldId], undefined);
    assert.equal(migrated[targetId].status, "known");
    assert.equal(migrated[targetId].favorite, true);
    assert.equal(migrated[targetId].reviewedAt, "2026-09-08");
    assert.deepEqual(migrated, api.normalizeProgressState(migrated));
    assert.deepEqual(migrated, api.normalizeProgressState(Object.fromEntries(Object.entries(records).reverse())));
    records[oldId].updatedAt = "2026-09-09";
    assert.equal(api.normalizeProgressState(records)[targetId].status, "weak");
  }
});
