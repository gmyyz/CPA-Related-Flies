function formatJournalLine(line) {
  if (typeof line === "string") {
    return line.trim();
  }
  if (!line || typeof line !== "object") {
    return "";
  }
  const side = String(line.side || "").trim();
  const account = String(line.account || "").trim();
  const amount = String(line.amount || "").trim();
  const note = String(line.note || "").trim();
  const prefix = side ? `${side}：` : "";
  const parts = [`${prefix}${account}`.trim(), amount, note].filter(Boolean);
  return parts.join("  ");
}
function normalizeJournalLine(line) {
  if (!line || typeof line !== "object") {
    return null;
  }
  const side = String(line.side || "").trim();
  const account = String(line.account || "").trim();
  const amount = String(line.amount || "").trim();
  const note = String(line.note || "").trim();
  if (!side || !account) {
    return null;
  }
  return { side, account, amount, note };
}
function normalizeJournalEntries(value) {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.map((item, index) => {
    if (typeof item === "string") {
      const body2 = item.trim();
      return {
        title: `分录 ${index + 1}`,
        scope: "",
        condition: "",
        body: body2,
        note: "",
        source: "manual",
        lines: parseJournalBodyLines(body2)
      };
    }
    if (!item || typeof item !== "object") {
      return null;
    }
    const lines = Array.isArray(item.lines) ? item.lines.map(normalizeJournalLine).filter(Boolean) : [];
    const body = String(item.body || item.text || item.entry || lines.map(formatJournalLine).join("\n") || "").trim();
    if (!body) {
      return null;
    }
    const parsedLines = lines.length > 0 ? lines : parseJournalBodyLines(body);
    return {
      title: String(item.title || `分录 ${index + 1}`).trim(),
      scope: String(item.scope || "").trim(),
      condition: String(item.condition || "").trim(),
      body,
      note: String(item.note || "").trim(),
      source: "manual",
      lines: parsedLines
    };
  }).filter(Boolean);
}
function extractJournalEntriesFromText(text, indexBase = 0) {
  const sourceText = String(text || "");
  const matches = [...sourceText.matchAll(/```(?:text)?\s*\n([\s\S]*?)```/g)];
  const heading = sourceText.match(/^【([^】]+)】/);
  return matches.map((match, index) => match[1].trim()).filter((body) => /借：/.test(body) && /贷：/.test(body)).map((body, index) => ({
    title: heading?.[1] || `自动识别分录 ${indexBase + index + 1}`,
    scope: "",
    condition: "",
    body,
    note: "从卡片正文中的明确分录代码块自动提取。",
    source: "auto",
    lines: parseJournalBodyLines(body)
  }));
}
function buildAutoJournalEntries(entry) {
  const candidates = [
    ...entry.conclusion,
    ...entry.reasoning,
    ...entry.memory,
    ...entry.pitfalls
  ];
  const journalEntries = candidates.flatMap((item, index) => extractJournalEntriesFromText(item, index));
  const seen = /* @__PURE__ */ new Set();
  return journalEntries.filter((journalEntry) => {
    const key = journalEntry.body;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}
function getJournalText(journalEntry) {
  return [
    journalEntry.title,
    journalEntry.scope,
    journalEntry.condition,
    journalEntry.body,
    journalEntry.note
  ].filter(Boolean).join(" ");
}
function splitJournalDetail(text) {
  const parts = String(text || "").trim().split(/\s{2,}/).filter(Boolean);
  if (parts.length === 0) {
    return { account: "", amount: "", note: "" };
  }
  const [account, amount = "", ...noteParts] = parts;
  return {
    account,
    amount,
    note: noteParts.join("  ")
  };
}
function parseJournalBodyLines(body) {
  const lines = String(body || "").split(/\n+/);
  const parsed = [];
  let currentSide = "";
  lines.forEach((rawLine) => {
    const text = rawLine.trim();
    if (!text || /^```/.test(text)) {
      return;
    }
    const sideMatch = text.match(/^(借|贷|借\/贷|借或贷)\s*[:：]\s*(.+)$/);
    if (sideMatch) {
      currentSide = sideMatch[1].startsWith("贷") ? "贷" : "借";
      const detail2 = splitJournalDetail(sideMatch[2]);
      if (detail2.account) {
        parsed.push({ side: currentSide, ...detail2 });
      }
      return;
    }
    if (!currentSide) {
      return;
    }
    const detail = splitJournalDetail(text);
    if (detail.account) {
      parsed.push({ side: currentSide, ...detail });
    }
  });
  return parsed;
}
function getJournalAccounts(journalEntry) {
  return [...new Set((journalEntry.lines || []).map((line) => line.account).filter(Boolean))];
}
function getJournalItemSearchText(item) {
  return normalizeText([
    item.entry.question,
    item.entry.topic,
    item.entry.difficulty,
    getJournalText(item.journalEntry),
    ...item.accounts
  ].join(" "));
}
function getJournalItems(entries) {
  return entries.flatMap((entry) => entry.journalEntries.map((journalEntry, index) => {
    const lines = Array.isArray(journalEntry.lines) ? journalEntry.lines : [];
    const accounts = getJournalAccounts(journalEntry);
    const item = {
      id: `${entry.id}-${index}`,
      entry,
      journalEntry,
      lines,
      accounts
    };
    return {
      ...item,
      searchText: getJournalItemSearchText(item)
    };
  }));
}
function getFilteredJournalItems(entries) {
  return getJournalItems(entries).filter((item) => {
    const searchMatch = !state.journalSearch || item.searchText.includes(state.journalSearch);
    const sideMatch = state.journalSide === "全部" || item.lines.some((line) => line.side === state.journalSide);
    const accountMatch = state.journalAccount === "全部" || item.accounts.includes(state.journalAccount);
    const sourceMatch = state.journalSource === "全部" || item.journalEntry.source === state.journalSource;
    return searchMatch && sideMatch && accountMatch && sourceMatch;
  });
}
function getJournalAccountItems(journalItems) {
  const counts = /* @__PURE__ */ new Map();
  journalItems.forEach((item) => {
    item.accounts.forEach((account) => {
      counts.set(account, (counts.get(account) || 0) + 1);
    });
  });
  return [...counts.entries()].map(([value, count]) => ({ value, count })).sort((left, right) => {
    if (right.count !== left.count) {
      return right.count - left.count;
    }
    return left.value.localeCompare(right.value, "zh-CN");
  });
}
function getJournalStats(entries, journalItems) {
  const sourceEntryIds = new Set(journalItems.map((item) => item.entry.id));
  const accounts = new Set(journalItems.flatMap((item) => item.accounts));
  return {
    entries: entries.length,
    journals: journalItems.length,
    sourceEntries: sourceEntryIds.size,
    accounts: accounts.size
  };
}
function getJournalCopyText(item) {
  const lineText = item.lines.length > 0 ? item.lines.map(formatJournalLine).join("\n") : item.journalEntry.body;
  return [
    item.journalEntry.title || "分录",
    item.journalEntry.condition ? `条件：${item.journalEntry.condition}` : "",
    lineText,
    item.journalEntry.note ? `备注：${item.journalEntry.note}` : "",
    `来源：${item.entry.question}`
  ].filter(Boolean).join("\n");
}
