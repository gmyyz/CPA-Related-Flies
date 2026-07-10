function getProgress(entryId) {
  return progressState[entryId] || {
    status: "new",
    favorite: false,
    reviewedAt: ""
  };
}
function getProgressRecordTimestamp(record) {
  return Math.max(parseDate(record?.updatedAt), parseDate(record?.reviewedAt));
}
function normalizeProgressRecord(record = {}) {
  const status = ["new", "known", "weak"].includes(record.status) ? record.status : "new";
  const reviewedAt = typeof record.reviewedAt === "string" ? record.reviewedAt : "";
  const updatedAt = typeof record.updatedAt === "string" && record.updatedAt ? record.updatedAt : reviewedAt;
  return {
    status,
    favorite: Boolean(record.favorite),
    reviewedAt,
    updatedAt
  };
}
function normalizeProgressState(value = {}) {
  return Object.entries(value || {}).reduce((result, [entryId, record]) => {
    if (typeof entryId === "string" && entryId) {
      result[entryId] = normalizeProgressRecord(record);
    }
    return result;
  }, {});
}
function mergeProgressStates(localProgress = {}, remoteProgress = {}) {
  const local = normalizeProgressState(localProgress);
  const remote = normalizeProgressState(remoteProgress);
  const entryIds = /* @__PURE__ */ new Set([...Object.keys(local), ...Object.keys(remote)]);
  const merged = {};
  let changed = 0;
  entryIds.forEach((entryId) => {
    const left = local[entryId];
    const right = remote[entryId];
    if (!left || !right) {
      merged[entryId] = left || right;
      if (!left || JSON.stringify(left) !== JSON.stringify(merged[entryId])) {
        changed += 1;
      }
      return;
    }
    const leftTime = getProgressRecordTimestamp(left);
    const rightTime = getProgressRecordTimestamp(right);
    const newer = rightTime > leftTime ? right : left;
    const equalTimeFavorite = Boolean(left.favorite || right.favorite);
    const reviewedAt = parseDate(right.reviewedAt) > parseDate(left.reviewedAt) ? right.reviewedAt : left.reviewedAt;
    const updatedAtTime = Math.max(leftTime, rightTime);
    const updatedAt = updatedAtTime ? new Date(updatedAtTime).toISOString() : "";
    merged[entryId] = {
      ...newer,
      favorite: leftTime === rightTime ? equalTimeFavorite : Boolean(newer.favorite),
      reviewedAt,
      updatedAt
    };
    if (JSON.stringify(left) !== JSON.stringify(merged[entryId])) {
      changed += 1;
    }
  });
  return { merged, changed };
}
function buildProgressPayload(progress = progressState) {
  return {
    version: 1,
    app: "cicpa-review-handbook",
    exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
    deviceId: getDeviceId(),
    dataUpdatedAt: studyData?.updatedAt || "",
    progress: normalizeProgressState(progress)
  };
}
function parseProgressPayload(rawContent) {
  const parsed = JSON.parse(rawContent || "{}");
  return parsed.progress ? parsed : { progress: parsed };
}
function updateProgress(entryId, patch, options = {}) {
  const current = getProgress(entryId);
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const next = {
    ...current,
    ...patch,
    updatedAt: now
  };
  if (options.touch !== false) {
    next.reviewedAt = now;
  }
  progressState[entryId] = next;
  persistProgress();
  scheduleCloudAutoPush();
  renderResults();
}
