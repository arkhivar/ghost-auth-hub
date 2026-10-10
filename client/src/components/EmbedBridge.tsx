import { useEffect } from "react";

// Posts the document height to the parent window so the iframe can auto-resize
export default function EmbedBridge() {
  useEffect(() => {
    const post = () => {
      const height = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
      try {
        window.parent?.postMessage({ type: "cli-embed:height", height }, "*");
      } catch {}
    };

    // Initial and event-based updates
    post();
    const onResize = () => post();
    window.addEventListener("load", post);
    window.addEventListener("resize", onResize);

    // Observe DOM changes to keep height in sync (toasts, tab switches, etc.)
    const observer = new MutationObserver(() => post());
    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true,
    });

    // Fallback timer in case observer misses something
    const interval = setInterval(post, 1500);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", post);
      clearInterval(interval);
    };
  }, []);

  return null;
}
