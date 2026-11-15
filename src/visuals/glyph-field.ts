/**
 * Glyph field — the site's binary background, drawn on one canvas.
 *
 * A grid of faint digits. A slow noise field drifts across it so some
 * regions read slightly brighter than others, a few digits flip each tick,
 * the pointer lights the digits around it and a press sends out a ring.
 */
import {
  createVisual,
  isCoarsePointer,
  prefersReducedMotion,
  type Dispose,
} from "./core/lifecycle";

export type GlyphFieldOptions = {
  /** Font size in CSS pixels. */
  size?: number;
  /** Line height as a multiple of the font size. */
  leading?: number;
  /** Resting opacity of a digit. */
  base?: number;
  /** Share of digits that flip per second. */
  flipRate?: number;
};

const ACCENT = [255, 90, 54] as const;
const POINTER_RADIUS = 150;
const RIPPLE_SPEED = 620;
const RIPPLE_WIDTH = 70;
const RIPPLE_LIFE = 1.1;

// Cheap value noise: enough for a slow, soft brightness drift.
const hash = (x: number, y: number) => {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
};
const smooth = (t: number) => t * t * (3 - 2 * t);
const noise = (x: number, y: number) => {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = smooth(x - xi);
  const yf = smooth(y - yi);
  const top = hash(xi, yi) + (hash(xi + 1, yi) - hash(xi, yi)) * xf;
  const bottom =
    hash(xi, yi + 1) + (hash(xi + 1, yi + 1) - hash(xi, yi + 1)) * xf;
  return top + (bottom - top) * yf;
};

export function mount(
  canvas: HTMLCanvasElement,
  options: GlyphFieldOptions = {},
): Dispose {
  const coarse = isCoarsePointer();
  const reduced = prefersReducedMotion();
  const size = options.size ?? (coarse ? 34 : 48);
  const leading = options.leading ?? 1.5;
  const base = options.base ?? 0.032;
  const flipRate = options.flipRate ?? 0.12;

  const cellHeight = size * leading;
  let cellWidth = size * 0.6;
  let columns = 0;
  let rows = 0;
  let digits = new Uint8Array(0);
  let heat = new Float32Array(0);
  const font = `${size}px VCR, monospace`;

  const pointer = { x: -9999, y: -9999, active: false };
  const ripples: Array<{ x: number; y: number; age: number }> = [];

  const toLocal = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top, rect };
  };

  const onMove = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    const { x, y, rect } = toLocal(event);
    pointer.active =
      x > -POINTER_RADIUS &&
      y > -POINTER_RADIUS &&
      x < rect.width + POINTER_RADIUS &&
      y < rect.height + POINTER_RADIUS;
    pointer.x = x;
    pointer.y = y;
  };

  const onDown = (event: PointerEvent) => {
    const { x, y, rect } = toLocal(event);
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
    if (ripples.length >= 4) ripples.shift();
    ripples.push({ x, y, age: 0 });
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

  const start = () =>
    createVisual({
      canvas,
      fps: coarse ? 15 : 30,
      resize(width, height) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.font = font;
          cellWidth = ctx.measureText("0").width || size * 0.6;
        }
        columns = Math.ceil(width / cellWidth) + 1;
        rows = Math.ceil(height / cellHeight) + 1;
        const count = columns * rows;
        digits = new Uint8Array(count);
        heat = new Float32Array(count);
        for (let i = 0; i < count; i += 1)
          digits[i] = Math.random() < 0.5 ? 0 : 1;
      },
      draw({ ctx, width, height, time, delta }) {
        ctx.clearRect(0, 0, width, height);
        ctx.font = font;
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";

        for (let i = ripples.length - 1; i >= 0; i -= 1) {
          ripples[i].age += delta;
          if (ripples[i].age > RIPPLE_LIFE) ripples.splice(i, 1);
        }

        const flips = digits.length * flipRate * delta;
        const whole = Math.floor(flips) + (Math.random() < flips % 1 ? 1 : 0);
        for (let i = 0; i < whole; i += 1) {
          const index = Math.floor(Math.random() * digits.length);
          digits[index] ^= 1;
        }

        const decay = Math.exp(-delta * 4.5);
        const drift = time * 0.06;

        for (let row = 0; row < rows; row += 1) {
          const y = row * cellHeight + cellHeight / 2;
          for (let column = 0; column < columns; column += 1) {
            const index = row * columns + column;
            const x = column * cellWidth + cellWidth / 2;

            let target = 0;
            if (pointer.active) {
              const distance = Math.hypot(x - pointer.x, y - pointer.y);
              if (distance < POINTER_RADIUS) {
                const falloff = 1 - distance / POINTER_RADIUS;
                target = falloff * falloff;
              }
            }
            for (const ripple of ripples) {
              const distance = Math.hypot(x - ripple.x, y - ripple.y);
              const offset = Math.abs(distance - ripple.age * RIPPLE_SPEED);
              if (offset < RIPPLE_WIDTH) {
                const ring =
                  (1 - offset / RIPPLE_WIDTH) * (1 - ripple.age / RIPPLE_LIFE);
                if (ring > target) target = ring;
              }
            }

            const current = Math.max(heat[index] * decay, target);
            heat[index] = current;

            const field = noise(
              column * 0.09 + drift,
              row * 0.22 - drift * 0.6,
            );
            const alpha = base * (0.55 + field * 1.1) + current * 0.5;
            // Fully lit cells take the accent colour; resting ones stay white.
            const tint = current * current;
            const r = Math.round(255 + (ACCENT[0] - 255) * tint);
            const g = Math.round(255 + (ACCENT[1] - 255) * tint);
            const b = Math.round(255 + (ACCENT[2] - 255) * tint);
            ctx.fillStyle = `rgba(${r},${g},${b},${alpha.toFixed(3)})`;
            ctx.fillText(current > 0.45 || digits[index] ? "1" : "0", x, y);
          }
        }
      },
    });

  // Wait for the pixel font so the grid is measured with real metrics.
  let cancelled = false;
  let dispose: Dispose | null = null;
  const begin = () => {
    if (!cancelled && !dispose) dispose = start();
  };
  (document.fonts?.load(font) ?? Promise.resolve()).then(begin, begin);

  return () => {
    cancelled = true;
    dispose?.();
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerdown", onDown);
    document.removeEventListener("pointerleave", onLeave);
    window.removeEventListener("blur", onLeave);
  };
}
