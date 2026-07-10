function persistProgress() {
  try {
    window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progressState));
  } catch (error) {
  }
}
function readProgressState() {
  try {
    const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    return {};
  }
}
function readCloudSyncState() {
  try {
    const raw = window.localStorage.getItem(CLOUD_SYNC_STORAGE_KEY);
    if (!raw) {
      return {};
    }
    const { token, ...storedState } = JSON.parse(raw);
    return storedState;
  } catch (error) {
    return {};
  }
}
function persistCloudSyncState() {
  try {
    const { token, ...persistableState } = cloudSyncState;
    window.localStorage.setItem(CLOUD_SYNC_STORAGE_KEY, JSON.stringify(persistableState));
  } catch (error) {
    setCloudSyncStatus("云同步配置保存失败，请检查浏览器存储权限。", "error");
  }
}
function getDeviceId() {
  if (!cloudSyncState.deviceId) {
    cloudSyncState.deviceId = `device-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    persistCloudSyncState();
  }
  return cloudSyncState.deviceId;
}
function hasCloudCredentials() {
  return Boolean(cloudSessionToken && cloudSyncState.gistId);
}
function formatSyncTime(value) {
  const timestamp = parseDate(value);
  if (!timestamp) {
    return "从未同步";
  }
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(timestamp));
}
function setCloudSyncStatus(message, variant = "") {
  cloudSyncStatus.textContent = message;
  cloudSyncStatus.classList.toggle("success", variant === "success");
  cloudSyncStatus.classList.toggle("error", variant === "error");
}
function syncCloudControls() {
  gistTokenInput.value = cloudSessionToken;
  gistIdInput.value = cloudSyncState.gistId || "";
  gistAutoSyncCheckbox.checked = Boolean(cloudSyncState.autoSync);
  const status = cloudSyncState.gistId ? `已连接 Gist：${cloudSyncState.gistId}。最近同步：${formatSyncTime(cloudSyncState.lastSyncedAt)}。${cloudSessionToken ? "" : " 重新打开页面后需要再次输入 Token。"}` : "未连接云端。Token 只保存在当前页面内存，不会写入项目文件。";
  setCloudSyncStatus(status, cloudSyncState.gistId && cloudSessionToken ? "success" : "");
}
function saveCloudSyncControls() {
  cloudSessionToken = gistTokenInput.value.trim();
  cloudSyncState = {
    ...cloudSyncState,
    gistId: gistIdInput.value.trim(),
    autoSync: gistAutoSyncCheckbox.checked
  };
  getDeviceId();
  persistCloudSyncState();
  syncCloudControls();
}
async function requestGist(path, options = {}) {
  if (!cloudSessionToken) {
    throw new Error("请先填写 GitHub Token。本页面不会保存 Token，刷新后需要重新输入。");
  }
  const response = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${cloudSessionToken}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...options.headers || {}
    }
  });
  if (!response.ok) {
    const details = await response.json().catch(() => ({}));
    throw new Error(details.message || `GitHub 请求失败：${response.status}`);
  }
  return response.json();
}
async function readRemoteProgressPayload() {
  if (!cloudSyncState.gistId) {
    throw new Error("请先填写 Gist ID，或先推送本机进度创建私有 Gist。");
  }
  const gist = await requestGist(`/gists/${cloudSyncState.gistId}`);
  const file = gist.files?.[GIST_PROGRESS_FILENAME] || Object.values(gist.files || {})[0];
  if (!file?.content) {
    throw new Error("这个 Gist 中没有找到可用的进度 JSON 文件。");
  }
  return parseProgressPayload(file.content);
}
async function writeRemoteProgressPayload(payload) {
  const content = JSON.stringify(payload, null, 2);
  if (!cloudSyncState.gistId) {
    const gist = await requestGist("/gists", {
      method: "POST",
      body: JSON.stringify({
        description: "CICPA review progress sync",
        public: false,
        files: {
          [GIST_PROGRESS_FILENAME]: { content }
        }
      })
    });
    cloudSyncState.gistId = gist.id;
    gistIdInput.value = gist.id;
  } else {
    await requestGist(`/gists/${cloudSyncState.gistId}`, {
      method: "PATCH",
      body: JSON.stringify({
        files: {
          [GIST_PROGRESS_FILENAME]: { content }
        }
      })
    });
  }
  cloudSyncState.lastSyncedAt = (/* @__PURE__ */ new Date()).toISOString();
  persistCloudSyncState();
  syncCloudControls();
}
function applyMergedProgress(mergedProgress) {
  progressState = normalizeProgressState(mergedProgress);
  persistProgress();
  renderResults();
}
async function pullCloudProgress(options = {}) {
  saveCloudSyncControls();
  if (!cloudSyncState.gistId) {
    throw new Error("拉取前需要填写 Gist ID。");
  }
  if (!options.silent) {
    setCloudSyncStatus("正在拉取云端进度...");
  }
  const payload = await readRemoteProgressPayload();
  const { merged, changed } = mergeProgressStates(progressState, payload.progress);
  applyMergedProgress(merged);
  cloudSyncState.lastSyncedAt = (/* @__PURE__ */ new Date()).toISOString();
  persistCloudSyncState();
  syncCloudControls();
  setCloudSyncStatus(`已拉取并合并云端进度，更新本机 ${changed} 条。`, "success");
}
async function pushCloudProgress(options = {}) {
  saveCloudSyncControls();
  if (!options.silent) {
    setCloudSyncStatus(cloudSyncState.gistId ? "正在推送本机进度..." : "正在创建私有 Gist...");
  }
  await writeRemoteProgressPayload(buildProgressPayload());
  setCloudSyncStatus(`已推送本机进度。最近同步：${formatSyncTime(cloudSyncState.lastSyncedAt)}。`, "success");
}
async function syncCloudProgress() {
  saveCloudSyncControls();
  setCloudSyncStatus("正在双向同步...");
  if (!cloudSyncState.gistId) {
    await pushCloudProgress({ silent: true });
    setCloudSyncStatus(`已创建私有 Gist 并推送本机进度：${cloudSyncState.gistId}`, "success");
    return;
  }
  const payload = await readRemoteProgressPayload();
  const { merged, changed } = mergeProgressStates(progressState, payload.progress);
  applyMergedProgress(merged);
  await writeRemoteProgressPayload(buildProgressPayload(merged));
  setCloudSyncStatus(`双向同步完成，合并 ${changed} 条本机更新。`, "success");
}
async function runCloudAction(action) {
  const buttons = [saveGistSyncButton, syncGistNowButton, pullGistProgressButton, pushGistProgressButton];
  try {
    buttons.forEach((button) => {
      button.disabled = true;
    });
    await action();
  } catch (error) {
    setCloudSyncStatus(error.message || "云端同步失败，请检查 Token、Gist ID 和网络。", "error");
  } finally {
    buttons.forEach((button) => {
      button.disabled = false;
    });
  }
}
function scheduleCloudAutoPush() {
  if (!cloudSyncState.autoSync || !hasCloudCredentials()) {
    return;
  }
  window.clearTimeout(cloudSyncDebounceTimer);
  cloudSyncDebounceTimer = window.setTimeout(() => {
    runCloudAction(() => pushCloudProgress({ silent: true }));
  }, 4e3);
}
