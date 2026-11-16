/**
 * Project ambient — a quiet identity cue behind a project's text, used in the
 * devlog header and (slower, sparser) behind each project card's content.
 *
 * "space":  sparse drifting stars and two dotted orbits (Junkonaut).
 * "arcane": small glyphs rising like embers (Grimoire of Madness).
 * "strata": dotted rock layers with dust settling, one amber glint
 *           (Fossil Tamer).
 * "pixel":  single pixels lighting up and fading on a grid (Geno).
 * "duo":    two players chasing each other, each leaving a dotted trail
 *           (Go Get It!!).
 * "wisp":   pumpkin-orange will-o'-wisps drifting and breathing
 *           (Ura's Adventure).
 */
import { createVisual, type Dispose } from "./core/lifecycle";

export type AmbientMode =
  | "space"
  | "arcane"
  | "strata"
  | "pixel"
  | "duo"
  | "wisp";

export type ProjectAmbientOptions = {
  mode?: AmbientMode;
  /** Speed multiplier; cards use a calmer pace than the devlog header. */
  pace?: number;
  /** Density multiplier for the number of motes. */
  density?: number;
};

type Mote = {
  x: number;
  y: number;
  speed: number;
  size: number;
  phase: number;
  glyph: string;
  /** Cycle start and length, for motes that appear and fade (pixel). */
  start: number;
  life: number;
};

type Draw = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  delta: number,
) => void;

const EMBER_GLYPHS = ["+", "*", "·", "◇", "×"];
const PIXEL = 4;
const PIXEL_GRID = 12;
const TRAIL = 36;

const random = (min: number, max: number) => min + Math.random() * (max - min);
const pick = <T>(items: T[]) => items[Math.floor(Math.random() * items.length)];
const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

/** Area (px²) per mote at density 1, and the cap. */
const DENSITY: Record<AmbientMode, [number, number]> = {
  space: [5200, 90],
  arcane: [7000, 90],
  strata: [6500, 70],
  pixel: [5000, 60],
  duo: [Infinity, 0],
  wisp: [16000, 16],
};

