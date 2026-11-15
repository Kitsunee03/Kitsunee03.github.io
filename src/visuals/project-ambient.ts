/**
 * Project ambient — a quiet identity cue behind a project's header.
 *
 * "space": sparse drifting stars and two dotted orbits (Junkonaut).
 * "arcane": small glyphs rising like embers (Grimoire of Madness).
 */
import { createVisual, type Dispose } from "./core/lifecycle";

export type ProjectAmbientOptions = {
  mode?: "space" | "arcane";
};

type Mote = {
  x: number;
  y: number;
  speed: number;
  size: number;
  phase: number;
  glyph: string;
};

const EMBER_GLYPHS = ["+", "*", "·", "◇", "×"];
const random = (min: number, max: number) => min + Math.random() * (max - min);

export function mount(
  canvas: HTMLCanvasElement,
  options: ProjectAmbientOptions = {},
): Dispose {
  const mode = options.mode ?? "space";
  let motes: Mote[] = [];

  const seed = (width: number, height: number) => {
    const count = Math.round(
      (width * height) / (mode === "space" ? 5200 : 7000),
    );
    motes = Array.from({ length: Math.min(count, 90) }, () => ({
      x: random(0, width),
      y: random(0, height),
      speed: mode === "space" ? random(2, 9) : random(8, 22),
      size: mode === "space" ? (Math.random() < 0.85 ? 1 : 2) : random(9, 14),
      phase: random(0, Math.PI * 2),
      glyph: EMBER_GLYPHS[Math.floor(Math.random() * EMBER_GLYPHS.length)],
    }));
  };

  const drawSpace = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    time: number,
    delta: number,
  ) => {
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

  const drawArcane = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    time: number,
    delta: number,
  ) => {
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
      const rise = Math.max(0, Math.min(1, mote.y / height));
      const flicker = 0.75 + 0.25 * Math.sin(time * 5 + mote.phase * 3);
      const alpha = 0.34 * rise * flicker;
      ctx.font = `${mote.size.toFixed(0)}px VCR, monospace`;
      ctx.fillStyle = `rgba(190,150,255,${alpha.toFixed(3)})`;
      ctx.fillText(mote.glyph, mote.x + sway, mote.y);
    }
  };

  return createVisual({
    canvas,
    fps: 24,
    resize: seed,
    draw({ ctx, width, height, time, delta }) {
      ctx.clearRect(0, 0, width, height);
      if (mode === "space") drawSpace(ctx, width, height, time, delta);
      else drawArcane(ctx, width, height, time, delta);
    },
  });
}
