function getDashboardMetrics(entries) {
  const journalItems = getJournalItems(entries);
  return {
    entries: entries.length,
    daily: getDailyTaskEntries(entries).length,
    highRisk: entries.filter((entry) => entry.difficulty === "高频易错").length,
    journals: journalItems.length,
    topics: new Set(entries.map((entry) => entry.topic)).size,
    tags: new Set(entries.flatMap((entry) => entry.tags)).size
  };
}
function getTopicCoverage(entries) {
  const counts = /* @__PURE__ */ new Map();
  entries.forEach((entry) => {
    const current = counts.get(entry.topic) || { topic: entry.topic, total: 0, known: 0, weak: 0 };
    current.total += 1;
    current.known += isKnown(entry) ? 1 : 0;
    current.weak += isWeak(entry) ? 1 : 0;
    counts.set(entry.topic, current);
  });
  return [...counts.values()].sort((left, right) => {
    if (right.total !== left.total) {
      return right.total - left.total;
    }
    return left.topic.localeCompare(right.topic, "zh-CN");
  });
}
function getDifficultyDistribution(entries) {
  const counts = /* @__PURE__ */ new Map();
  entries.forEach((entry) => {
    counts.set(entry.difficulty, (counts.get(entry.difficulty) || 0) + 1);
  });
  return [...counts.entries()].map(([label, count]) => ({ label, count })).sort((left, right) => {
    const rankGap = (difficultyRank[right.label] || 0) - (difficultyRank[left.label] || 0);
    if (rankGap !== 0) {
      return rankGap;
    }
    return right.count - left.count;
  });
}
function getReviewStatusDistribution(entries) {
  return [
    { label: "已掌握", count: entries.filter(isKnown).length, color: "var(--mint)" },
    { label: "薄弱", count: entries.filter(isWeak).length, color: "var(--danger)" },
    { label: "已复习", count: entries.filter((entry) => Boolean(getReviewedAtValue(entry)) && !isKnown(entry) && !isWeak(entry)).length, color: "var(--gold)" },
    { label: "未复习", count: entries.filter((entry) => !getReviewedAtValue(entry)).length, color: "rgba(28, 22, 15, 0.34)" },
    { label: "收藏", count: entries.filter((entry) => getProgress(entry.id).favorite).length, color: "var(--brand)" }
  ];
}
function getJournalAccountStats(entries) {
  return getJournalAccountItems(getJournalItems(entries));
}
function createDashboardPanel(title, subtitle = "") {
  const panel = document.createElement("section");
  panel.className = "dashboard-panel";
  const header = document.createElement("div");
  header.className = "dashboard-panel-header";
  const copy = document.createElement("div");
  const heading = document.createElement("h3");
  heading.textContent = title;
  copy.appendChild(heading);
  if (subtitle) {
    const paragraph = document.createElement("p");
    paragraph.textContent = subtitle;
    copy.appendChild(paragraph);
  }
  header.appendChild(copy);
  panel.appendChild(header);
  return panel;
}
function getTopTopicName(entries) {
  return getTopicCoverage(entries)[0]?.topic || "当前筛选";
}
function getDashboardRecommendation(entries) {
  const dailyEntries = getDailyTaskEntries(entries);
  const weakEntries = entries.filter(isWeak);
  const staleEntries = entries.filter(isStale);
  const highRiskEntries = entries.filter((entry) => entry.difficulty === "高频易错" && !isKnown(entry));
  const unreviewedEntries = entries.filter((entry) => !getReviewedAtValue(entry));
  const topAccount = getJournalAccountStats(entries)[0];
  const topicName = getTopTopicName(entries);
  if (weakEntries.length > 0) {
    return {
      title: `先处理 ${weakEntries.length} 个薄弱点`,
      body: `建议从「${weakEntries[0].question}」开始，薄弱点会优先影响今日任务和后续复习节奏。`,
      meta: [`专题：${weakEntries[0].topic}`, `今日队列 ${dailyEntries.length}/${DAILY_TASK_LIMIT}`],
      actionText: "进入薄弱复习",
      action: () => setState({ viewMode: "cards", journalMode: false, reviewFilter: "weak", sort: "default", quizMode: false })
    };
  }
  if (staleEntries.length > 0) {
    return {
      title: `先回看 ${staleEntries.length} 个久未复习点`,
      body: `最早一批已经超过 ${REVIEW_INTERVAL_DAYS} 天未复习，建议先用卡片模式快速过一遍结论和易错点。`,
      meta: [`优先专题：${staleEntries[0].topic}`, `今日队列 ${dailyEntries.length}/${DAILY_TASK_LIMIT}`],
      actionText: "进入久未复习",
      action: () => setState({ viewMode: "cards", journalMode: false, reviewFilter: "stale", sort: "reviewed-asc", quizMode: false })
    };
  }
  if (highRiskEntries.length > 0) {
    return {
      title: `今天先压住 ${highRiskEntries.length} 个高频易错`,
      body: `当前筛选里高频易错占比偏高，建议先刷「${topicName}」相关卡片，再查对应分录。`,
      meta: [`高频易错 ${highRiskEntries.length}`, `今日队列 ${dailyEntries.length}/${DAILY_TASK_LIMIT}`],
      actionText: "进入高频易错",
      action: () => setState({ viewMode: "cards", journalMode: false, reviewFilter: "high-risk", sort: "updated-desc", quizMode: false })
    };
  }
  if (dailyEntries.length > 0) {
    return {
      title: `完成今天的 ${dailyEntries.length} 条复习队列`,
      body: `队列已经按薄弱、久未复习、高频易错和未复习排序，适合直接从第一条开始。`,
      meta: [`优先专题：${dailyEntries[0].topic}`, `上限 ${DAILY_TASK_LIMIT} 条`],
      actionText: "进入今日任务",
      action: () => setState({ viewMode: "cards", journalMode: false, reviewFilter: "daily", sort: "default", quizMode: false })
    };
  }
  if (topAccount) {
    return {
      title: `用分录巩固「${topAccount.value}」`,
      body: `当前筛选里这个科目出现 ${topAccount.count} 次，适合切到分录速查集中看借贷方向。`,
      meta: [`科目出现 ${topAccount.count} 次`, `分录速查`],
      actionText: "查看相关分录",
      action: () => setState({ viewMode: "journal", journalMode: true, journalAccount: topAccount.value }, { clearRandom: false })
    };
  }
  return {
    title: "当前筛选已经很干净",
    body: "暂时没有薄弱、久未复习或待复习项目。可以清空筛选看全局，或随机抽题保持手感。",
    meta: ["无待办压力", "适合随机自测"],
    actionText: "随机抽题",
    action: pickRandomEntry
  };
}
function renderRecommendationPanel(entries) {
  const recommendation = getDashboardRecommendation(entries);
  const panel = document.createElement("section");
  panel.className = "recommendation-panel";
  const copy = document.createElement("div");
  copy.className = "recommendation-copy";
  const kicker = document.createElement("div");
  kicker.className = "recommendation-kicker";
  kicker.textContent = "下一步建议";
  copy.appendChild(kicker);
  const title = document.createElement("h3");
  title.textContent = recommendation.title;
  copy.appendChild(title);
  const body = document.createElement("p");
  body.textContent = recommendation.body;
  copy.appendChild(body);
  const meta = document.createElement("div");
  meta.className = "recommendation-meta";
  recommendation.meta.forEach((item) => {
    const span = document.createElement("span");
    span.textContent = item;
    meta.appendChild(span);
  });
  copy.appendChild(meta);
  panel.appendChild(copy);
  const button = document.createElement("button");
  button.type = "button";
  button.className = "accent-button";
  button.textContent = recommendation.actionText;
  button.addEventListener("click", recommendation.action);
  panel.appendChild(button);
  return panel;
}
function renderMetricStrip(entries) {
  const metrics = getDashboardMetrics(entries);
  const strip = document.createElement("div");
  strip.className = "metric-strip";
  [
    [metrics.entries, "知识点"],
    [metrics.daily, "今日任务"],
    [metrics.highRisk, "高频易错"],
    [metrics.journals, "分录"],
    [metrics.topics, "专题"],
    [metrics.tags, "标签"]
  ].forEach(([value, label]) => {
    const tile = document.createElement("div");
    tile.className = "metric-tile";
    const strong = document.createElement("strong");
    strong.textContent = value;
    tile.appendChild(strong);
    const span = document.createElement("span");
    span.textContent = label;
    tile.appendChild(span);
    strip.appendChild(tile);
  });
  return strip;
}
function renderBarRows(items, options = {}) {
  const stack = document.createElement("div");
  stack.className = "chart-stack";
  const max = Math.max(...items.map((item) => item.count || item.total || 0), 1);
  items.forEach((item) => {
    const value = item.count ?? item.total ?? 0;
    const row = document.createElement("div");
    row.className = "bar-row";
    const label = document.createElement("div");
    label.className = "bar-label";
    label.textContent = item.label || item.topic;
    row.appendChild(label);
    const track = document.createElement("div");
    track.className = "bar-track";
    track.setAttribute("role", "img");
    track.setAttribute("aria-label", `${label.textContent} ${value}`);
    const fill = document.createElement("div");
    fill.className = "bar-fill";
    fill.style.setProperty("--value", `${Math.round(value / max * 100)}%`);
    fill.style.setProperty("--bar-color", options.color || item.color || "var(--mint)");
    track.appendChild(fill);
    row.appendChild(track);
    const valueNode = document.createElement("div");
    valueNode.className = "bar-value";
    valueNode.textContent = options.valueFormatter ? options.valueFormatter(item) : value;
    row.appendChild(valueNode);
    stack.appendChild(row);
  });
  return stack;
}
function renderTopicCoveragePanel(entries) {
  const items = getTopicCoverage(entries).slice(0, 10);
  const panel = createDashboardPanel("章节覆盖", "按当前筛选范围统计知识点密度，优先补齐高密度专题。");
  if (items.length === 0) {
    panel.appendChild(createInlineEmptyState("暂无章节数据", "放宽筛选后再看章节覆盖。"));
    return panel;
  }
  panel.appendChild(renderBarRows(items, {
    color: "var(--mint)",
    valueFormatter: (item) => `${item.total} · 掌握 ${item.known}`
  }));
  return panel;
}
function renderDifficultyPanel(entries) {
  const items = getDifficultyDistribution(entries);
  const panel = createDashboardPanel("易错热度", "难度分布用于决定先刷理解还是先补基础。");
  if (items.length === 0) {
    panel.appendChild(createInlineEmptyState("暂无难度数据", "当前筛选没有可统计的卡片。"));
    return panel;
  }
  panel.appendChild(renderBarRows(items, { color: "var(--brand)" }));
  return panel;
}
function renderReviewPanel(entries) {
  const distribution = getReviewStatusDistribution(entries);
  const total = Math.max(entries.length, 1);
  const knownAngle = Math.round(distribution[0].count / total * 360);
  const weakAngle = knownAngle + Math.round(distribution[1].count / total * 360);
  const reviewedAngle = weakAngle + Math.round(distribution[2].count / total * 360);
  const panel = createDashboardPanel("复习状态", "状态来自本机 localStorage，标记后看板即时更新。");
  const row = document.createElement("div");
  row.className = "donut-row";
  const donut = document.createElement("div");
  donut.className = "donut";
  donut.style.setProperty("--known-angle", `${knownAngle}deg`);
  donut.style.setProperty("--weak-angle", `${weakAngle}deg`);
  donut.style.setProperty("--reviewed-angle", `${reviewedAngle}deg`);
  donut.setAttribute("role", "img");
  donut.setAttribute("aria-label", `已掌握 ${distribution[0].count}，薄弱 ${distribution[1].count}，已复习 ${distribution[2].count}，未复习 ${distribution[3].count}`);
  const center = document.createElement("strong");
  center.textContent = `${Math.round(distribution[0].count / total * 100)}%`;
  donut.appendChild(center);
  row.appendChild(donut);
  const legend = document.createElement("div");
  legend.className = "legend-list";
  distribution.forEach((item) => {
    const legendItem = document.createElement("div");
    legendItem.className = "legend-item";
    const name = document.createElement("span");
    name.className = "legend-name";
    const dot = document.createElement("span");
    dot.className = "legend-dot";
    dot.style.setProperty("--dot-color", item.color);
    name.appendChild(dot);
    name.appendChild(document.createTextNode(item.label));
    legendItem.appendChild(name);
    const count = document.createElement("strong");
    count.textContent = item.count;
    legendItem.appendChild(count);
    legend.appendChild(legendItem);
  });
  row.appendChild(legend);
  panel.appendChild(row);
  return panel;
}
function getPriorityLabel(entry) {
  if (isWeak(entry)) {
    return "薄弱";
  }
  if (isStale(entry)) {
    return "7 天未复习";
  }
  if (!getReviewedAtValue(entry)) {
    return "未复习";
  }
  if (entry.difficulty === "高频易错" && !isKnown(entry)) {
    return "易错";
  }
  return "继续";
}
function openDashboardEntry(entryId) {
  uiState.expandedIds.clear();
  uiState.expandedIds.add(entryId);
  setState({
    viewMode: "cards",
    journalMode: false,
    randomEntryId: entryId,
    randomEntrySource: "dashboard"
  }, { clearRandom: false });
  window.requestAnimationFrame(() => {
    scrollEntryIntoView(entryId);
  });
}
function getContinuationEntries(entries, limit = 6) {
  const dailyEntries = getDailyTaskEntries(entries, limit);
  if (dailyEntries.length > 0) {
    return dailyEntries;
  }
  return [...entries].sort((left, right) => {
    const difficultyGap = (difficultyRank[right.difficulty] || 0) - (difficultyRank[left.difficulty] || 0);
    if (difficultyGap !== 0) {
      return difficultyGap;
    }
    return left.order - right.order;
  }).slice(0, limit);
}
function renderQueuePanel(entries) {
  const items = getContinuationEntries(entries);
  const panel = createDashboardPanel("继续复习", "优先排列薄弱、久未复习、未复习和高频易错内容。");
  const list = document.createElement("div");
  list.className = "queue-list";
  if (items.length === 0) {
    panel.appendChild(createInlineEmptyState("暂无待复习内容", "清空筛选后可以查看完整队列。"));
    return panel;
  }
  items.forEach((entry) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "queue-item";
    const copy = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = entry.question;
    copy.appendChild(title);
    const meta = document.createElement("span");
    meta.textContent = `${entry.topic} · ${entry.difficulty} · ${formatReviewDate(getProgress(entry.id).reviewedAt)}`;
    copy.appendChild(meta);
    button.appendChild(copy);
    const priority = document.createElement("span");
    priority.className = "queue-priority";
    priority.textContent = getPriorityLabel(entry);
    button.appendChild(priority);
    button.addEventListener("click", () => openDashboardEntry(entry.id));
    list.appendChild(button);
  });
  panel.appendChild(list);
  return panel;
}
function renderJournalHeatPanel(entries) {
  const accounts = getJournalAccountStats(entries).slice(0, 12);
  const panel = createDashboardPanel("分录科目热度", "点击科目会进入分录速查，并自动套用科目筛选。");
  const list = document.createElement("div");
  list.className = "account-heat-list";
  if (accounts.length === 0) {
    panel.appendChild(createInlineEmptyState("暂无分录科目", "当前筛选范围没有结构化或自动提取的分录。"));
    return panel;
  }
  accounts.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "account-chip-button";
    const name = document.createElement("strong");
    name.textContent = item.value;
    button.appendChild(name);
    const count = document.createElement("span");
    count.textContent = item.count;
    button.appendChild(count);
    button.addEventListener("click", () => {
      setState({
        viewMode: "journal",
        journalMode: true,
        journalAccount: item.value
      }, { clearRandom: false });
    });
    list.appendChild(button);
  });
  panel.appendChild(list);
  return panel;
}
function renderDashboardActions(panel) {
  const actions = document.createElement("div");
  actions.className = "dashboard-actions";
  const dailyButton = document.createElement("button");
  dailyButton.type = "button";
  dailyButton.className = "accent-button";
  dailyButton.textContent = "进入今日任务";
  dailyButton.addEventListener("click", () => {
    setState({ viewMode: "cards", journalMode: false, reviewFilter: "daily", sort: "default", quizMode: false });
  });
  actions.appendChild(dailyButton);
  const journalButton = document.createElement("button");
  journalButton.type = "button";
  journalButton.className = "ghost-button";
  journalButton.textContent = "打开分录速查";
  journalButton.addEventListener("click", () => {
    setState({ viewMode: "journal", journalMode: true, quizMode: false }, { clearRandom: false });
  });
  actions.appendChild(journalButton);
  const cardsButton = document.createElement("button");
  cardsButton.type = "button";
  cardsButton.className = "ghost-button";
  cardsButton.textContent = "查看卡片列表";
  cardsButton.addEventListener("click", () => {
    setState({ viewMode: "cards", journalMode: false }, { clearRandom: false });
  });
  actions.appendChild(cardsButton);
  panel.appendChild(actions);
}
function renderDashboard(entries) {
  clearNode(cardList);
  const workbench = document.createElement("div");
  workbench.className = "dashboard-workbench";
  workbench.appendChild(renderMetricStrip(entries));
  workbench.appendChild(renderRecommendationPanel(entries));
  const grid = document.createElement("div");
  grid.className = "dashboard-grid";
  const main = document.createElement("div");
  main.className = "dashboard-main";
  main.appendChild(renderTopicCoveragePanel(entries));
  const twoUp = document.createElement("div");
  twoUp.className = "dashboard-two-up";
  twoUp.appendChild(renderDifficultyPanel(entries));
  twoUp.appendChild(renderReviewPanel(entries));
  main.appendChild(twoUp);
  const side = document.createElement("div");
  side.className = "dashboard-side";
  const queuePanel = renderQueuePanel(entries);
  renderDashboardActions(queuePanel);
  side.appendChild(queuePanel);
  side.appendChild(renderJournalHeatPanel(entries));
  grid.appendChild(main);
  grid.appendChild(side);
  workbench.appendChild(grid);
  cardList.appendChild(workbench);
}
