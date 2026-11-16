/**
 * Lattice — a faint grid of points behind the quieter sections.
 *
 * The pointer casts a few threads that latch onto grid points about a
 * hundred pixels away, like the grapple rope in Junkonaut. A thread holds
 * its anchor while the pointer moves and re-latches to a new point once it
 * is stretched too far; the newest anchor flashes in the signal colour.
 * The grid brightens softly around the pointer, fast scrolling stretches it
 * a little, and with nothing happening nothing is redrawn.
 */
import {
  createVisual,
  isCoarsePointer,
  prefersReducedMotion,
  type Dispose,
} from "./core/lifecycle";

export type LatticeOptions = {
  /** Distance between points in CSS pixels. */
  spacing?: number;
  /** Number of threads cast from the pointer. */
  threads?: number;
};

const SIGNAL = "255,90,54";
const BASE_ALPHA = 0.1;
/** Radius of the soft glow around the pointer. */
const GLOW = 190;
/** Preferred thread length. */
const STEP = 96;
/** A thread longer than this lets go and re-latches. */
const SNAP = 150;
const MAX_STRETCH = 0.035;

type Thread = { angle: number; anchor: number };

export function mount(
  canvas: HTMLCanvasElement,
  options: LatticeOptions = {},
): Dispose {
  const coarse = isCoarsePointer();
  const reduced = prefersReducedMotion();
  const spacing = options.spacing ?? (coarse ? 30 : 26);
  const threadCount = options.threads ?? 5;

  let columns = 0;
  let rows = 0;
  let originX = 0;
  let originY = 0;
  /** Flash left on a point when a thread latches onto it (0–1). */
  let flash = new Float32Array(0);
  let latest = -1;
  let drewIdle = false;

  const threads: Thread[] = Array.from({ length: threadCount }, (_, i) => ({
    angle: (i / threadCount) * Math.PI * 2 - Math.PI / 2,
    anchor: -1,
  }));
  /** Overall visibility of the threads, eased in and out. */
  let presence = 0;

  // Pointer in viewport coordinates; converted to canvas space per frame.
  const pointer = { clientX: 0, clientY: 0, active: false, until: 0 };
  // Last pointer position in canvas space, kept so threads can fade out.
  const hand = { x: 0, y: 0 };

  let lastScroll = window.scrollY;
  let stretch = 0;

  const onMove = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    pointer.clientX = event.clientX;
    pointer.clientY = event.clientY;
    pointer.active = true;
    pointer.until = Infinity;
  };
  // A tap casts the threads briefly where the finger touched.
  const onDown = (event: PointerEvent) => {
    if (event.pointerType === "mouse") return;
    pointer.clientX = event.clientX;
    pointer.clientY = event.clientY;
    pointer.active = true;
    pointer.until = performance.now() + 900;
  };
  const onLeave = () => {
    pointer.active = false;
  };

  if (!reduced) {
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
  }

  const pointX = (index: number) => originX + (index % columns) * spacing;
  const pointY = (index: number) =>
    originY + Math.floor(index / columns) * spacing;

  const nearestPoint = (x: number, y: number) => {
    const column = Math.min(
      columns - 1,
      Math.max(0, Math.round((x - originX) / spacing)),
    );
    const row = Math.min(
      rows - 1,
      Math.max(0, Math.round((y - originY) / spacing)),
    );
    return row * columns + column;
  };

  const dispose = createVisual({
    canvas,
    fps: coarse ? 30 : 60,
    resize(width, height) {
      columns = Math.floor(width / spacing) + 1;
      rows = Math.floor(height / spacing) + 1;
      // Centre the grid so both edges have the same margin.
      originX = (width - (columns - 1) * spacing) / 2;
      originY = (height - (rows - 1) * spacing) / 2;
      flash = new Float32Array(columns * rows);
      threads.forEach((thread) => (thread.anchor = -1));
      latest = -1;
      drewIdle = false;
    },
    draw({ ctx, width, height, time, delta }) {
      // Scroll speed in px per second, eased into a small stretch.
      const scrollY = window.scrollY;
      const velocity = delta > 0 ? (scrollY - lastScroll) / delta : 0;
      lastScroll = scrollY;
      const wanted = Math.max(
        -MAX_STRETCH,
        Math.min(MAX_STRETCH, velocity * 0.000012),
      );
      stretch += (wanted - stretch) * Math.min(1, delta * 8);

      if (pointer.active && performance.now() > pointer.until) {
        pointer.active = false;
      }

      let over = false;
      if (pointer.active) {
        const rect = canvas.getBoundingClientRect();
        const x = pointer.clientX - rect.left;
        const y = pointer.clientY - rect.top;
        over = x >= 0 && y >= 0 && x <= width && y <= height;
        if (over) {
          hand.x = x;
          hand.y = y;
        }
      }

      presence +=
        ((over ? 1 : 0) - presence) * Math.min(1, delta * (over ? 10 : 4));
      if (presence < 0.01 && !over) {
        presence = 0;
        threads.forEach((thread) => (thread.anchor = -1));
      }

      // Latch or re-latch each thread to a point roughly STEP away, spread
      // around the pointer; the spread turns slowly so it never looks frozen.
      if (over) {
        const spin = time * 0.15;
        for (const thread of threads) {
          const angle = thread.angle + spin;
          const targetX = hand.x + Math.cos(angle) * STEP;
          const targetY = hand.y + Math.sin(angle) * STEP * 0.8;
          const current = thread.anchor;
          const length =
            current < 0
              ? Infinity
              : Math.hypot(pointX(current) - hand.x, pointY(current) - hand.y);
          const drift =
            current < 0
              ? Infinity
              : Math.hypot(
                  pointX(current) - targetX,
                  pointY(current) - targetY,
                );
          if (length > SNAP || drift > STEP * 0.85) {
            const next = nearestPoint(targetX, targetY);
            if (next !== current) {
              thread.anchor = next;
              flash[next] = 1;
              latest = next;
            }
          }
        }
      }

      let flashing = false;
      const decay = Math.exp(-delta * 3);
      for (let i = 0; i < flash.length; i += 1) {
        if (flash[i] === 0) continue;
        flash[i] = flash[i] < 0.01 ? 0 : flash[i] * decay;
        if (flash[i] > 0) flashing = true;
      }

      const idle = presence === 0 && !flashing && Math.abs(stretch) < 0.0005;
      if (idle && drewIdle) return;
      drewIdle = idle;

      ctx.clearRect(0, 0, width, height);
      const centerY = height / 2;
      const stretchY = (y: number) => y + (y - centerY) * stretch;

      // Threads, dotted like the grapple rope.
      if (presence > 0) {
        for (const thread of threads) {
          if (thread.anchor < 0) continue;
          const ax = pointX(thread.anchor);
          const ay = stretchY(pointY(thread.anchor));
          const dx = ax - hand.x;
          const dy = ay - hand.y;
          const dots = Math.max(2, Math.floor(Math.hypot(dx, dy) / 6));
          ctx.fillStyle = `rgba(255,255,255,${(0.42 * presence).toFixed(3)})`;
          for (let d = 1; d < dots; d += 1) {
            ctx.fillRect(
              Math.round(hand.x + (dx * d) / dots),
              Math.round(hand.y + (dy * d) / dots),
              1,
              1,
            );
          }
        }
      }

      const anchored = new Set(threads.map((thread) => thread.anchor));
      for (let row = 0; row < rows; row += 1) {
        const y = stretchY(originY + row * spacing);
        for (let column = 0; column < columns; column += 1) {
          const index = row * columns + column;
          const x = originX + column * spacing;
          const distance =
            presence > 0 ? Math.hypot(x - hand.x, y - hand.y) : Infinity;
          const glow =
            distance < GLOW ? (1 - distance / GLOW) ** 2 * 0.22 * presence : 0;
          const lit = flash[index];

          if (index === latest && lit > 0.05) {
            ctx.fillStyle = `rgba(${SIGNAL},${Math.min(1, 0.35 + lit).toFixed(3)})`;
            ctx.fillRect(Math.round(x) - 1, Math.round(y) - 1, 3, 3);
            continue;
          }
          const isAnchor = presence > 0 && anchored.has(index);
          const alpha = Math.min(
            1,
            BASE_ALPHA + glow + lit * 0.5 + (isAnchor ? 0.55 * presence : 0),
          );
          ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
          const size = isAnchor ? 2 : 1;
          ctx.fillRect(Math.round(x), Math.round(y), size, size);
        }
      }
    },
  });

  return () => {
    dispose();
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerdown", onDown);
    document.removeEventListener("pointerleave", onLeave);
    window.removeEventListener("blur", onLeave);
  };
}
