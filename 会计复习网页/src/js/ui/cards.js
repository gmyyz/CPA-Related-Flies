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
function isSafeMarkdownUrl(url) {
  return /^(?:https?:|mailto:|\.\.?\/|\/|#)/i.test(url);
}
function isSafeMarkdownImageUrl(url) {
  return isSafeMarkdownUrl(url) || /^data:image\/(?:png|jpe?g|gif|webp|svg\+xml);base64,[a-z0-9+/=]+$/i.test(url);
}
function appendInlineMarkdown(container, text) {
  const tokenPattern = /<span class="text-danger">([\s\S]*?)<\/span>|<mark>(.*?)<\/mark>|<br\s*\/?>|`([^`]+)`|\*\*([^*]+)\*\*|__([^_]+)__|\[([^\]]+)\]\(([^)]+)\)/gi;
  let lastIndex = 0;
  for (const match of text.matchAll(tokenPattern)) {
    if (match.index > lastIndex) {
      container.append(document.createTextNode(text.slice(lastIndex, match.index)));
    }
    if (match[1] !== undefined) {
      const span = document.createElement("span");
      span.className = "text-danger";
      appendInlineMarkdown(span, match[1]);
      container.appendChild(span);
    } else if (match[2] !== undefined) {
      const mark = document.createElement("mark");
      appendInlineMarkdown(mark, match[2]);
      container.appendChild(mark);
    } else if (match[0].toLowerCase().startsWith("<br")) {
      container.appendChild(document.createElement("br"));
    } else if (match[3] !== undefined) {
      const code = document.createElement("code");
      code.textContent = match[3];
      container.appendChild(code);
    } else if (match[4] !== undefined || match[5] !== undefined) {
      const strong = document.createElement("strong");
      strong.textContent = match[4] ?? match[5];
      container.appendChild(strong);
    } else {
      const [label, url] = [match[6], match[7].trim()];
      if (isSafeMarkdownUrl(url)) {
        const link = document.createElement("a");
        link.href = url;
        link.textContent = label;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        container.appendChild(link);
      } else {
        container.append(document.createTextNode(match[0]));
      }
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    container.append(document.createTextNode(text.slice(lastIndex)));
  }
}
function appendMarkdownElement(container, tagName, text, className = "") {
  const element = document.createElement(tagName);
  element.className = className;
  appendInlineMarkdown(element, text);
  container.appendChild(element);
  return element;
}
function renderSourceNotes(container, markdown, mermaidNodes, headingPrefix = "") {
  clearNode(container);
  let list = null;
  let listType = "";
  let codeBlock = null;
  let tableLines = [];
  const flushCodeBlock = () => {
    if (!codeBlock) {
      return;
    }
    const source = codeBlock.lines.join("\n");
    if (codeBlock.language === "mermaid") {
      const shell = document.createElement("div");
      shell.className = "source-notes-mermaid diagram-shell";
      const chart = document.createElement("div");
      chart.className = "mermaid mermaid-chart";
      chart.textContent = source;
      const fallback = document.createElement("pre");
      fallback.className = "diagram-fallback";
      fallback.hidden = true;
      fallback.textContent = source;
      shell.append(chart, fallback);
      container.appendChild(shell);
      mermaidNodes.push(chart);
    } else {
      const className = codeBlock.language === "red" ? "source-notes-key-point" : "";
      const pre = document.createElement("pre");
      pre.className = className;
      pre.textContent = source;
      container.appendChild(pre);
    }
    codeBlock = null;
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
        appendInlineMarkdown(cellElement, cell.trim());
        tr.appendChild(cellElement);
      });
      table.appendChild(tr);
    });
    container.appendChild(table);
    tableLines = [];
  };
  let headingIndex = 0;
  markdown.split(/\r?\n/).forEach((rawLine, index) => {
    const line = rawLine.trimEnd();
    const codeFence = line.match(/^(```|~~~)\s*([\w-]*)\s*$/);
    if (codeFence) {
      if (codeBlock) {
        if (codeBlock.fence === codeFence[1]) {
          flushCodeBlock();
        } else {
          codeBlock.lines.push(line);
        }
      } else {
        closeList();
        codeBlock = { fence: codeFence[1], language: codeFence[2].toLowerCase(), lines: [] };
      }
      return;
    }
    if (codeBlock) {
      codeBlock.lines.push(line);
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
      appendMarkdownElement(container, "p", keyPoint[1], "source-notes-key-point");
      return;
    }
    const heading = line.match(/^(#{2,6})\s+(.+)$/);
    if (heading) {
      closeList();
      const headingElement = appendMarkdownElement(container, heading[1].length <= 2 ? "h4" : heading[1].length <= 3 ? "h5" : "h6", heading[2]);
      if (headingPrefix) {
        headingElement.id = `${headingPrefix}-${headingIndex}`;
      }
      headingIndex += 1;
      return;
    }
    if (/^\s{0,3}(?:\*{3,}|-{3,}|_{3,})\s*$/.test(line)) {
      closeList();
      container.appendChild(document.createElement("hr"));
      return;
    }
    const image = line.match(/^!\[([^\]]*)\]\(([^)]+)\)\s*$/);
    if (image && isSafeMarkdownImageUrl(image[2].trim())) {
      closeList();
      const figure = document.createElement("figure");
      figure.className = "source-notes-image";
      const imageElement = document.createElement("img");
      imageElement.src = image[2].trim();
      imageElement.alt = image[1];
      figure.appendChild(imageElement);
      if (image[1]) {
        appendMarkdownElement(figure, "figcaption", image[1]);
      }
      container.appendChild(figure);
      return;
    }
    const quote = line.match(/^>\s+(.+)$/);
    if (quote) {
      closeList();
      appendMarkdownElement(container, "blockquote", quote[1]);
      return;
    }
    const item = line.match(/^[-*+]\s+(.+)$/) || line.match(/^\d+\.\s+(.+)$/);
    if (item) {
      const nextListType = /^\d+\./.test(line) ? "ol" : "ul";
      if (!list || listType !== nextListType) {
        list = document.createElement(nextListType);
        listType = nextListType;
        container.appendChild(list);
      }
      const listItem = document.createElement("li");
      appendInlineMarkdown(listItem, item[1]);
      list.appendChild(listItem);
      return;
    }
    closeList();
    if (line.trim()) {
      appendMarkdownElement(container, "p", line);
    }
  });
  flushCodeBlock();
  flushTable();
}
function renderSourceNotesOutline(container, markdown, headingPrefix) {
  clearNode(container);
  const headings = markdown.split(/\r?\n/).map((line) => line.match(/^(#{2,4})\s+(.+)$/)).filter(Boolean);
  headings.forEach((heading, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "source-notes-outline-link";
    button.textContent = heading[2];
    button.addEventListener("click", () => {
      document.getElementById(`${headingPrefix}-${index}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    container.appendChild(button);
  });
  container.hidden = headings.length === 0;
}
function getQuickReviewItems(entry) {
  const summary = normalizeText(entry.summary);
  return entry.conclusion.filter((item) => normalizeText(item) !== summary).slice(0, 3);
}
function getNextReviewEntry(entry) {
  return getDailyTaskEntries(studyData.entries).find((candidate) => candidate.id !== entry.id)
    || studyData.entries.find((candidate) => candidate.topic === entry.topic && candidate.id !== entry.id)
    || studyData.entries.find((candidate) => candidate.id !== entry.id);
}
function getNextTopicEntry(entry) {
  return studyData.entries.find((candidate) => candidate.topic === entry.topic && candidate.id !== entry.id);
}
function updateRenderedCardProgress(entryId) {
  const card = cardList.querySelector(`[data-entry-id="${entryId}"]`);
  if (!card) {
    return;
  }
  const progress = getProgress(entryId);
  const entry = studyData.entries.find((item) => item.id === entryId);
  const meta = card.querySelector(".card-meta");
  if (meta) {
    meta.textContent = `更新于 ${entry?.updatedAt || "-"} · ${formatReviewDate(progress.reviewedAt)}`;
  }
  card.querySelector('[data-mastery-action="known"]')?.classList.toggle("active", progress.status === "known");
  card.querySelector('[data-mastery-action="weak"]')?.classList.toggle("active", progress.status === "weak");
  card.querySelector('[data-mastery-action="favorite"]')?.classList.toggle("active", progress.favorite);
}
function renderCards(entries, totalEntries = entries.length) {
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
    const sourceNotesOutline = fragment.querySelector(".source-notes-outline");
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
    clearNode(summary);
    appendInlineMarkdown(summary, entry.summary);
    summary.hidden = state.quizMode && !isExpanded;
    hint.hidden = !(state.quizMode && !isExpanded);
    toggleButton.textContent = isExpanded
      ? (sourceNotes ? "收起完整笔记" : "收起详情")
      : state.quizMode
        ? "查看解析"
        : (sourceNotes ? "展开完整笔记" : "展开详情");
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
    if (sourceNotes && isExpanded) {
      renderSourceNotesOutline(sourceNotesOutline, sourceNotes, `${entry.id}-note`);
      renderSourceNotes(sourceNotesBlock.querySelector(".source-notes"), sourceNotes, mermaidNodes, `${entry.id}-note`);
    }
    const tabs = [...fragment.querySelectorAll("[data-detail-tab]")];
    const panes = [...fragment.querySelectorAll("[data-detail-pane]")];
    const availableTabs = new Set(["overview"]);
    if (sourceNotes) availableTabs.add("notes");
    if (entry.journalEntries.length > 0) availableTabs.add("journal");
    tabs.forEach((tab) => {
      const tabName = tab.dataset.detailTab;
      tab.hidden = !availableTabs.has(tabName);
      tab.addEventListener("click", () => {
        tabs.forEach((button) => {
          const active = button === tab;
          button.classList.toggle("active", active);
          button.setAttribute("aria-selected", String(active));
        });
        panes.forEach((pane) => {
          pane.hidden = pane.dataset.detailPane !== tabName;
        });
      });
    });
    const sections = [
      [".conclusion-list", getQuickReviewItems(entry)],
      [".reasoning-list", entry.reasoning],
      [".memory-list", entry.memory],
      [".pitfalls-list", entry.pitfalls]
    ];
    if (isExpanded) {
      sections.forEach(([selector, items]) => {
        const list = fragment.querySelector(selector);
        const block = list.closest(".section-block");
        if (block) {
          block.hidden = items.length === 0;
        }
        createListItems(list, items);
      });
      if (entry.journalEntries.length > 0) {
        entry.journalEntries.forEach((journalEntry) => {
          journalList.appendChild(createJournalEntryElement(journalEntry));
        });
      }
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
    if (isExpanded) {
      const nextReviewEntry = getNextReviewEntry(entry);
      const nextReviewBlock = fragment.querySelector(".next-review-block");
      const nextReviewActions = fragment.querySelector(".next-review-actions");
      if (nextReviewEntry) {
        nextReviewBlock.hidden = false;
        const nextButton = document.createElement("button");
        nextButton.type = "button";
        nextButton.className = "next-review-button";
        nextButton.textContent = `下一张优先复习：${nextReviewEntry.question}`;
        nextButton.addEventListener("click", () => openRelatedEntry(nextReviewEntry.id));
        nextReviewActions.appendChild(nextButton);
      }
      const nextTopicEntry = getNextTopicEntry(entry);
      if (nextTopicEntry && nextTopicEntry.id !== nextReviewEntry?.id) {
        const topicButton = document.createElement("button");
        topicButton.type = "button";
        topicButton.className = "next-review-button";
        topicButton.textContent = `本专题练习：${nextTopicEntry.question}`;
        topicButton.addEventListener("click", () => openRelatedEntry(nextTopicEntry.id));
        nextReviewActions.appendChild(topicButton);
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
  if (entries.length < totalEntries) {
    const loadMore = document.createElement("button");
    loadMore.type = "button";
    loadMore.className = "load-more-cards ghost-button";
    loadMore.textContent = `继续加载 ${Math.min(CARD_PAGE_SIZE, totalEntries - entries.length)} 条（剩余 ${totalEntries - entries.length} 条）`;
    loadMore.addEventListener("click", () => {
      uiState.cardLimit += CARD_PAGE_SIZE;
      renderResults();
      loadMore.focus();
    });
    cardList.appendChild(loadMore);
  }
  renderMermaidDiagrams(mermaidNodes);
}
