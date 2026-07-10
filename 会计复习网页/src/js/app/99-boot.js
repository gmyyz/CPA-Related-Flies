const mermaidScript = document.querySelector('script[src*="mermaid"]');
if (mermaidScript) {
  mermaidScript.addEventListener("load", () => {
    if (initializeMermaid()) {
      renderResults();
    }
  });
}
boot();
