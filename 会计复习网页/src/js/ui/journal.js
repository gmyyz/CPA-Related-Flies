function openEntryFromJournal(entryId) {
  uiState.expandedIds.clear();
  uiState.expandedIds.add(entryId);
  setState({
    viewMode: "cards",
    journalMode: false,
    randomEntryId: entryId,
    randomEntrySource: "journal"
  }, { clearRandom: false });
  window.requestAnimationFrame(() => {
    scrollEntryIntoView(entryId);
  });
}
function makeJournalFilterButton(label, active, onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "chip";
  button.classList.toggle("active", active);
  button.textContent = label;
  button.addEventListener("click", onClick);
  return button;
}
function renderJournalToolbox(entries, allJournalItems, visibleJournalItems) {
  const toolbox = document.createElement("div");
  toolbox.className = "panel journal-toolbox";
  const stats = getJournalStats(entries, visibleJournalItems);
  const statsRow = document.createElement("div");
  statsRow.className = "journal-stats";
  [
    [`${stats.journals}`, "当前分录"],
    [`${stats.sourceEntries}`, "来源知识点"],
    [`${stats.accounts}`, "涉及科目"]
  ].forEach(([value, label]) => {
    const stat = document.createElement("div");
    stat.className = "journal-stat";
    const strong = document.createElement("strong");
    strong.textContent = value;
    stat.appendChild(strong);
    const span = document.createElement("span");
    span.textContent = label;
    stat.appendChild(span);
    statsRow.appendChild(stat);
  });
  toolbox.appendChild(statsRow);
  const grid = document.createElement("div");
  grid.className = "journal-tool-grid";
  const searchGroup = document.createElement("label");
  searchGroup.className = "journal-filter-group";
  const searchLabel = document.createElement("span");
  searchLabel.className = "journal-filter-label";
  searchLabel.textContent = "分录关键词";
  searchGroup.appendChild(searchLabel);
  const input = document.createElement("input");
  input.id = "journal-search-input";
  input.type = "search";
  input.value = state.journalSearch;
  input.placeholder = "搜索科目、金额、条件、来源题目";
  input.addEventListener("input", (event) => {
    const nextSearch = normalizeText(event.target.value);
    window.clearTimeout(journalSearchInputDebounceTimer);
    journalSearchInputDebounceTimer = window.setTimeout(() => {
      const shouldRestoreFocus = document.activeElement === input;
      setState({ journalSearch: nextSearch }, { clearRandom: false });
      if (shouldRestoreFocus) {
        window.requestAnimationFrame(() => {
          const nextInput = document.querySelector("#journal-search-input");
          if (nextInput) {
            nextInput.focus();
            nextInput.setSelectionRange(nextInput.value.length, nextInput.value.length);
          }
        });
      }
    }, SEARCH_DEBOUNCE_MS);
  });
  searchGroup.appendChild(input);
  grid.appendChild(searchGroup);
  const sideGroup = document.createElement("div");
  sideGroup.className = "journal-filter-group";
  const sideLabel = document.createElement("span");
  sideLabel.className = "journal-filter-label";
  sideLabel.textContent = "借贷方向";
  sideGroup.appendChild(sideLabel);
  const sideButtons = document.createElement("div");
  sideButtons.className = "chip-list";
  ["全部", "借", "贷"].forEach((side) => {
    sideButtons.appendChild(makeJournalFilterButton(side, state.journalSide === side, () => {
      setState({ journalSide: side }, { clearRandom: false });
    }));
  });
  sideGroup.appendChild(sideButtons);
  grid.appendChild(sideGroup);
  const sourceGroup = document.createElement("div");
  sourceGroup.className = "journal-filter-group";
  const sourceLabel = document.createElement("span");
  sourceLabel.className = "journal-filter-label";
  sourceLabel.textContent = "分录来源";
  sourceGroup.appendChild(sourceLabel);
  const sourceButtons = document.createElement("div");
  sourceButtons.className = "chip-list";
  [
    ["全部", "全部"],
    ["manual", "结构化"],
    ["auto", "自动提取"]
  ].forEach(([value, label]) => {
    sourceButtons.appendChild(makeJournalFilterButton(label, state.journalSource === value, () => {
      setState({ journalSource: value }, { clearRandom: false });
    }));
  });
  sourceGroup.appendChild(sourceButtons);
  grid.appendChild(sourceGroup);
  toolbox.appendChild(grid);
  const accountPanel = document.createElement("div");
  accountPanel.className = "journal-account-panel";
  const accountLabel = document.createElement("span");
  accountLabel.className = "journal-filter-label";
  accountLabel.textContent = "科目索引";
  accountPanel.appendChild(accountLabel);
  const accountList = document.createElement("div");
  accountList.className = "journal-account-list";
  accountList.appendChild(makeJournalFilterButton("全部科目", state.journalAccount === "全部", () => {
    setState({ journalAccount: "全部" }, { clearRandom: false });
  }));
  const accountItems = getJournalAccountItems(allJournalItems);
  const visibleAccountItems = accountItems.slice(0, 36);
  if (state.journalAccount !== "全部" && !visibleAccountItems.some((item) => item.value === state.journalAccount)) {
    const activeItem = accountItems.find((item) => item.value === state.journalAccount);
    if (activeItem) {
      visibleAccountItems.push(activeItem);
    }
  }
  visibleAccountItems.forEach((item) => {
    accountList.appendChild(makeJournalFilterButton(`${item.value} (${item.count})`, state.journalAccount === item.value, () => {
      setState({ journalAccount: item.value }, { clearRandom: false });
    }));
  });
  accountPanel.appendChild(accountList);
  toolbox.appendChild(accountPanel);
  const actions = document.createElement("div");
  actions.className = "journal-card-actions";
  const clearButton = document.createElement("button");
  clearButton.type = "button";
  clearButton.className = "inline-button";
  clearButton.textContent = "清空分录筛选";
  clearButton.addEventListener("click", () => {
    setState({
      journalSearch: "",
      journalSide: "全部",
      journalAccount: "全部",
      journalSource: "全部"
    }, { clearRandom: false });
  });
  actions.appendChild(clearButton);
  toolbox.appendChild(actions);
  return toolbox;
}
function renderJournalLineList(lines) {
  const split = document.createElement("div");
  split.className = "journal-split";
  ["借", "贷"].forEach((side) => {
    const panel = document.createElement("div");
    panel.className = "journal-side-panel";
    const title = document.createElement("h5");
    title.textContent = `${side}方`;
    panel.appendChild(title);
    const sideLines = lines.filter((line) => line.side === side);
    if (sideLines.length === 0) {
      const empty = document.createElement("div");
      empty.className = "journal-empty-side";
      empty.textContent = "无";
      panel.appendChild(empty);
    } else {
      const list = document.createElement("ul");
      list.className = "journal-line-list";
      sideLines.forEach((line) => {
        const item = document.createElement("li");
        const account = document.createElement("span");
        account.className = "journal-line-account";
        account.textContent = line.account;
        item.appendChild(account);
        const amount = document.createElement("span");
        amount.className = "journal-line-amount";
        amount.textContent = line.amount || "";
        item.appendChild(amount);
        if (line.note) {
          const note = document.createElement("span");
          note.className = "journal-line-note";
          note.textContent = line.note;
          item.appendChild(note);
        }
        list.appendChild(item);
      });
      panel.appendChild(list);
    }
    split.appendChild(panel);
  });
  return split;
}
async function copyJournalItem(item, button) {
  const originalText = button.textContent;
  try {
    await navigator.clipboard.writeText(getJournalCopyText(item));
    button.textContent = "已复制";
  } catch (error) {
    button.textContent = "复制失败，请手动选择";
  }
  window.setTimeout(() => {
    button.textContent = originalText;
  }, 1600);
}
function renderJournalLibraryCard(item) {
  const { entry, journalEntry, lines } = item;
  const card = document.createElement("article");
  card.className = "panel journal-library-card";
  const header = document.createElement("div");
  header.className = "journal-library-card-header";
  const kicker = document.createElement("div");
  kicker.className = "journal-card-kicker";
  kicker.textContent = "来源知识点";
  header.appendChild(kicker);
  const titleBlock = document.createElement("div");
  titleBlock.className = "journal-card-title";
  const sourceTitle = document.createElement("h3");
  sourceTitle.textContent = entry.question;
  titleBlock.appendChild(sourceTitle);
  const entryTitle = document.createElement("h4");
  entryTitle.textContent = journalEntry.title || "分录";
  titleBlock.appendChild(entryTitle);
  header.appendChild(titleBlock);
  const meta = document.createElement("div");
  meta.className = "status-row";
  meta.appendChild(buildStatusPill(entry.topic));
  meta.appendChild(buildStatusPill(entry.difficulty));
  meta.appendChild(buildStatusPill(journalEntry.source === "auto" ? "自动提取" : "结构化", "quiz"));
  if (journalEntry.scope) {
    meta.appendChild(buildStatusPill(journalEntry.scope));
  }
  header.appendChild(meta);
  card.appendChild(header);
  if (journalEntry.condition) {
    const condition = document.createElement("p");
    condition.className = "journal-entry-condition";
    condition.textContent = journalEntry.condition;
    card.appendChild(condition);
  }
  if (lines.length > 0) {
    card.appendChild(renderJournalLineList(lines));
  } else {
    const body = document.createElement("pre");
    body.className = "journal-entry-body";
    body.textContent = journalEntry.body;
    card.appendChild(body);
  }
  if (journalEntry.note) {
    const note = document.createElement("p");
    note.className = "journal-entry-note";
    note.textContent = journalEntry.note;
    card.appendChild(note);
  }
  const actions = document.createElement("div");
  actions.className = "journal-card-actions";
  const copyButton = document.createElement("button");
  copyButton.type = "button";
  copyButton.className = "inline-button";
  copyButton.textContent = "复制分录";
  copyButton.addEventListener("click", () => copyJournalItem(item, copyButton));
  actions.appendChild(copyButton);
  const sourceButton = document.createElement("button");
  sourceButton.type = "button";
  sourceButton.className = "inline-button";
  sourceButton.textContent = "打开来源卡片";
  sourceButton.addEventListener("click", () => openEntryFromJournal(entry.id));
  actions.appendChild(sourceButton);
  card.appendChild(actions);
  return card;
}
function renderJournalLibrary(entries) {
  clearNode(cardList);
  const allJournalItems = getJournalItems(entries);
  const visibleJournalItems = getFilteredJournalItems(entries);
  const workbench = document.createElement("div");
  workbench.className = "journal-workbench";
  workbench.appendChild(renderJournalToolbox(entries, allJournalItems, visibleJournalItems));
  if (allJournalItems.length === 0) {
    workbench.appendChild(createEmptyStateElement("当前筛选范围内没有分录", "换一个章节、标签或关键词，或者回到卡片视图继续复习。"));
    cardList.appendChild(workbench);
    return;
  }
  if (visibleJournalItems.length === 0) {
    workbench.appendChild(createEmptyStateElement("没有找到匹配分录", "清空分录筛选，或者换一个科目、方向、关键词。"));
    cardList.appendChild(workbench);
    return;
  }
  const list = document.createElement("div");
  list.className = "journal-library-list";
  visibleJournalItems.forEach((item) => {
    list.appendChild(renderJournalLibraryCard(item));
  });
  workbench.appendChild(list);
  cardList.appendChild(workbench);
}
