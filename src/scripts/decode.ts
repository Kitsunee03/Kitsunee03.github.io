/**
 * Decode effect for section titles: the text resolves left to right out of
 * a few terminal glyphs, once. If anything else rewrites the text
 * mid-animation, that text wins.
 */
const GLYPHS = "01<>/_#";
const DURATION = 420;

const running = new WeakMap<HTMLElement, number>();

export function decodeText(element: HTMLElement) {
  const finalText = element.textContent || "";
  if (!finalText.trim() || running.has(element)) return;

  const start = performance.now();
  let shown = finalText;

  const step = (now: number) => {
    // Something else replaced the text: stop.
    if (element.textContent !== shown) {
      running.delete(element);
      return;
    }
    const progress = Math.min(1, (now - start) / DURATION);
    const resolved = Math.floor(progress * finalText.length);
    if (progress >= 1) {
      element.textContent = finalText;
      running.delete(element);
      return;
    }
    let next = finalText.slice(0, resolved);
    for (let i = resolved; i < finalText.length; i += 1) {
      const char = finalText[i];
      next +=
        char === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    }
    shown = next;
    element.textContent = next;
    running.set(element, requestAnimationFrame(step));
  };

  running.set(element, requestAnimationFrame(step));
}
