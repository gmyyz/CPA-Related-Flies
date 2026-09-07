const mergedEntryAliases = Object.freeze({
  "lease-unguaranteed-residual-value-discounting": "lease-net-investment-unguaranteed-residual-value",
  "asset-impairment-development-expenditure-presentation": "asset-impairment-mandatory-impairment-test-assets",
  "government-grants-unamortized-deferred-income-on-asset-disposal": "government-grants-deferred-income-amortization-start-point",
  "employee-benefits-internal-retirement-provision-payroll-payable": "employee-benefits-internal-retirement-termination-benefits",
  "subsequent-events-vs-policy-change-error-correction": "subsequent-events-error-discovered-after-reporting-date",
  "revenue-performance-and-control": "revenue-five-step-and-control",
  "non-monetary-exchange-inbound-fair-value-fees-vs-output-vat": "non-monetary-exchange-vat-boot-fees-examples",
  "fair-value-measurement-share-based-payment-special-rules": "fair-value-measurement-excluded-cases",
  "financial-instruments-fair-value-hedge-carrying-adjustment": "financial-instruments-25",
  "financial-instruments-written-call-fixed-for-fixed-equity": "financial-instruments-05",
  "accounting-policy-estimate-error-prospective-application-scenarios": "accounting-policy-estimate-error-three-types-treatment",
  "accounting-policy-estimate-error-retrospective-adjustment-vs-restatement": "accounting-policy-estimate-error-three-types-treatment",
  "accounting-policy-estimate-error-retrospective-journal-comparison": "accounting-policy-estimate-error-retrospective-adjustment-journal-logic",
  "accounting-policy-estimate-error-retrospective-adjustment-template": "accounting-policy-estimate-error-retrospective-adjustment-journal-logic",
  "debt-restructuring-debtor-debt-to-equity-fair-value-order": "debt-restructuring-debt-to-equity-substance-and-use",
  "debt-restructuring-creditor-nonfinancial-asset-taxes-cost": "debt-restructuring-creditor-assets-measurement-anchor",
  "income-tax-initial-recognition-exemption-not-year-end-catch-up": "income-tax-initial-recognition-exemption-core",
  "income-tax-single-transaction-lease-aro-exception": "income-tax-initial-recognition-exemption-core",
  "income-tax-investment-dtl-dta-asymmetry": "income-tax-equity-investment-temporary-differences-rules",
  "consolidation-downstream-minority-profit": "consolidation-downstream-upstream-comparison",
  "downstream-fixed-assets-depreciation": "consolidation-downstream-upstream-comparison"
});
function resolveMergedEntryId(entryId) {
  return Object.prototype.hasOwnProperty.call(mergedEntryAliases, entryId)
    ? mergedEntryAliases[entryId]
    : entryId;
}
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
  const result = {};
  // Fold retired cards first, so a canonical record wins equal-time status ties.
  const entries = Object.entries(value || {}).sort(([a], [b]) =>
    Number(Boolean(mergedEntryAliases[b])) - Number(Boolean(mergedEntryAliases[a]))
    || a.localeCompare(b));
  for (const [entryId, record] of entries) {
    if (!entryId) continue;
    const targetId = resolveMergedEntryId(entryId);
    const next = normalizeProgressRecord(record);
    const previous = result[targetId];
    if (!previous) {
      result[targetId] = next;
      continue;
    }
    const newer = getProgressRecordTimestamp(next) >= getProgressRecordTimestamp(previous) ? next : previous;
    result[targetId] = {
      ...newer,
      favorite: previous.favorite || next.favorite,
      reviewedAt: parseDate(next.reviewedAt) > parseDate(previous.reviewedAt) ? next.reviewedAt : previous.reviewedAt
    };
  }
  return result;
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
  if (isDashboardView()) {
    renderResults();
  } else {
    updateRenderedCardProgress(entryId);
  }
}
