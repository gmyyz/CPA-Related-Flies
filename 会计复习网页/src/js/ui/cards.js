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
      if (uiState.expandedIds.has(entry.id)) {
        uiState.expandedIds.delete(entry.id);
      } else {
        uiState.expandedIds.add(entry.id);
      }
      renderResults();
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
