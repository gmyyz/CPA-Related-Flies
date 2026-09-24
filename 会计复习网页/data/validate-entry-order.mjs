export function indexOrderedEntries(entries, entryOrder) {
  const byId = new Map();
  for (const entry of entries) {
    if (!entry.id) throw new Error("卡片缺少 ID");
    if (byId.has(entry.id)) throw new Error(`专题卡片 ID 重复：${entry.id}`);
    byId.set(entry.id, entry);
  }
  const orderedIds = new Set();
  for (const id of entryOrder) {
    if (orderedIds.has(id)) throw new Error(`entryOrder ID 重复：${id}`);
    if (!byId.has(id)) throw new Error(`entryOrder 引用了不存在的卡片：${id}`);
    orderedIds.add(id);
  }
  const missing = [...byId.keys()].filter((id) => !orderedIds.has(id));
  if (missing.length) throw new Error(`entryOrder 遗漏卡片：${missing.join(", ")}`);
  return byId;
}
