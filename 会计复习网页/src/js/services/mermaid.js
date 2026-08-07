let mermaidLoadPromise = null;
function loadMermaid() {
  if (typeof window.mermaid !== "undefined") {
    return Promise.resolve(window.mermaid);
  }
  if (mermaidLoadPromise) {
    return mermaidLoadPromise;
  }
  const source = document.querySelector("#mermaid-source")?.textContent?.trim();
  if (!source) {
    return Promise.reject(new Error("离线 Mermaid 资源不可用。"));
  }
  mermaidLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.text = source;
    document.head.appendChild(script);
    window.setTimeout(() => {
      if (typeof window.mermaid !== "undefined") {
        resolve(window.mermaid);
      } else {
        reject(new Error("离线 Mermaid 初始化失败。"));
      }
    }, 0);
  });
  return mermaidLoadPromise;
}
function initializeMermaid() {
  if (mermaidInitialized || typeof window.mermaid === "undefined") {
    return mermaidInitialized;
  }
  window.mermaid.initialize({
    startOnLoad: false,
    theme: "base",
    securityLevel: "loose",
    themeVariables: {
      primaryColor: "#fff7ec",
      primaryTextColor: "#1c160f",
      primaryBorderColor: "#b6542a",
      lineColor: "#7f2f16",
      secondaryColor: "#eef7f4",
      tertiaryColor: "#fffdf8",
      fontFamily: "Microsoft YaHei, PingFang SC, sans-serif"
    }
  });
  mermaidInitialized = true;
  return true;
}
async function renderMermaidDiagrams(nodes = []) {
  if (!nodes.length) {
    return;
  }
  try {
    await loadMermaid();
  } catch (error) {
    nodes.forEach((node) => {
      const fallback = node.parentElement.querySelector(".diagram-fallback");
      if (fallback) {
        fallback.hidden = false;
        fallback.textContent = node.textContent || "思维导图加载失败。";
      }
    });
    return;
  }
  if (!initializeMermaid()) {
    return;
  }
  nodes.forEach((node) => {
    node.removeAttribute("data-processed");
  });
  try {
    await window.mermaid.run({ nodes });
  } catch (error) {
    nodes.forEach((node) => {
      const fallback = node.parentElement.querySelector(".diagram-fallback");
      if (fallback) {
        fallback.hidden = false;
        fallback.textContent = node.textContent || "思维导图加载失败。";
      }
    });
  }
}
