function getRelatedEntries(entry, limit = 3) {
  const tagSet = new Set(entry.tags);
  return studyData.entries.filter((candidate) => candidate.id !== entry.id).map((candidate) => {
    const sharedTags = candidate.tags.filter((tag) => tagSet.has(tag)).length;
    const sameTopic = candidate.topic === entry.topic ? 3 : 0;
    const sameDifficulty = candidate.difficulty === entry.difficulty ? 1 : 0;
    const score = sameTopic + sharedTags * 2 + sameDifficulty;
    return { entry: candidate, score, sharedTags };
  }).filter((item) => item.score > 0).sort((left, right) => {
    if (right.score !== left.score) {
      return right.score - left.score;
    }
    if (right.sharedTags !== left.sharedTags) {
      return right.sharedTags - left.sharedTags;
    }
    return left.entry.order - right.entry.order;
  }).slice(0, limit).map((item) => item.entry);
}
function openRelatedEntry(entryId) {
  uiState.expandedIds.clear();
  uiState.expandedIds.add(entryId);
  setState({
    search: "",
    chapter: "全部",
    topic: "全部",
    tag: "全部",
    reviewFilter: "全部",
    viewMode: "cards",
    journalMode: false,
    randomEntryId: entryId,
    randomEntrySource: "related"
  }, { clearRandom: false });
  window.requestAnimationFrame(() => {
    scrollEntryIntoView(entryId);
  });
}
function scrollEntryIntoView(entryId) {
  const card = document.querySelector(`[data-entry-id="${entryId}"]`);
  if (card) {
    card.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
function renderSourceNotes(container, markdown) {
  clearNode(container);
  let list = null;
  let listType = "";
  let codeLines = null;
  let codeClassName = "";
  let tableLines = [];
  const appendTextBlock = (tagName, text, className = "") => {
    const element = document.createElement(tagName);
    element.className = className;
    element.textContent = text;
    container.appendChild(element);
  };
  const closeList = () => {
    list = null;
    listType = "";
  };
  const flushTable = () => {
    if (tableLines.length === 0) {
      return;
    }
    const rows = tableLines.filter((row) => !/^\|\s*:?-{3,}/.test(row));
    const table = document.createElement("table");
    table.className = "source-notes-table";
    rows.forEach((row, rowIndex) => {
      const tr = document.createElement("tr");
      row.split("|").slice(1, -1).forEach((cell) => {
        const cellElement = document.createElement(rowIndex === 0 ? "th" : "td");
        cellElement.textContent = cell.trim();
        tr.appendChild(cellElement);
      });
      table.appendChild(tr);
    });
    container.appendChild(table);
    tableLines = [];
  };
  markdown.split(/\r?\n/).forEach((rawLine, index) => {
    const line = rawLine.trimEnd();
    if (line.startsWith("```")) {
      if (codeLines) {
        appendTextBlock("pre", codeLines.join("\n"), codeClassName);
        codeLines = null;
        codeClassName = "";
      } else {
        closeList();
        codeLines = [];
        codeClassName = line.trim() === "```red" ? "source-notes-key-point" : "";
      }
      return;
    }
    if (codeLines) {
      codeLines.push(line);
      return;
    }
    if (line.startsWith("|")) {
      closeList();
      tableLines.push(line);
      return;
    }
    flushTable();
    const keyPoint = line.match(/^【红字】(.+)$/);
    if (keyPoint) {
      appendTextBlock("p", keyPoint[1], "source-notes-key-point");
      return;
    }
    const heading = line.match(/^(#{3,6})\s+(.+)$/);
    if (heading) {
      closeList();
      appendTextBlock(heading[1].length <= 3 ? "h5" : "h6", heading[2]);
      return;
    }
    const item = line.match(/^[-*]\s+(.+)$/) || line.match(/^\d+\.\s+(.+)$/);
    if (item) {
      const nextListType = /^\d+\./.test(line) ? "ol" : "ul";
      if (!list || listType !== nextListType) {
        list = document.createElement(nextListType);
        listType = nextListType;
        container.appendChild(list);
      }
      const listItem = document.createElement("li");
      listItem.textContent = item[1];
      list.appendChild(listItem);
      return;
    }
    closeList();
    if (line.trim()) {
      appendTextBlock(index === 0 ? "h5" : "p", line);
    }
  });
  if (codeLines) {
    appendTextBlock("pre", codeLines.join("\n"));
  }
  flushTable();
}
function renderCards(entries) {
  clearNode(cardList);
  const mermaidNodes = [];
  entries.forEach((entry) => {
    const fragment = cardTemplate.content.cloneNode(true);
    const article = fragment.querySelector(".qa-card");
    const summary = fragment.querySelector(".question-summary");
    const hint = fragment.querySelector(".question-hint");
    const details = fragment.querySelector(".card-details");
    const toggleButton = fragment.querySelector(".toggle-details");
    const relatedBlock = fragment.querySelector(".related-block");
    const relatedList = fragment.querySelector(".related-list");
    const journalBlock = fragment.querySelector(".journal-block");
    const journalList = fragment.querySelector(".journal-list");
    const diagramBlock = fragment.querySelector(".diagram-block");
    const sourceNotesBlock = fragment.querySelector(".source-notes-block");
    const sourceNotes = window.markdownSections?.[entry.id];
    const isExpanded = uiState.expandedIds.has(entry.id);
    const detailsId = `card-details-${entry.id}`;
    const progress = getProgress(entry.id);
    const reviewText = formatReviewDate(progress.reviewedAt);
    article.dataset.entryId = entry.id;
    fragment.querySelector(".topic-badge").textContent = entry.topic;
    fragment.querySelector(".difficulty-badge").textContent = entry.difficulty;
    fragment.querySelector(".card-meta").textContent = `更新于 ${entry.updatedAt} · ${reviewText}`;
    fragment.querySelector(".question-title").textContent = entry.question;
    summary.textContent = entry.summary;
    summary.hidden = state.quizMode && !isExpanded;
    hint.hidden = !(state.quizMode && !isExpanded);
    toggleButton.textContent = isExpanded ? "收起详情" : state.quizMode ? "查看解析" : "展开详情";
    toggleButton.setAttribute("aria-expanded", String(isExpanded));
    toggleButton.setAttribute("aria-controls", detailsId);
    details.id = detailsId;
    toggleButton.addEventListener("click", () => {
      const cardTop = article.getBoundingClientRect().top;
      if (uiState.expandedIds.has(entry.id)) {
        uiState.expandedIds.delete(entry.id);
      } else {
        uiState.expandedIds.add(entry.id);
      }
      renderResults();
      const rerenderedCard = document.querySelector(`[data-entry-id="${entry.id}"]`);
      if (rerenderedCard) {
        window.scrollBy(0, rerenderedCard.getBoundingClientRect().top - cardTop);
      }
    });
    fragment.querySelectorAll("[data-mastery-action]").forEach((button) => {
      const action = button.dataset.masteryAction;
      if (action === "known") {
        button.classList.toggle("active", progress.status === "known");
      }
      if (action === "weak") {
        button.classList.toggle("active", progress.status === "weak");
      }
      if (action === "favorite") {
        button.classList.toggle("active", progress.favorite);
      }
      button.addEventListener("click", () => {
        if (action === "reviewed") {
          updateProgress(entry.id, {});
        }
        if (action === "known") {
          updateProgress(entry.id, { status: progress.status === "known" ? "new" : "known" });
        }
        if (action === "weak") {
          updateProgress(entry.id, { status: progress.status === "weak" ? "new" : "weak" });
        }
        if (action === "favorite") {
          updateProgress(entry.id, { favorite: !progress.favorite }, { touch: false });
        }
      });
    });
    details.hidden = !isExpanded;
    if (sourceNotes) {
      sourceNotesBlock.hidden = false;
      renderSourceNotes(sourceNotesBlock.querySelector(".source-notes"), sourceNotes);
    }
    const sections = [
      [".conclusion-list", entry.conclusion],
      [".reasoning-list", entry.reasoning],
      [".memory-list", entry.memory],
      [".pitfalls-list", entry.pitfalls]
    ];
    sections.forEach(([selector, items]) => {
      const list = fragment.querySelector(selector);
      createListItems(list, items);
    });
    if (entry.journalEntries.length > 0) {
      journalBlock.hidden = false;
      entry.journalEntries.forEach((journalEntry) => {
        journalList.appendChild(createJournalEntryElement(journalEntry));
      });
    }
    if (isExpanded) {
      const relatedEntries = getRelatedEntries(entry);
      if (relatedEntries.length > 0) {
        relatedBlock.hidden = false;
        relatedEntries.forEach((relatedEntry) => {
          const button = document.createElement("button");
          button.type = "button";
          button.className = "related-button";
          const title = document.createElement("strong");
          title.textContent = relatedEntry.question;
          button.appendChild(title);
          const meta = document.createElement("span");
          meta.textContent = `${relatedEntry.topic} · ${relatedEntry.difficulty}`;
          button.appendChild(meta);
          button.addEventListener("click", () => openRelatedEntry(relatedEntry.id));
          relatedList.appendChild(button);
        });
      }
    }
    if (entry.diagram && isExpanded) {
      diagramBlock.hidden = false;
      const chart = fragment.querySelector(".mermaid-chart");
      const fallback = fragment.querySelector(".diagram-fallback");
      chart.textContent = entry.diagram;
      fallback.textContent = entry.diagram;
      fallback.hidden = true;
      mermaidNodes.push(chart);
    }
    const tagRow = fragment.querySelector(".tag-row");
    entry.tags.forEach((tag) => {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = tag;
      tagRow.appendChild(span);
    });
    cardList.appendChild(fragment);
  });
  renderMermaidDiagrams(mermaidNodes);
}
