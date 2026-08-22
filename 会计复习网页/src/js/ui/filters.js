function keepActiveChapterVisible() {
  const activeButton = chapterFilters.querySelector(".chapter-button.active");
  if (!activeButton) {
    return;
  }
  const listRect = chapterFilters.getBoundingClientRect();
  const buttonRect = activeButton.getBoundingClientRect();
  if (buttonRect.top < listRect.top) {
    chapterFilters.scrollTop -= listRect.top - buttonRect.top;
  } else if (buttonRect.bottom > listRect.bottom) {
    chapterFilters.scrollTop += buttonRect.bottom - listRect.bottom;
  }
}
function renderChapterFilters() {
  clearNode(chapterFilters);
  chapters.forEach((chapter) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "chapter-button";
    button.dataset.value = chapter.id;
    button.classList.toggle("active", chapter.id === state.chapter);
    const title = document.createElement("span");
    title.textContent = chapter.title;
    button.appendChild(title);
    const count = document.createElement("span");
    count.className = "chapter-count";
    count.textContent = chapter.count;
    button.appendChild(count);
    button.addEventListener("click", () => {
      setState({ chapter: chapter.id, topic: "全部" });
    });
    chapterFilters.appendChild(button);
  });
  keepActiveChapterVisible();
}
function renderGroupedTagFilters() {
  clearNode(tagFilters);
  tagFilters.classList.add("grouped-tags");
  const toolbar = document.createElement("div");
  toolbar.className = "tag-filter-toolbar";
  const resetButton = document.createElement("button");
  resetButton.type = "button";
  resetButton.textContent = "全部标签";
  resetButton.dataset.value = "全部";
  resetButton.className = "chip";
  resetButton.classList.toggle("active", state.tag === "全部");
  resetButton.addEventListener("click", () => setState({ tag: "全部" }));
  toolbar.appendChild(resetButton);
  tagFilters.appendChild(toolbar);
  tagGroups.forEach((group) => {
    const wrapper = document.createElement("div");
    wrapper.className = "tag-group";
    const header = document.createElement("div");
    header.className = "tag-group-header";
    const title = document.createElement("p");
    title.className = "tag-group-title";
    title.textContent = group.title;
    header.appendChild(title);
    const meta = document.createElement("span");
    meta.className = "tag-group-meta";
    meta.textContent = `共 ${group.items.length} 个`;
    header.appendChild(meta);
    wrapper.appendChild(header);
    const list = document.createElement("div");
    list.className = "chip-list";
    const isExpanded = uiState.expandedTagGroups.has(group.id);
    const visibleItems = isExpanded ? [...group.items] : group.items.slice(0, group.collapsedLimit || TAG_GROUP_COLLAPSED_LIMIT);
    if (!isExpanded && state.tag !== "全部") {
      const activeItem = group.items.find((item) => item.value === state.tag);
      if (activeItem && !visibleItems.some((item) => item.value === activeItem.value)) {
        visibleItems.push(activeItem);
      }
    }
    visibleItems.forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = `${item.value} (${item.count})`;
      button.dataset.value = item.value;
      button.className = "chip";
      button.classList.toggle("active", item.value === state.tag);
      button.addEventListener("click", () => setState({ tag: item.value }));
      list.appendChild(button);
    });
    wrapper.appendChild(list);
    if (group.items.length > visibleItems.length || isExpanded) {
      const footer = document.createElement("div");
      footer.className = "tag-group-footer";
      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "tag-toggle";
      toggle.textContent = isExpanded ? "收起" : `展开更多（+${group.items.length - visibleItems.length}）`;
      toggle.addEventListener("click", () => {
        if (isExpanded) {
          uiState.expandedTagGroups.delete(group.id);
        } else {
          uiState.expandedTagGroups.add(group.id);
        }
        renderGroupedTagFilters();
      });
      footer.appendChild(toggle);
      wrapper.appendChild(footer);
    }
    tagFilters.appendChild(wrapper);
  });
}
function updateActiveFilterButtons() {
  chapterFilters.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("active", button.dataset.value === state.chapter);
  });
  keepActiveChapterVisible();
  tagFilters.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("active", button.dataset.value === state.tag);
  });
  reviewFilters.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("active", button.dataset.reviewFilter === state.reviewFilter);
  });
}
function matchesFilters(entry) {
  const chapter = getChapterById(state.chapter);
  const chapterMatch = chapterMatchesEntry(chapter, entry);
  const topicMatch = state.topic === "全部" || entry.topic === state.topic;
  const tagMatch = state.tag === "全部" || entry.topic === state.tag || entry.difficulty === state.tag || entry.tags.includes(state.tag);
  const reviewMatch = matchesReviewFilter(entry);
  const searchMatch = !state.search || entry.searchIndex.includes(state.search);
  return chapterMatch && topicMatch && tagMatch && reviewMatch && searchMatch;
}
function matchesReviewFilter(entry) {
  const progress = getProgress(entry.id);
  if (state.reviewFilter === "daily") {
    return isDailyTask(entry);
  }
  if (state.reviewFilter === "unreviewed") {
    return !getReviewedAtValue(entry);
  }
  if (state.reviewFilter === "weak") {
    return progress.status === "weak";
  }
  if (state.reviewFilter === "high-risk") {
    return entry.difficulty === "高频易错" && progress.status !== "known";
  }
  if (state.reviewFilter === "stale") {
    return isStale(entry);
  }
  if (state.reviewFilter === "favorite-open") {
    return progress.favorite && progress.status !== "known";
  }
  return true;
}
function sortEntries(entries) {
  const nextEntries = [...entries];
  if (state.reviewFilter === "daily" && state.sort === "default") {
    return sortDailyTaskEntries(nextEntries);
  }
  if (state.sort === "updated-desc") {
    nextEntries.sort((left, right) => {
      const updatedGap = right.updatedAtValue - left.updatedAtValue;
      if (updatedGap !== 0) {
        return updatedGap;
      }
      const difficultyGap = (difficultyRank[right.difficulty] || 0) - (difficultyRank[left.difficulty] || 0);
      if (difficultyGap !== 0) {
        return difficultyGap;
      }
      return left.order - right.order;
    });
    return nextEntries;
  }
  if (state.sort === "question-asc") {
    nextEntries.sort((left, right) => left.question.localeCompare(right.question, "zh-CN"));
    return nextEntries;
  }
  if (state.sort === "reviewed-desc") {
    nextEntries.sort((left, right) => {
      const reviewedGap = getReviewedAtValue(right) - getReviewedAtValue(left);
      if (reviewedGap !== 0) {
        return reviewedGap;
      }
      return left.order - right.order;
    });
    return nextEntries;
  }
  if (state.sort === "reviewed-asc") {
    nextEntries.sort((left, right) => {
      const leftReviewed = getReviewedAtValue(left);
      const rightReviewed = getReviewedAtValue(right);
      if (!leftReviewed && rightReviewed) {
        return -1;
      }
      if (leftReviewed && !rightReviewed) {
        return 1;
      }
      const reviewedGap = leftReviewed - rightReviewed;
      if (reviewedGap !== 0) {
        return reviewedGap;
      }
      return left.order - right.order;
    });
    return nextEntries;
  }
  nextEntries.sort((left, right) => left.order - right.order);
  return nextEntries;
}
function getFilteredEntries() {
  const filteredEntries = sortEntries(studyData.entries.filter(matchesFilters));
  return state.reviewFilter === "daily" ? filteredEntries.slice(0, DAILY_TASK_LIMIT) : filteredEntries;
}
function getVisibleEntries(filteredEntries) {
  if (!state.randomEntryId) {
    return filteredEntries;
  }
  const pickedEntry = filteredEntries.find((entry) => entry.id === state.randomEntryId);
  return pickedEntry ? [pickedEntry] : filteredEntries;
}
function renderResultsMeta(filteredEntries, visibleEntries, totalVisibleEntries = visibleEntries.length) {
  clearNode(resultsMeta);
  const visibleJournalItems = isJournalView() ? getFilteredJournalItems(visibleEntries) : [];
  const visibleJournalCount = visibleJournalItems.length;
  const visibleJournalSourceCount = new Set(visibleJournalItems.map((item) => item.entry.id)).size;
  const visibleJournalAccountCount = new Set(visibleJournalItems.flatMap((item) => item.accounts)).size;
  const summary = document.createElement("div");
  summary.textContent = isJournalView() ? `当前分录速查显示 ${visibleJournalCount} 条分录，来自 ${visibleJournalSourceCount} 个知识点，涉及 ${visibleJournalAccountCount} 个科目。` : isDashboardView() ? `看板正在分析 ${filteredEntries.length} / ${studyData.entries.length} 个知识点，统计会随筛选即时更新。` : `当前已加载 ${visibleEntries.length} / ${totalVisibleEntries} 个知识点，筛选结果共 ${filteredEntries.length} 个。`;
  resultsMeta.appendChild(summary);
  const statusRow = document.createElement("div");
  statusRow.className = "status-row";
  if (state.search) {
    statusRow.appendChild(buildStatusPill(`关键词：${state.search}`));
  }
  if (state.chapter !== "全部") {
    const chapter = getChapterById(state.chapter);
    statusRow.appendChild(buildStatusPill(`章节：${chapter?.title || state.chapter}`));
  }
  if (state.topic !== "全部") {
    statusRow.appendChild(buildStatusPill(`专题：${state.topic}`));
  }
  if (state.tag !== "全部") {
    statusRow.appendChild(buildStatusPill(`标签：${state.tag}`));
  }
  if (state.reviewFilter !== "全部") {
    statusRow.appendChild(buildStatusPill(`弱项：${reviewFilterLabels[state.reviewFilter] || state.reviewFilter}`, "review"));
  }
  if (state.sort === "updated-desc") {
    statusRow.appendChild(buildStatusPill("最近更新优先"));
  }
  if (state.sort === "reviewed-desc") {
    statusRow.appendChild(buildStatusPill("最近复习优先"));
  }
  if (state.sort === "reviewed-asc") {
    statusRow.appendChild(buildStatusPill("久未复习优先"));
  }
  if (state.sort === "question-asc") {
    statusRow.appendChild(buildStatusPill("题目字顺"));
  }
  if (state.reviewFilter === "daily" && state.sort === "default") {
    statusRow.appendChild(buildStatusPill(`今日上限 ${DAILY_TASK_LIMIT} 条`));
    statusRow.appendChild(buildStatusPill("顺序：薄弱 > 久未复习 > 高频易错 > 未复习"));
  }
  if (state.quizMode) {
    statusRow.appendChild(buildStatusPill("自测模式中", "quiz"));
  }
  if (isDashboardView()) {
    statusRow.appendChild(buildStatusPill("看板优先", "quiz"));
  }
  if (isCardsView()) {
    statusRow.appendChild(buildStatusPill("卡片视图", "quiz"));
  }
  if (isJournalView()) {
    statusRow.appendChild(buildStatusPill("分录库视图", "quiz"));
  }
  if (isJournalView() && state.journalSearch) {
    statusRow.appendChild(buildStatusPill(`分录关键词：${state.journalSearch}`));
  }
  if (isJournalView() && state.journalSide !== "全部") {
    statusRow.appendChild(buildStatusPill(`方向：${state.journalSide}方`, "quiz"));
  }
  if (isJournalView() && state.journalAccount !== "全部") {
    statusRow.appendChild(buildStatusPill(`科目：${state.journalAccount}`, "quiz"));
  }
  if (isJournalView() && state.journalSource !== "全部") {
    statusRow.appendChild(buildStatusPill(state.journalSource === "auto" ? "自动提取" : "结构化", "quiz"));
  }
  if (state.randomEntryId && visibleEntries.length === 1) {
    const randomText = state.randomEntrySource === "related" ? "相邻知识点" : state.randomEntrySource === "journal" ? "分录来源卡片" : "随机抽题中";
    statusRow.appendChild(buildStatusPill(randomText, "random"));
  }
  if (statusRow.childNodes.length > 0) {
    resultsMeta.appendChild(statusRow);
  }
}
