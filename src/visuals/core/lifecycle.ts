/**
 * Shared lifecycle for every canvas visual on the site.
 *
 * It owns the things each effect would otherwise get wrong on its own:
 * - one requestAnimationFrame loop, capped to a target frame rate
 * - paused while the canvas is off-screen or the tab is hidden
 * - devicePixelRatio capped, backing store resized with the element
 * - a single static frame when the visitor prefers reduced motion
 * - full cleanup of observers, listeners and the frame request
 */

export type LoopFrame = {
  /** CSS pixel size of the canvas. */
  width: number;
  height: number;
  /** Seconds since the visual was mounted, excluding paused time. */
  time: number;
  /** Seconds since the previous drawn frame. */
  delta: number;
};

export type Frame = LoopFrame & { ctx: CanvasRenderingContext2D };

type BaseSetup = {
  canvas: HTMLCanvasElement;
  fps?: number;
  maxDpr?: number;
  /**
   * Keep animating under prefers-reduced-motion. Only for things the
   * visitor explicitly starts, such as a game.
   */
  allowMotion?: boolean;
};

export type LoopSetup = BaseSetup & {
  /** Called on mount and whenever the size changes; the backing store is already resized. */
  resize?: (width: number, height: number, dpr: number) => void;
  draw: (frame: LoopFrame) => void;
};

export type VisualSetup = BaseSetup & {
  /** Called on mount and whenever the CSS size changes. */
  resize?: (width: number, height: number) => void;
  draw: (frame: Frame) => void;
};

export type Dispose = () => void;

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isCoarsePointer = () =>
  window.matchMedia("(pointer: coarse)").matches;

function createLoop(setup: LoopSetup): Dispose {
  const {
    canvas,
    fps = 30,
    maxDpr = 1.5,
    allowMotion = false,
    resize,
    draw,
  } = setup;

  const reduced = !allowMotion && prefersReducedMotion();
  const frameInterval = 1000 / fps;

  let width = 0;
  let height = 0;
  let raf = 0;
  let visible = false;
  let last = 0;
  let time = 0;
  let disposed = false;

  const render = (delta: number) => {
    if (!width || !height) return;
    time += delta;
    draw({ width, height, time, delta });
  };

  const fit = () => {
    const rect = canvas.getBoundingClientRect();
    const nextWidth = Math.round(rect.width);
    const nextHeight = Math.round(rect.height);
    if (nextWidth === width && nextHeight === height) return;
    width = nextWidth;
    height = nextHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    canvas.width = Math.max(1, Math.round(width * dpr));
    canvas.height = Math.max(1, Math.round(height * dpr));
    resize?.(width, height, dpr);
    // Resizing clears the canvas, so repaint immediately.
    render(0);
  };

  const tick = (now: number) => {
    raf = 0;
    if (disposed) return;
    const elapsed = now - last;
    if (elapsed >= frameInterval) {
      // Clamp so a long pause does not produce one huge simulation step.
      render(Math.min(elapsed, 100) / 1000);
      last = now - (elapsed % frameInterval);
    }
    schedule();
  };

  const shouldRun = () => !reduced && visible && !document.hidden && !disposed;

  const schedule = () => {
    if (raf || !shouldRun()) return;
    raf = requestAnimationFrame(tick);
  };

  const stop = () => {
    if (!raf) return;
    cancelAnimationFrame(raf);
    raf = 0;
  };

  const sync = () => {
    if (shouldRun()) {
      last = performance.now();
      schedule();
    } else {
      stop();
    }
  };

  const resizeObserver = new ResizeObserver(fit);
  resizeObserver.observe(canvas);

  const intersectionObserver = new IntersectionObserver((entries) => {
    visible = entries.some((entry) => entry.isIntersecting);
    sync();
  });
  intersectionObserver.observe(canvas);

  document.addEventListener("visibilitychange", sync);

  fit();

  return () => {
    disposed = true;
    stop();
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    document.removeEventListener("visibilitychange", sync);
  };
}

export function createVisual(setup: VisualSetup): Dispose {
  const ctx = setup.canvas.getContext("2d");
  if (!ctx) return () => {};
  return createLoop({
    ...setup,
    resize(width, height, dpr) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      setup.resize?.(width, height);
    },
    draw(frame) {
      setup.draw({ ...frame, ctx });
    },
  });
}
