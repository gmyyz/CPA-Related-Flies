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
  ...(window.studyData?.chapters || [])
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
