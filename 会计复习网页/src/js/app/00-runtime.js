const STORAGE_KEY = "cicpa-review-state";
const PROGRESS_STORAGE_KEY = "cicpa-review-progress";
const CLOUD_SYNC_STORAGE_KEY = "cicpa-review-cloud-sync";
const GIST_PROGRESS_FILENAME = "cicpa-review-progress.json";
const REVIEW_INTERVAL_DAYS = 7;
const DAY_IN_MS = 24 * 60 * 60 * 1e3;
const SEARCH_DEBOUNCE_MS = 180;
const DAILY_TASK_LIMIT = 18;
const CARD_PAGE_SIZE = 20;
const defaultState = {
  viewMode: "dashboard",
  search: "",
  chapter: "全部",
  topic: "全部",
  tag: "全部",
  reviewFilter: "全部",
  sort: "default",
  quizMode: false,
  journalMode: false,
  journalSearch: "",
  journalSide: "全部",
  journalAccount: "全部",
  journalSource: "全部",
  randomEntryId: null,
  randomEntrySource: ""
};
const difficultyRank = {
  "高频易错": 3,
  "高频提高": 2,
  "高频基础": 1
};
const reviewFilterLabels = {
  "全部": "全部",
  daily: "今日任务",
  unreviewed: "未复习",
  weak: "薄弱",
  "high-risk": "高频易错未掌握",
  stale: "7 天没复习",
  "favorite-open": "收藏未掌握"
};
const chapterDefinitions = [
  { id: "全部", title: "全部章节", topics: [] },
  { id: "overview", title: "第一章 总论", topics: ["总论"] },
  { id: "inventory", title: "第二章 存货", topics: ["存货"] },
  { id: "fixed-assets", title: "第三章 固定资产", topics: ["固定资产"] },
  { id: "intangible-assets", title: "第四章 无形资产", topics: ["无形资产"] },
  { id: "investment-property", title: "第五章 投资性房地产", topics: ["投资性房地产"] },
  { id: "long-term-equity-investments", title: "第六章 长期股权投资与合营安排", topics: ["长期股权投资"] },
  { id: "impairment", title: "第七章 资产减值", topics: ["资产减值"] },
  { id: "liabilities", title: "第八章 负债", topics: ["负债"] },
  { id: "employee-benefits", title: "第九章 职工薪酬", topics: ["应付职工薪酬"] },
  { id: "share-based-payment", title: "第十章 股份支付", topics: ["股份支付"] },
  { id: "borrowing-costs", title: "第十一章 借款费用", topics: ["借款费用"] },
  { id: "contingencies", title: "第十二章 或有事项", topics: ["或有事项"] },
  { id: "financial-instruments", title: "第十三章 金融工具与保险合同", topics: ["金融工具"] },
  { id: "lease", title: "第十四章 租赁", topics: ["租赁"] },
  { id: "held-for-sale", title: "第十五章 持有待售的非流动资产、处置组和终止经营", topics: ["持有待售和终止经营"] },
  { id: "owners-equity", title: "第十六章 所有者权益", topics: [] },
  { id: "revenue", title: "第十七章 收入、费用和利润", topics: ["收入准则"] },
  { id: "government-grants", title: "第十八章 政府补助", topics: ["政府补助"] },
  { id: "income-tax", title: "第十九章 所得税", topics: ["所得税费用"] },
  { id: "non-monetary-exchange", title: "第二十章 非货币性资产交换", topics: ["非货币性资产交换"] },
  { id: "debt-restructuring", title: "第二十一章 债务重组", topics: ["债务重组"] },
  { id: "foreign-currency-translation", title: "第二十二章 外币折算", topics: ["外币折算"] },
  { id: "financial-reporting", title: "第二十三章 财务报告", topics: ["财务报告"], entryIds: ["financial-reporting-offsetting-vs-net-presentation", "financial-reporting-liability-current-noncurrent-presentation", "financial-reporting-current-noncurrent-line-items-table", "financial-reporting-prepaid-rent-vs-contract-liability-vat", "financial-reporting-revenue-financial-instrument-line-items", "financial-reporting-cash-flow-bill-discounting", "financial-reporting-cash-flow-bill-endorsement-materials", "financial-reporting-cash-flow-pledged-time-deposit", "financial-reporting-cash-flow-lessee-lease-payments", "financial-reporting-reportable-segment-new-and-continuing", "financial-reporting-related-party-identification-framework", "financial-reporting-related-party-consolidated-scope-disclosure", "financial-reporting-related-party-group-boundary-associates", "financial-reporting-annual-vs-interim-reporting", "financial-reporting-cash-flow-investing-items", "financial-reporting-cash-flow-financing-items", "financial-reporting-cash-flow-exchange-rate-and-supplement"] },
  { id: "accounting-changes", title: "第二十四章 会计政策、会计估计及其变更和差错更正", topics: ["会计政策、会计估计及差错更正"] },
  { id: "subsequent-events", title: "第二十五章 资产负债表日后事项", topics: ["资产负债表日后事项"] },
  { id: "business-combinations", title: "第二十六章 企业合并", topics: ["合并财务报表"], entryIds: ["consolidation-common-control-retained-earnings-restore", "consolidation-contingent-consideration-common-vs-noncommon", "consolidation-contingent-consideration-own-shares-fixed-for-fixed", "consolidation-contingent-consideration-profit-commitment", "consolidation-indemnification-asset-litigation", "consolidation-measurement-period-contingent-consideration-goodwill", "consolidation-reverse-acquisition-cost-minority-interest", "consolidation-deferred-tax-recognition-and-offsetting"] },
  { id: "consolidation", title: "第二十七章 合并财务报表", topics: ["合并财务报表"], entryIds: ["consolidation-downstream-minority-profit", "consolidation-downstream-upstream-comparison", "fixed-assets-internal-trade-core-logic", "downstream-fixed-assets-depreciation", "consolidation-variable-returns-control", "consolidation-investment-income-profit-distribution-bridge", "consolidation-workpaper-main-sequence-and-dependencies", "consolidation-inventory-rollforward-opening-differences"] },
  { id: "earnings-per-share", title: "第二十八章 每股收益", topics: ["财务报告"], entryIds: ["financial-reporting-basic-eps-common-control-share-weighting", "financial-reporting-diluted-eps-potential-shares-forward-repurchase", "financial-reporting-basic-eps-restricted-stock-vesting-period", "financial-reporting-diluted-eps-restricted-stock-treasury-stock-method", "financial-reporting-diluted-eps-multiple-potential-ordinary-shares-order", "financial-reporting-basic-eps-rights-issue-bonus-element", "financial-reporting-eps-retrospective-recalculation-events"] },
  { id: "fair-value", title: "第二十九章 公允价值计量", topics: ["公允价值计量"] },
  { id: "government-accounting", title: "第三十章 政府及民间非营利组织会计", topics: ["政府会计"] }
];
const searchInput = document.querySelector("#search-input");
const controlsPanel = document.querySelector(".controls");
const filterPanelToggle = document.querySelector("#filter-panel-toggle");
const chapterFilters = document.querySelector("#chapter-filters");
const tagFilters = document.querySelector("#tag-filters");
const sortSelect = document.querySelector("#sort-select");
const quizModeCheckbox = document.querySelector("#quiz-mode");
const reviewFilters = document.querySelector("#review-filters");
const cardList = document.querySelector("#card-list");
const resultsMeta = document.querySelector("#results-meta");
const entryCount = document.querySelector("#entry-count");
const updatedAt = document.querySelector("#updated-at");
const dataSource = document.querySelector("#data-source");
const contentTitle = document.querySelector("#content-title");
const contentSubtitle = document.querySelector("#content-subtitle");
const modeTip = document.querySelector("#mode-tip");
const clearFiltersButton = document.querySelector("#clear-filters");
const randomEntryButton = document.querySelector("#random-entry");
const journalLibraryButton = document.querySelector("#journal-library");
const viewModeButtons = document.querySelectorAll("[data-view-mode]");
const mobileActionButtons = document.querySelectorAll("[data-mobile-action]");
const closeFiltersButton = document.querySelector("#close-filters");
const restoreSessionButton = document.querySelector("#restore-session");
const gistTokenInput = document.querySelector("#gist-token-input");
const gistIdInput = document.querySelector("#gist-id-input");
const gistAutoSyncCheckbox = document.querySelector("#gist-auto-sync");
const saveGistSyncButton = document.querySelector("#save-gist-sync");
const syncGistNowButton = document.querySelector("#sync-gist-now");
const pullGistProgressButton = document.querySelector("#pull-gist-progress");
const pushGistProgressButton = document.querySelector("#push-gist-progress");
const cloudSyncStatus = document.querySelector("#cloud-sync-status");
const advancedSettingsToggle = document.querySelector("#advanced-settings-toggle");
const advancedSettingsPanel = document.querySelector("#advanced-settings-panel");
const quickActionButtons = document.querySelectorAll("[data-quick-action]");
const cardTemplate = document.querySelector("#card-template");
const state = {
  ...defaultState
};
const uiState = {
  expandedIds: /* @__PURE__ */ new Set(),
  expandedTagGroups: /* @__PURE__ */ new Set(),
  cardLimit: CARD_PAGE_SIZE
};
let studyData = null;
let chapters = [];
let topics = [];
let tags = [];
let tagGroups = [];
let progressState = {};
let cloudSyncState = {};
let cloudSessionToken = "";
let searchInputDebounceTimer = 0;
let journalSearchInputDebounceTimer = 0;
let cloudSyncDebounceTimer = 0;
const TAG_GROUP_COLLAPSED_LIMIT = 8;
const hiddenTags = /* @__PURE__ */ new Set(["Markdown同步"]);
let mermaidInitialized = false;
