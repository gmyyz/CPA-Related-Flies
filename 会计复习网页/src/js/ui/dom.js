function createListItems(listElement, items) {
  items.forEach((item) => {
    const li = document.createElement("li");
    if (typeof appendInlineMarkdown === "function") {
      appendInlineMarkdown(li, item);
    } else {
      li.textContent = item;
    }
    listElement.appendChild(li);
  });
}
function createJournalEntryElement(journalEntry) {
  const wrapper = document.createElement("div");
  wrapper.className = "journal-entry";
  const header = document.createElement("div");
  header.className = "journal-entry-header";
  const title = document.createElement("h5");
  title.className = "journal-entry-title";
  title.textContent = journalEntry.title || "分录";
  header.appendChild(title);
  const meta = document.createElement("span");
  meta.className = "journal-entry-meta";
  const metaItems = [journalEntry.scope, journalEntry.source === "auto" ? "自动提取" : "结构化"].filter(Boolean);
  meta.textContent = metaItems.join(" · ");
  header.appendChild(meta);
  wrapper.appendChild(header);
  if (journalEntry.condition) {
    const condition = document.createElement("p");
    condition.className = "journal-entry-condition";
    condition.textContent = journalEntry.condition;
    wrapper.appendChild(condition);
  }
  const body = document.createElement("pre");
  body.className = "journal-entry-body";
  body.textContent = journalEntry.body;
  wrapper.appendChild(body);
  if (journalEntry.note) {
    const note = document.createElement("p");
    note.className = "journal-entry-note";
    note.textContent = journalEntry.note;
    wrapper.appendChild(note);
  }
  return wrapper;
}
function clearNode(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}
function buildStatusPill(text, variant = "") {
  const span = document.createElement("span");
  span.className = variant ? `status-pill ${variant}` : "status-pill";
  span.textContent = text;
  return span;
}
function createEmptyStateElement(message, details) {
  const empty = document.createElement("div");
  empty.className = "panel empty-state";
  const title = document.createElement("h3");
  title.textContent = message;
  empty.appendChild(title);
  const paragraph = document.createElement("p");
  paragraph.textContent = details;
  empty.appendChild(paragraph);
  return empty;
}
function renderEmptyState(message, details) {
  clearNode(cardList);
  const empty = createEmptyStateElement(message, details);
  cardList.appendChild(empty);
}
function renderErrorState(errorMessage) {
  clearNode(cardList);
  const error = document.createElement("div");
  error.className = "panel error-state";
  const title = document.createElement("h3");
  title.textContent = "数据加载失败";
  error.appendChild(title);
  const paragraph = document.createElement("p");
  paragraph.textContent = errorMessage;
  error.appendChild(paragraph);
  cardList.appendChild(error);
}
function createInlineEmptyState(message, details) {
  const empty = document.createElement("div");
  empty.className = "empty-state inline-empty-state";
  const title = document.createElement("h3");
  title.textContent = message;
  empty.appendChild(title);
  const paragraph = document.createElement("p");
  paragraph.textContent = details;
  empty.appendChild(paragraph);
  return empty;
}
