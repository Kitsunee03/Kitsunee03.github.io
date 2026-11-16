/**
 * Mounts canvas visuals declared in markup:
 *
 *   <canvas data-visual="glyph-field" data-visual-options='{"size":48}'>
 *
 * Each visual is a separate module loaded on demand, so a page only pays
 * for the effects it actually shows. A future /playground/ route can mount
 * the same modules without touching the main pages.
 */
import type { Dispose } from "./core/lifecycle";

type VisualModule = {
  mount: (canvas: HTMLCanvasElement, options?: any) => Dispose;
};

const loaders: Record<string, () => Promise<VisualModule>> = {
  "glyph-field": () => import("./glyph-field"),
  "project-ambient": () => import("./project-ambient"),
  lattice: () => import("./lattice"),
};

const mounted = new Map<HTMLCanvasElement, Dispose>();
const pending = new WeakSet<HTMLCanvasElement>();

const readOptions = (canvas: HTMLCanvasElement) => {
  try {
    return JSON.parse(canvas.dataset.visualOptions || "{}");
  } catch {
    return {};
  }
};

/**
 * Mount every visual inside `root`. Canvases marked `data-visual-lazy` are
 * skipped unless `includeLazy` is set (used for content shown on demand).
 */
export function mountVisuals(root: ParentNode = document, includeLazy = false) {
  root
    .querySelectorAll<HTMLCanvasElement>("canvas[data-visual]")
    .forEach((canvas) => {
      if (mounted.has(canvas) || pending.has(canvas)) return;
      if (!includeLazy && canvas.hasAttribute("data-visual-lazy")) return;
      const load = loaders[canvas.dataset.visual || ""];
      if (!load) return;
      pending.add(canvas);
      load()
        .then((module) => {
          if (!pending.has(canvas)) return;
          pending.delete(canvas);
          if (!canvas.isConnected) return;
          mounted.set(canvas, module.mount(canvas, readOptions(canvas)));
        })
        .catch(() => pending.delete(canvas));
    });
}

/** Dispose every visual inside `root` (or all of them). */
export function unmountVisuals(root: ParentNode = document) {
  for (const [canvas, dispose] of mounted) {
    if (root !== document && !root.contains(canvas)) continue;
    dispose();
    mounted.delete(canvas);
  }
  root
    .querySelectorAll<HTMLCanvasElement>("canvas[data-visual]")
    .forEach((canvas) => pending.delete(canvas));
}
