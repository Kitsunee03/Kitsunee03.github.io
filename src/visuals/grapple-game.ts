/**
 * GRAPPLE.EXE — a small rope toy in the site's ASCII language.
 *
 * Hold on an anchor (+) to latch a rope and swing; the rope reels in while
 * held, so each swing can gain height. Let go to fly. Collect scrap (*)
 * before the timer runs out. Nothing here runs until the visitor starts it.
 */
import { createVisual, type Dispose } from "./core/lifecycle";

export type GrappleOptions = {
  /** Round length in seconds. */
  duration?: number;
  onEnd?: (score: number) => void;
};

type Point = { x: number; y: number };

const GRAVITY = 950;
const REEL_SPEED = 70;
const MIN_ROPE = 36;
const STEER = 520;
const PICKUP_RADIUS = 20;
const STEP = 1 / 120;
const SIGNAL = "#ff5a36";

const random = (min: number, max: number) => min + Math.random() * (max - min);

export function mount(
  canvas: HTMLCanvasElement,
  options: GrappleOptions = {},
): Dispose {
  const duration = options.duration ?? 40;

  let width = 0;
  let height = 0;
  let anchors: Point[] = [];
  let scrap: Point[] = [];
  const player = { x: 0, y: 0, px: 0, py: 0 };
  let attached: Point | null = null;
  let ropeLength = 0;
  let pointer: Point | null = null;
  let steer = 0;
  let score = 0;
  let remaining = duration;
  let finished = false;
  let accumulator = 0;

  const placeScrap = (): Point => ({
    x: random(30, width - 30),
    y: random(40, height - 50),
  });

  const layout = (w: number, h: number) => {
    const first = width === 0;
    width = w;
    height = h;
    // Anchors on a loose arc across the upper half, evenly spaced.
    const count = Math.max(4, Math.min(8, Math.round(w / 130)));
    anchors = Array.from({ length: count }, (_, i) => ({
      x: ((i + 0.5) / count) * w,
      y: h * (0.2 + 0.16 * Math.sin(i * 1.9) + (i % 2) * 0.1),
    }));
    scrap = Array.from({ length: 5 }, placeScrap);
    if (first) {
      player.x = player.px = w / 2;
      player.y = player.py = h * 0.6;
    }
  };

  const nearestAnchor = (to: Point) => {
    let best = anchors[0];
    let bestDistance = Infinity;
    for (const anchor of anchors) {
      const distance = Math.hypot(anchor.x - to.x, anchor.y - to.y);
      if (distance < bestDistance) {
        best = anchor;
        bestDistance = distance;
      }
    }
    return best;
  };

  const latch = (anchor: Point) => {
    attached = anchor;
    ropeLength = Math.max(
      MIN_ROPE,
      Math.hypot(anchor.x - player.x, anchor.y - player.y),
    );
  };

  const release = () => {
    attached = null;
  };

  const local = (event: PointerEvent): Point => {
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const onPointerDown = (event: PointerEvent) => {
    if (finished) return;
    event.preventDefault();
    canvas.setPointerCapture?.(event.pointerId);
    pointer = local(event);
    latch(nearestAnchor(pointer));
  };
  const onPointerMove = (event: PointerEvent) => {
    pointer = local(event);
  };
  const onPointerUp = () => release();
  const onPointerLeave = () => {
    pointer = null;
  };

  const keys = new Set<string>();
  const onKeyDown = (event: KeyboardEvent) => {
    if (finished) return;
    if (event.key === " " || event.key === "ArrowUp") {
      event.preventDefault();
      if (!keys.has("latch")) {
        keys.add("latch");
        // From the keyboard, latch the anchor nearest to a point up ahead.
        const lead = (player.x - player.px) * 14;
        latch(nearestAnchor({ x: player.x + lead, y: player.y - 80 }));
      }
    } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      keys.add(event.key);
    }
    steer = (keys.has("ArrowRight") ? 1 : 0) - (keys.has("ArrowLeft") ? 1 : 0);
  };
  const onKeyUp = (event: KeyboardEvent) => {
    if (event.key === " " || event.key === "ArrowUp") {
      keys.delete("latch");
      release();
    } else {
      keys.delete(event.key);
    }
    steer = (keys.has("ArrowRight") ? 1 : 0) - (keys.has("ArrowLeft") ? 1 : 0);
  };

  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("pointermove", onPointerMove);
  canvas.addEventListener("pointerup", onPointerUp);
  canvas.addEventListener("pointercancel", onPointerUp);
  canvas.addEventListener("pointerleave", onPointerLeave);
  canvas.addEventListener("keydown", onKeyDown);
  canvas.addEventListener("keyup", onKeyUp);
  canvas.addEventListener("blur", release);

  const simulate = (dt: number) => {
    // Verlet integration: velocity is the difference from the last position.
    const vx = (player.x - player.px) * 0.9992;
    const vy = (player.y - player.py) * 0.9992;
    player.px = player.x;
    player.py = player.y;
    player.x += vx + steer * STEER * dt * dt;
    player.y += vy + GRAVITY * dt * dt;

    if (attached) {
      ropeLength = Math.max(MIN_ROPE, ropeLength - REEL_SPEED * dt);
      const dx = player.x - attached.x;
      const dy = player.y - attached.y;
      const distance = Math.hypot(dx, dy);
      // The rope only pulls: it constrains length, never pushes.
      if (distance > ropeLength) {
        player.x = attached.x + (dx / distance) * ropeLength;
        player.y = attached.y + (dy / distance) * ropeLength;
      }
    }

    // Soft walls and floor.
    const margin = 10;
    if (player.x < margin) {
      player.x = margin;
      player.px = player.x + (player.x - player.px) * 0.5;
    } else if (player.x > width - margin) {
      player.x = width - margin;
      player.px = player.x + (player.x - player.px) * 0.5;
    }
    if (player.y > height - margin) {
      player.y = height - margin;
      player.py = player.y + (player.y - player.py) * 0.35;
      player.px = player.x - (player.x - player.px) * 0.9;
    } else if (player.y < margin) {
      player.y = margin;
      player.py = player.y;
    }

    for (let i = 0; i < scrap.length; i += 1) {
      const piece = scrap[i];
      if (Math.hypot(piece.x - player.x, piece.y - player.y) < PICKUP_RADIUS) {
        score += 1;
        scrap[i] = placeScrap();
      }
    }
  };

  const dispose = createVisual({
    canvas,
    fps: 60,
    allowMotion: true,
    resize: layout,
    draw({ ctx, time, delta }) {
      if (!finished) {
        remaining -= delta;
        accumulator += delta;
        while (accumulator >= STEP) {
          simulate(STEP);
          accumulator -= STEP;
        }
        if (remaining <= 0) {
          remaining = 0;
          finished = true;
          release();
          options.onEnd?.(score);
        }
      }

      ctx.clearRect(0, 0, width, height);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Faint dot grid.
      ctx.fillStyle = "rgba(255,255,255,0.07)";
      for (let y = 20; y < height; y += 32) {
        for (let x = 20; x < width; x += 32) ctx.fillRect(x, y, 1, 1);
      }

      const target = attached ?? (pointer ? nearestAnchor(pointer) : null);
      ctx.font = "20px VCR, monospace";
      for (const anchor of anchors) {
        ctx.fillStyle =
          anchor === target ? "#ffffff" : "rgba(255,255,255,0.38)";
        ctx.fillText("+", anchor.x, anchor.y);
      }

      if (attached) {
        const dx = player.x - attached.x;
        const dy = player.y - attached.y;
        const dots = Math.max(2, Math.round(Math.hypot(dx, dy) / 7));
        ctx.fillStyle = "rgba(255,255,255,0.75)";
        for (let i = 1; i < dots; i += 1) {
          ctx.fillRect(
            Math.round(attached.x + (dx * i) / dots) - 1,
            Math.round(attached.y + (dy * i) / dots) - 1,
            2,
            2,
          );
        }
      }

      ctx.fillStyle = SIGNAL;
      ctx.font = "18px VCR, monospace";
      for (const piece of scrap) {
        const bob = Math.sin(time * 2.4 + piece.x) * 2;
        ctx.fillText("*", piece.x, piece.y + bob);
      }

      ctx.fillStyle = "#ffffff";
      ctx.font = "22px VCR, monospace";
      ctx.fillText("@", player.x, player.y);

      ctx.font = "13px VCR, monospace";
      ctx.textAlign = "left";
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.fillText(`SCRAP ${String(score).padStart(2, "0")}`, 14, 18);
      ctx.textAlign = "right";
      ctx.fillText(
        `T-${String(Math.ceil(remaining)).padStart(2, "0")}`,
        width - 14,
        18,
      );
    },
  });

  return () => {
    dispose();
    canvas.removeEventListener("pointerdown", onPointerDown);
    canvas.removeEventListener("pointermove", onPointerMove);
    canvas.removeEventListener("pointerup", onPointerUp);
    canvas.removeEventListener("pointercancel", onPointerUp);
    canvas.removeEventListener("pointerleave", onPointerLeave);
    canvas.removeEventListener("keydown", onKeyDown);
    canvas.removeEventListener("keyup", onKeyUp);
    canvas.removeEventListener("blur", release);
  };
}
