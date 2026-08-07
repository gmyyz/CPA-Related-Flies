function reconcileViewState() {
  state.viewMode = normalizeViewMode(state.viewMode);
  if (state.journalMode) {
    state.viewMode = "journal";
  }
  state.journalMode = state.viewMode === "journal";
}
function setState(patch, options = {}) {
  const hasStateChanges = Object.keys(patch).some((key) => state[key] !== patch[key]);
  const shouldClearRandom = options.clearRandom !== false && patch.randomEntryId === void 0;
  if (!hasStateChanges && !(shouldClearRandom && state.randomEntryId !== null)) {
    return;
  }
  Object.assign(state, patch);
  if (options.resetCardLimit !== false) {
    uiState.cardLimit = CARD_PAGE_SIZE;
  }
  reconcileViewState();
  if (shouldClearRandom) {
    state.randomEntryId = null;
    state.randomEntrySource = "";
  }
  syncControls();
  updateActiveFilterButtons();
  syncPersistence();
  renderResults();
}
function statesEqual(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}
function sanitizeStatePatch(rawState = {}) {
  const nextState = {
    viewMode: normalizeViewMode(rawState.viewMode),
    search: typeof rawState.search === "string" ? rawState.search : defaultState.search,
    chapter: typeof rawState.chapter === "string" ? rawState.chapter : defaultState.chapter,
    topic: typeof rawState.topic === "string" ? rawState.topic : defaultState.topic,
    tag: typeof rawState.tag === "string" ? rawState.tag : defaultState.tag,
    reviewFilter: typeof rawState.reviewFilter === "string" ? rawState.reviewFilter : defaultState.reviewFilter,
    sort: typeof rawState.sort === "string" ? rawState.sort : defaultState.sort,
    quizMode: typeof rawState.quizMode === "boolean" ? rawState.quizMode : defaultState.quizMode,
    journalMode: typeof rawState.journalMode === "boolean" ? rawState.journalMode : defaultState.journalMode,
    journalSearch: typeof rawState.journalSearch === "string" ? rawState.journalSearch : defaultState.journalSearch,
    journalSide: typeof rawState.journalSide === "string" ? rawState.journalSide : defaultState.journalSide,
    journalAccount: typeof rawState.journalAccount === "string" ? rawState.journalAccount : defaultState.journalAccount,
    journalSource: typeof rawState.journalSource === "string" ? rawState.journalSource : defaultState.journalSource,
    randomEntryId: typeof rawState.randomEntryId === "string" ? rawState.randomEntryId : defaultState.randomEntryId,
    randomEntrySource: typeof rawState.randomEntrySource === "string" ? rawState.randomEntrySource : defaultState.randomEntrySource
  };
  if (nextState.journalMode) {
    nextState.viewMode = "journal";
  }
  nextState.journalMode = nextState.viewMode === "journal";
  return nextState;
}
function readUrlState() {
  const urlState = {};
  const params = new URLSearchParams(window.location.search);
  if (params.has("q")) {
    urlState.search = normalizeText(params.get("q"));
  }
  if (params.has("topic")) {
    urlState.topic = params.get("topic");
  }
  if (params.has("chapter")) {
    urlState.chapter = params.get("chapter");
  }
  if (params.has("tag")) {
    urlState.tag = params.get("tag");
  }
  if (params.has("review")) {
    urlState.reviewFilter = params.get("review");
  }
  if (params.has("sort")) {
    urlState.sort = params.get("sort");
  }
  if (params.has("view")) {
    urlState.viewMode = params.get("view");
  }
  if (params.has("quiz")) {
    urlState.quizMode = params.get("quiz") === "1";
  }
  if (params.has("journal")) {
    urlState.journalMode = params.get("journal") === "1";
  }
  if (params.has("jq")) {
    urlState.journalSearch = normalizeText(params.get("jq"));
  }
  if (params.has("jside")) {
    urlState.journalSide = params.get("jside");
  }
  if (params.has("jaccount")) {
    urlState.journalAccount = params.get("jaccount");
  }
  if (params.has("jsource")) {
    urlState.journalSource = params.get("jsource");
  }
  if (params.has("random")) {
    urlState.randomEntryId = params.get("random");
  }
  if (params.has("source")) {
    urlState.randomEntrySource = params.get("source");
  }
  return sanitizeStatePatch(urlState);
}
function readSavedState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? sanitizeStatePatch(JSON.parse(raw)) : sanitizeStatePatch();
  } catch (error) {
    return sanitizeStatePatch();
  }
}
function hasUrlFilters() {
  return new URLSearchParams(window.location.search).toString().length > 0;
}
function updateRestoreSessionButton() {
  const hasUrlState = hasUrlFilters();
  const savedState = readSavedState();
  const hasSavedFilters = !statesEqual({ ...defaultState }, { ...defaultState, ...savedState });
  const shouldShowRestore = !hasUrlState && hasSavedFilters && !statesEqual(state, { ...defaultState, ...savedState });
  restoreSessionButton.hidden = !shouldShowRestore;
}
function syncPersistence() {
  const serializableState = {
    search: state.search,
    chapter: state.chapter,
    topic: state.topic,
    tag: state.tag,
    reviewFilter: state.reviewFilter,
    sort: state.sort,
    viewMode: state.viewMode,
    quizMode: state.quizMode,
    journalMode: state.journalMode,
    journalSearch: state.journalSearch,
    journalSide: state.journalSide,
    journalAccount: state.journalAccount,
    journalSource: state.journalSource,
    randomEntryId: state.randomEntryId,
    randomEntrySource: state.randomEntrySource
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(serializableState));
  } catch (error) {
  }
  const params = new URLSearchParams();
  if (state.search) {
    params.set("q", state.search);
  }
  if (state.chapter !== "全部") {
    params.set("chapter", state.chapter);
  }
  if (state.topic !== "全部") {
    params.set("topic", state.topic);
  }
  if (state.tag !== "全部") {
    params.set("tag", state.tag);
  }
  if (state.reviewFilter !== "全部") {
    params.set("review", state.reviewFilter);
  }
  if (state.sort !== "default") {
    params.set("sort", state.sort);
  }
  if (state.viewMode !== defaultState.viewMode) {
    params.set("view", state.viewMode);
  }
  if (state.quizMode) {
    params.set("quiz", "1");
  }
  if (isJournalView()) {
    params.set("journal", "1");
    if (state.journalSearch) {
      params.set("jq", state.journalSearch);
    }
    if (state.journalSide !== "全部") {
      params.set("jside", state.journalSide);
    }
    if (state.journalAccount !== "全部") {
      params.set("jaccount", state.journalAccount);
    }
    if (state.journalSource !== "全部") {
      params.set("jsource", state.journalSource);
    }
  }
  if (state.randomEntryId) {
    params.set("random", state.randomEntryId);
    if (state.randomEntrySource) {
      params.set("source", state.randomEntrySource);
    }
  }
  const query = params.toString();
  const nextUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname;
  window.history.replaceState(null, "", nextUrl);
  updateRestoreSessionButton();
}
function syncControls() {
  reconcileViewState();
  searchInput.value = state.search;
  sortSelect.value = state.sort;
  quizModeCheckbox.checked = state.quizMode;
  const titles = {
    dashboard: ["学习看板", "用数据先判断今天该复习哪里，再进入卡片或分录速查。"],
    cards: ["知识卡片", "按复习场景进入卡片，标记掌握度后会自动形成弱项清单。"],
    journal: ["分录速查", "按科目、借贷方向和关键词快速定位分录，必要时回到来源知识点。"]
  };
  contentTitle.textContent = titles[state.viewMode][0];
  contentSubtitle.textContent = titles[state.viewMode][1];
  viewModeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.viewMode === state.viewMode);
    button.setAttribute("aria-pressed", String(button.dataset.viewMode === state.viewMode));
  });
  mobileActionButtons.forEach((button) => {
    const action = button.dataset.mobileAction;
    const isActive = action === state.viewMode || action === "journal" && isJournalView();
    button.classList.toggle("active", isActive);
  });
  modeTip.textContent = isJournalView() ? "分录库会自动汇总当前筛选范围内的分录；搜索和科目筛选只影响分录视图。" : isDashboardView() ? "看板统计会跟随左侧筛选变化；点击任务、章节或科目可直接跳入对应工作流。" : state.quizMode ? "自测模式下默认隐藏摘要和解析，先自己作答，再点按钮揭晓。" : "默认显示摘要，点击卡片按钮可展开完整解析；标记掌握度后可按弱项清单复习。";
}
function validateState() {
  if (!chapters.some((chapter) => chapter.id === state.chapter)) {
    state.chapter = "全部";
  }
  if (!topics.includes(state.topic)) {
    state.topic = "全部";
  }
  if (state.topic !== "全部") {
    const chapter = getChapterById(state.chapter);
    if (chapter?.id !== "全部" && !chapter.topics.includes(state.topic)) {
      state.chapter = getChapterForTopic(state.topic)?.id || "全部";
    }
  }
  if (!tags.includes(state.tag)) {
    state.tag = "全部";
  }
  const allowedReviewFilters = /* @__PURE__ */ new Set(["全部", "daily", "unreviewed", "weak", "high-risk", "stale", "favorite-open"]);
  if (!allowedReviewFilters.has(state.reviewFilter)) {
    state.reviewFilter = "全部";
  }
  const allowedSorts = /* @__PURE__ */ new Set(["default", "updated-desc", "reviewed-desc", "reviewed-asc", "question-asc"]);
  if (!allowedSorts.has(state.sort)) {
    state.sort = "default";
  }
  state.viewMode = normalizeViewMode(state.viewMode);
  state.journalMode = state.viewMode === "journal";
  const allowedJournalSides = /* @__PURE__ */ new Set(["全部", "借", "贷"]);
  if (!allowedJournalSides.has(state.journalSide)) {
    state.journalSide = "全部";
  }
  const allowedJournalSources = /* @__PURE__ */ new Set(["全部", "manual", "auto"]);
  if (!allowedJournalSources.has(state.journalSource)) {
    state.journalSource = "全部";
  }
  const journalAccounts = new Set(getJournalItems(studyData.entries).flatMap((item) => item.accounts));
  if (state.journalAccount !== "全部" && !journalAccounts.has(state.journalAccount)) {
    state.journalAccount = "全部";
  }
  if (state.randomEntryId && !studyData.entries.some((entry) => entry.id === state.randomEntryId)) {
    state.randomEntryId = null;
  }
}
function initializeData(rawData) {
  if (!rawData || !Array.isArray(rawData.entries)) {
    throw new Error("study-data.js 中没有找到有效的 entries 数组。");
  }
  const toText = (value, fallback = "") => String(value ?? fallback).trim();
  const toList = (value) => Array.isArray(value) ? value.map((item) => String(item ?? "").trim()).filter(Boolean) : [];
  studyData = {
    updatedAt: toText(rawData.updatedAt, "-") || "-",
    entries: rawData.entries.map((entry, index) => {
      const normalizedEntry = {
        ...entry,
        id: toText(entry?.id, `entry-${index + 1}`) || `entry-${index + 1}`,
        updatedAt: toText(entry?.updatedAt),
        topic: toText(entry?.topic, "未分类") || "未分类",
        difficulty: toText(entry?.difficulty, "未标记") || "未标记",
        question: toText(entry?.question, `未命名知识点 ${index + 1}`) || `未命名知识点 ${index + 1}`,
        summary: toText(entry?.summary, "暂未提供摘要。") || "暂未提供摘要。",
        conclusion: toList(entry?.conclusion),
        reasoning: toList(entry?.reasoning),
        memory: toList(entry?.memory),
        pitfalls: toList(entry?.pitfalls),
        tags: toList(entry?.tags),
        journalEntries: normalizeJournalEntries(entry?.journalEntries),
        diagram: toText(entry?.diagram)
      };
      normalizedEntry.journalEntries = [
        ...normalizedEntry.journalEntries,
        ...buildAutoJournalEntries(normalizedEntry)
      ];
      if (normalizedEntry.journalEntries.length > 0 && !normalizedEntry.tags.includes("分录")) {
        normalizedEntry.tags.push("分录");
      }
      const updatedValue = normalizedEntry.updatedAt || rawData.updatedAt || "-";
      const searchIndex = normalizeText([
        normalizedEntry.question,
        normalizedEntry.summary,
        ...normalizedEntry.conclusion,
        ...normalizedEntry.reasoning,
        ...normalizedEntry.memory,
        ...normalizedEntry.pitfalls,
        ...normalizedEntry.journalEntries.map(getJournalText),
        normalizedEntry.diagram || "",
        ...normalizedEntry.tags,
        normalizedEntry.topic,
        normalizedEntry.difficulty
      ].join(" "));
      return {
        ...normalizedEntry,
        order: index,
        updatedAt: updatedValue,
        updatedAtValue: parseDate(updatedValue),
        searchIndex
      };
    })
  };
}
