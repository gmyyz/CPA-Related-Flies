function renderResults() {
  if (!studyData) {
    return;
  }
  document.body.dataset.view = state.viewMode;
  const filteredEntries = getFilteredEntries();
  entryCount.textContent = `${studyData.entries.length} 个知识点`;
  updatedAt.textContent = `更新时间 ${studyData.updatedAt}`;
  if (state.randomEntryId && !filteredEntries.some((entry) => entry.id === state.randomEntryId)) {
    state.randomEntryId = null;
    state.randomEntrySource = "";
    syncPersistence();
  }
  const visibleEntries = getVisibleEntries(filteredEntries);
  const cardEntries = isCardsView() && !state.randomEntryId
    ? visibleEntries.slice(0, uiState.cardLimit)
    : visibleEntries;
  const entriesForView = isCardsView() ? cardEntries : visibleEntries;
  renderResultsMeta(filteredEntries, entriesForView, visibleEntries.length);
  if (entriesForView.length === 0) {
    renderEmptyState("没有找到匹配内容", "试试清空筛选，或者换一个关键词。");
    return;
  }
  if (isJournalView()) {
    renderJournalLibrary(visibleEntries);
    return;
  }
  if (isDashboardView()) {
    renderDashboard(filteredEntries);
    return;
  }
  renderCards(cardEntries, visibleEntries.length);
}
function initializeFilters() {
  chapters = buildChapterOptions(studyData.entries);
  topics = uniqueValues(studyData.entries.map((entry) => entry.topic));
  const keywordTagItems = buildTagItems(studyData.entries);
  const pitfallTagItems = buildTagItems(
    studyData.entries.filter((entry) => entry.difficulty === "高频易错")
  );
  tags = uniqueValues([
    ...studyData.entries.map((entry) => entry.topic),
    ...studyData.entries.map((entry) => entry.difficulty),
    ...studyData.entries.flatMap((entry) => entry.tags)
  ]).filter((tag) => !hiddenTags.has(tag));
  tagGroups = [
    { id: "keywords", title: "常用关键词", items: keywordTagItems, collapsedLimit: TAG_GROUP_COLLAPSED_LIMIT },
    { id: "pitfalls", title: "高频易错", items: pitfallTagItems, collapsedLimit: 6 }
  ].filter((group) => group.items.length > 0);
  uiState.expandedTagGroups.clear();
  renderChapterFilters();
  renderGroupedTagFilters();
}
function pickRandomEntry() {
  const candidates = getFilteredEntries();
  if (candidates.length === 0) {
    renderEmptyState("没有可抽取的题目", "先放宽筛选条件，再试一次随机抽题。");
    return;
  }
  const pickedEntry = candidates[Math.floor(Math.random() * candidates.length)];
  uiState.expandedIds.delete(pickedEntry.id);
  setState({ viewMode: "cards", journalMode: false, randomEntryId: pickedEntry.id, randomEntrySource: "random" }, { clearRandom: false });
  window.requestAnimationFrame(() => {
    scrollEntryIntoView(pickedEntry.id);
  });
}
function clearAllFilters() {
  uiState.expandedIds.clear();
  uiState.cardLimit = CARD_PAGE_SIZE;
  const viewMode = state.viewMode;
  Object.assign(state, defaultState, {
    viewMode,
    journalMode: viewMode === "journal"
  });
  syncControls();
  updateActiveFilterButtons();
  syncPersistence();
  renderResults();
}
function bindEvents() {
  advancedSettingsToggle.addEventListener("click", () => {
    const isExpanded = advancedSettingsToggle.getAttribute("aria-expanded") === "true";
    advancedSettingsToggle.setAttribute("aria-expanded", String(!isExpanded));
    advancedSettingsPanel.hidden = isExpanded;
  });
  filterPanelToggle.addEventListener("click", () => {
    const isOpen = controlsPanel.classList.toggle("filter-open");
    filterPanelToggle.setAttribute("aria-expanded", String(isOpen));
  });
  searchInput.addEventListener("input", (event) => {
    const nextSearch = normalizeText(event.target.value);
    window.clearTimeout(searchInputDebounceTimer);
    searchInputDebounceTimer = window.setTimeout(() => {
      setState({ search: nextSearch });
    }, SEARCH_DEBOUNCE_MS);
  });
  sortSelect.addEventListener("change", (event) => {
    setState({ sort: event.target.value });
  });
  quizModeCheckbox.addEventListener("change", (event) => {
    if (!event.target.checked) {
      uiState.expandedIds.clear();
    }
    setState({ quizMode: event.target.checked }, { clearRandom: false });
  });
  clearFiltersButton.addEventListener("click", clearAllFilters);
  randomEntryButton.addEventListener("click", pickRandomEntry);
  viewModeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const viewMode = button.dataset.viewMode;
      setState({
        viewMode,
        journalMode: viewMode === "journal",
        ...(viewMode === "dashboard" ? { reviewFilter: "全部" } : {})
      });
    });
  });
  restoreSessionButton.addEventListener("click", () => {
    const savedState = { ...defaultState, ...readSavedState() };
    uiState.expandedIds.clear();
    setState(savedState, { clearRandom: false });
  });
  saveGistSyncButton.addEventListener("click", () => {
    saveCloudSyncControls();
    const message = !cloudSessionToken ? "已保存 Gist ID。同步前还需要在本次页面中输入 GitHub Token。" : cloudSyncState.gistId ? `已保存连接。最近同步：${formatSyncTime(cloudSyncState.lastSyncedAt)}。` : "已在本次页面暂存 Token。首次推送会自动创建私有 Gist。";
    setCloudSyncStatus(message, cloudSessionToken ? "success" : "");
  });
  syncGistNowButton.addEventListener("click", () => {
    runCloudAction(() => syncCloudProgress());
  });
  pullGistProgressButton.addEventListener("click", () => {
    runCloudAction(() => pullCloudProgress());
  });
  pushGistProgressButton.addEventListener("click", () => {
    runCloudAction(() => pushCloudProgress());
  });
  gistAutoSyncCheckbox.addEventListener("change", () => {
    saveCloudSyncControls();
    setCloudSyncStatus(
      cloudSyncState.autoSync ? "已开启自动同步。打开页面会自动拉取，标记后会延迟推送。" : "已关闭自动同步，需要手动拉取或推送。",
      cloudSyncState.autoSync ? "success" : ""
    );
  });
  reviewFilters.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      setState({ reviewFilter: button.dataset.reviewFilter });
    });
  });
  quickActionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.quickAction;
      uiState.expandedIds.clear();
      if (action === "daily") {
        setState({ viewMode: "cards", journalMode: false, reviewFilter: "daily", sort: "default", quizMode: false });
      }
      if (action === "pitfalls") {
        setState({ viewMode: "cards", journalMode: false, reviewFilter: "high-risk", sort: "updated-desc", quizMode: false });
      }
      if (action === "random-quiz") {
        setState({ viewMode: "cards", journalMode: false, reviewFilter: "daily", sort: "default", quizMode: true }, { clearRandom: false });
        pickRandomEntry();
      }
      if (action === "journal-library") {
        setState({ viewMode: "journal", journalMode: true, quizMode: false });
      }
    });
  });
  mobileActionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.mobileAction;
      if (action === "dashboard") {
        document.body.classList.remove("filters-open");
        setState({ viewMode: "dashboard", journalMode: false, reviewFilter: "全部" });
      }
      if (action === "filters") {
        document.body.classList.toggle("filters-open");
      }
      if (action === "journal") {
        document.body.classList.remove("filters-open");
        setState({ viewMode: "journal", journalMode: true, quizMode: false }, { clearRandom: false });
      }
      if (action === "random") {
        document.body.classList.remove("filters-open");
        pickRandomEntry();
      }
    });
  });
  closeFiltersButton.addEventListener("click", () => {
    document.body.classList.remove("filters-open");
  });
}
function boot() {
  try {
    initializeData(window.studyData);
    progressState = readProgressState();
    cloudSyncState = readCloudSyncState();
    getDeviceId();
    Object.assign(state, readUrlState());
    initializeFilters();
    validateState();
    syncControls();
    syncCloudControls();
    updateActiveFilterButtons();
    bindEvents();
    dataSource.textContent = "数据源 study-data.js";
    updateRestoreSessionButton();
    renderResults();
    if (cloudSyncState.autoSync && hasCloudCredentials()) {
      window.setTimeout(() => {
        runCloudAction(() => pullCloudProgress({ silent: true }));
      }, 600);
    }
  } catch (error) {
    dataSource.textContent = "数据源加载失败";
    renderErrorState(error.message || "请检查 study-data.js 是否存在且格式正确。");
  }
}
