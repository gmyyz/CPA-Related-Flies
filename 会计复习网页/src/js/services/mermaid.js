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
  if (!initializeMermaid() || !nodes.length) {
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
