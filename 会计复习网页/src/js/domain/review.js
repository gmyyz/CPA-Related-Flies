function normalizeViewMode(value) {
  return ["dashboard", "cards", "journal"].includes(value) ? value : defaultState.viewMode;
}
function isJournalView() {
  return state.viewMode === "journal" || state.journalMode;
}
function isCardsView() {
  return state.viewMode === "cards";
}
function isDashboardView() {
  return !isJournalView() && state.viewMode === "dashboard";
}
function uniqueValues(values) {
  return ["全部", ...new Set(values)];
}
function getChapterById(chapterId) {
  return chapters.find((chapter) => chapter.id === chapterId) || chapters[0];
}
function getChapterForTopic(topic) {
  return chapters.find((chapter) => chapter.id !== "全部" && chapter.topics.includes(topic));
}
function buildChapterOptions(entries) {
  const topicCounts = entries.reduce((counts, entry) => {
    counts.set(entry.topic, (counts.get(entry.topic) || 0) + 1);
    return counts;
  }, /* @__PURE__ */ new Map());
  const mappedTopics = new Set(chapterDefinitions.flatMap((chapter) => chapter.topics));
  const uncategorizedChapters = [...topicCounts.keys()].filter((topic) => topic && !mappedTopics.has(topic)).sort((left, right) => left.localeCompare(right, "zh-CN")).map((topic) => ({
    id: `uncategorized-${topic}`,
    title: topic,
    topics: [topic]
  }));
  return [...chapterDefinitions, ...uncategorizedChapters].map((chapter) => {
    const count = chapter.id === "全部" ? entries.length : chapter.topics.reduce((sum, topic) => sum + (topicCounts.get(topic) || 0), 0);
    return { ...chapter, count };
  }).filter((chapter) => chapter.id === "全部" || chapter.count > 0);
}
function buildTagItems(entries) {
  const counts = /* @__PURE__ */ new Map();
  entries.forEach((entry) => {
    [...new Set(entry.tags)].forEach((tag) => {
      if (hiddenTags.has(tag)) {
        return;
      }
      counts.set(tag, (counts.get(tag) || 0) + 1);
    });
  });
  return [...counts.entries()].sort((left, right) => {
    if (right[1] !== left[1]) {
      return right[1] - left[1];
    }
    return left[0].localeCompare(right[0], "zh-CN");
  }).map(([value, count]) => ({ value, count }));
}
function normalizeText(value) {
  return String(value || "").toLowerCase().trim();
}
function parseDate(value) {
  if (!value) {
    return 0;
  }
  const timestamp = new Date(value).getTime();
  return Number.isNaN(timestamp) ? 0 : timestamp;
}
function formatReviewDate(value) {
  const timestamp = parseDate(value);
  if (!timestamp) {
    return "未复习";
  }
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit"
  }).format(new Date(timestamp));
}
function getReviewedAtValue(entry) {
  return parseDate(getProgress(entry.id).reviewedAt);
}
function isStale(entry) {
  const reviewedAt = getReviewedAtValue(entry);
  if (!reviewedAt) {
    return false;
  }
  return Date.now() - reviewedAt >= REVIEW_INTERVAL_DAYS * DAY_IN_MS;
}
function isKnown(entry) {
  return getProgress(entry.id).status === "known";
}
function isWeak(entry) {
  return getProgress(entry.id).status === "weak";
}
function getDailyTaskPriority(entry) {
  if (isWeak(entry)) {
    return 1;
  }
  if (isStale(entry)) {
    return 2;
  }
  if (entry.difficulty === "高频易错" && !isKnown(entry)) {
    return 3;
  }
  if (!getReviewedAtValue(entry)) {
    return 4;
  }
  return 0;
}
function isDailyTask(entry) {
  return getDailyTaskPriority(entry) > 0;
}
function sortDailyTaskEntries(entries) {
  return [...entries].filter(isDailyTask).sort((left, right) => {
    const priorityGap = getDailyTaskPriority(left) - getDailyTaskPriority(right);
    if (priorityGap !== 0) {
      return priorityGap;
    }
    const difficultyGap = (difficultyRank[right.difficulty] || 0) - (difficultyRank[left.difficulty] || 0);
    if (difficultyGap !== 0) {
      return difficultyGap;
    }
    const reviewedGap = getReviewedAtValue(left) - getReviewedAtValue(right);
    if (reviewedGap !== 0) {
      return reviewedGap;
    }
    const updatedGap = right.updatedAtValue - left.updatedAtValue;
    if (updatedGap !== 0) {
      return updatedGap;
    }
    return left.order - right.order;
  });
}
function getDailyTaskEntries(entries, limit = DAILY_TASK_LIMIT) {
  return sortDailyTaskEntries(entries).slice(0, limit);
}