export function mount(
  canvas: HTMLCanvasElement,
  options: ProjectAmbientOptions = {},
): Dispose {
  const mode = options.mode ?? "space";
  const pace = options.pace ?? 1;
  const density = options.density ?? 1;
  let motes: Mote[] = [];
  let clock = 0;

  const spawnPixel = (mote: Mote, width: number, height: number) => {
    const cols = Math.max(1, Math.floor(width / PIXEL_GRID));
    const rows = Math.max(1, Math.floor(height / PIXEL_GRID));
    mote.x = Math.floor(random(0, cols)) * PIXEL_GRID;
    mote.y = Math.floor(random(0, rows)) * PIXEL_GRID;
    mote.life = random(2.5, 5);
    mote.start = clock + random(0, 6);
  };

  const seed = (width: number, height: number) => {
    const [area, cap] = DENSITY[mode];
    const count = Math.min(
      Math.round(((width * height) / area) * density),
      cap,
    );
    motes = Array.from({ length: count }, () => {
      const mote: Mote = {
        x: random(0, width),
        y: random(0, height),
        speed: 0,
        size: 1,
        phase: random(0, Math.PI * 2),
        glyph: pick(EMBER_GLYPHS),
        start: 0,
        life: 1,
      };
      if (mode === "space") {
        mote.speed = random(2, 9);
        mote.size = Math.random() < 0.85 ? 1 : 2;
      } else if (mode === "arcane") {
        mote.speed = random(8, 22);
        mote.size = random(9, 14);
      } else if (mode === "strata") {
        mote.speed = random(2, 6);
        mote.size = Math.random() < 0.8 ? 1 : 2;
      } else if (mode === "pixel") {
        spawnPixel(mote, width, height);
        mote.start = random(-4, 4);
      } else if (mode === "wisp") {
        mote.speed = random(3, 7);
        mote.size = random(1.5, 2.5);
      }
      return mote;
    });
    // Go Get It!!: two players and their trails.
    if (mode === "duo") trails = [[], []];
  };

  const drawSpace: Draw = (ctx, width, height, time, delta) => {
    for (const mote of motes) {
      mote.x -= mote.speed * delta;
      if (mote.x < -2) {
        mote.x = width + 2;
        mote.y = random(0, height);
      }
      const twinkle = 0.25 + 0.2 * Math.sin(time * 1.3 + mote.phase);
      ctx.fillStyle = `rgba(255,255,255,${twinkle.toFixed(3)})`;
      ctx.fillRect(
        Math.round(mote.x),
        Math.round(mote.y),
        mote.size,
        mote.size,
      );
    }

    // Two dotted orbits around a point off the right edge, each with one body.
    const centerX = width * 0.86;
    const centerY = height * 0.5;
    const orbits = [
      { rx: height * 0.95, ry: height * 0.34, speed: 0.22, tilt: -0.32 },
      { rx: height * 1.55, ry: height * 0.56, speed: -0.13, tilt: -0.32 },
    ];
    for (const orbit of orbits) {
      const cos = Math.cos(orbit.tilt);
      const sin = Math.sin(orbit.tilt);
      const point = (angle: number) => {
        const px = Math.cos(angle) * orbit.rx;
        const py = Math.sin(angle) * orbit.ry;
        return [centerX + px * cos - py * sin, centerY + px * sin + py * cos];
      };
      ctx.fillStyle = "rgba(255,255,255,0.16)";
      const dots = 72;
      for (let i = 0; i < dots; i += 1) {
        const [x, y] = point((i / dots) * Math.PI * 2);
        ctx.fillRect(Math.round(x), Math.round(y), 1, 1);
      }
      const [bx, by] = point(time * orbit.speed);
      ctx.fillStyle = "rgba(255,138,54,0.85)";
      ctx.fillRect(Math.round(bx) - 2, Math.round(by) - 2, 4, 4);
    }
  };

  const drawArcane: Draw = (ctx, width, height, time, delta) => {
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (const mote of motes) {
      mote.y -= mote.speed * delta;
      if (mote.y < -10) {
        mote.y = height + 10;
        mote.x = random(0, width);
      }
      const sway = Math.sin(time * 0.8 + mote.phase) * 6;
      // Brightest low in the header, fading as the glyph rises.
      const rise = clamp01(mote.y / height);
      const flicker = 0.75 + 0.25 * Math.sin(time * 5 + mote.phase * 3);
      const alpha = 0.34 * rise * flicker;
      ctx.font = `${mote.size.toFixed(0)}px VCR, monospace`;
      ctx.fillStyle = `rgba(190,150,255,${alpha.toFixed(3)})`;
      ctx.fillText(mote.glyph, mote.x + sway, mote.y);
    }
  };

  const drawStrata: Draw = (ctx, width, height, time, delta) => {
    // Four gently bent rock layers, drawn as dotted lines.
    ctx.fillStyle = "rgba(255,255,255,0.1)";
    for (let layer = 0; layer < 4; layer += 1) {
      const base = height * (0.32 + layer * 0.19);
      for (let x = 0; x < width; x += 5) {
        const y =
          base +
          Math.sin(x * 0.012 + layer * 1.7) * 5 +
          Math.sin(x * 0.031 + layer) * 2;
        ctx.fillRect(x, Math.round(y), 1, 1);
      }
    }
    // Dust settling; the first mote is an amber fossil glint.
    motes.forEach((mote, index) => {
      mote.y += mote.speed * delta;
      if (mote.y > height + 2) {
        mote.y = -2;
        mote.x = random(0, width);
      }
      const drift = Math.sin(time * 0.5 + mote.phase) * 3;
      const x = Math.round(mote.x + drift);
      const y = Math.round(mote.y);
      if (index === 0) {
        const glint = 0.3 + 0.3 * Math.max(0, Math.sin(time * 0.9));
        ctx.fillStyle = `rgba(255,176,90,${glint.toFixed(3)})`;
        ctx.fillRect(x - 1, y - 1, 3, 3);
        return;
      }
      ctx.fillStyle = "rgba(220,205,180,0.22)";
      ctx.fillRect(x, y, mote.size, mote.size);
    });
  };

  const drawPixel: Draw = (ctx, width, height, time) => {
    for (const mote of motes) {
      const progress = (time - mote.start) / mote.life;
      if (progress >= 1) {
        spawnPixel(mote, width, height);
        continue;
      }
      if (progress <= 0) continue;
      // Steps instead of a smooth fade, like an 8-bit palette.
      const level = Math.round(Math.sin(Math.PI * progress) * 4) / 4;
      if (!level) continue;
      ctx.fillStyle = `rgba(110,180,255,${(0.28 * level).toFixed(3)})`;
      ctx.fillRect(mote.x, mote.y, PIXEL, PIXEL);
    }
  };

  let trails: [number, number][][] = [[], []];
  let trailClock = 0;
  const drawDuo: Draw = (ctx, width, height, time, delta) => {
    const players = [
      { a: 0.31, b: 0.47, p: 0, color: "255,255,255" },
      { a: 0.37, b: 0.29, p: 2.1, color: "255,90,54" },
    ];
    trailClock += delta;
    const record = trailClock > 0.12;
    if (record) trailClock = 0;
    players.forEach((player, index) => {
      const x = width * (0.5 + 0.42 * Math.sin(time * player.a + player.p));
      const y = height * (0.5 + 0.36 * Math.sin(time * player.b + player.p));
      const trail = trails[index];
      if (record) {
        trail.push([x, y]);
        if (trail.length > TRAIL) trail.shift();
      }
      trail.forEach(([tx, ty], step) => {
        const alpha = (step / trail.length) * 0.22;
        ctx.fillStyle = `rgba(${player.color},${alpha.toFixed(3)})`;
        ctx.fillRect(Math.round(tx), Math.round(ty), 1, 1);
      });
      ctx.fillStyle = `rgba(${player.color},0.55)`;
      ctx.fillRect(Math.round(x) - 1, Math.round(y) - 1, 3, 3);
    });
  };

  const drawWisp: Draw = (ctx, width, height, time, delta) => {
    for (const mote of motes) {
      mote.x += Math.cos(time * 0.3 + mote.phase) * mote.speed * delta;
      mote.y +=
        (Math.sin(time * 0.4 + mote.phase * 1.3) * mote.speed - 1.5) * delta;
      if (mote.y < -8) mote.y = height + 8;
      if (mote.x < -8) mote.x = width + 8;
      if (mote.x > width + 8) mote.x = -8;
      const breath = 0.5 + 0.5 * Math.sin(time * 0.9 + mote.phase);
      const x = Math.round(mote.x);
      const y = Math.round(mote.y);
      // A soft square halo instead of shadowBlur, which is expensive.
      ctx.fillStyle = `rgba(255,140,50,${(0.05 * breath).toFixed(3)})`;
      ctx.fillRect(x - 4, y - 4, 9, 9);
      ctx.fillStyle = `rgba(255,160,70,${(0.15 + 0.35 * breath).toFixed(3)})`;
      const core = Math.round(mote.size);
      ctx.fillRect(x - (core >> 1), y - (core >> 1), core, core);
    }
  };

  const draws: Record<AmbientMode, Draw> = {
    space: drawSpace,
    arcane: drawArcane,
    strata: drawStrata,
    pixel: drawPixel,
    duo: drawDuo,
    wisp: drawWisp,
  };
  const draw = draws[mode] ?? drawSpace;

  return createVisual({
    canvas,
    fps: 24,
    resize: seed,
    draw({ ctx, width, height, delta }) {
      const step = delta * pace;
      clock += step;
      ctx.clearRect(0, 0, width, height);
      draw(ctx, width, height, clock, step);
    },
  });
}
