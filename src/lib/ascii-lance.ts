/**
 * ASCII Lance — generated at build time.
 *
 * Two strands twist around each other along the shaft, then split into the
 * two long prongs of the tip. Every character cell picks its glyph from the
 * slope of the strand that passes through it; where the strands cross, an
 * "X". The result is plain text, so it stays sharp at any size and costs
 * nothing at runtime.
 *
 * Horizontal and vertical versions are generated separately (not rotated),
 * because a character cell is taller than it is wide: the vertical twist
 * uses fewer rows per turn and more columns of spread to keep its shape.
 */

export type LanceOrientation = "horizontal" | "vertical";
export type LancePoint = "right" | "left" | "down" | "up";

export type LanceOptions = {
  orientation?: LanceOrientation;
  /** Length along the lance, in characters (columns or rows). */
  length?: number;
  /** Characters per full twist of the shaft. */
  twist?: number;
  /** Direction the points face. */
  point?: LancePoint;
  /** Snapped in two, with the point half knocked out of line. */
  broken?: boolean;
};

/** Width / height of a monospace cell at line-height 1 (IBM Plex Mono). */
const CELL_ASPECT = 0.6;

export function asciiLance({
  orientation = "horizontal",
  length = 96,
  twist = orientation === "horizontal" ? 12 : 8,
  point = orientation === "horizontal" ? "right" : "down",
  broken = false,
}: LanceOptions = {}) {
  const vertical = orientation === "vertical";
  // Distances across the lance, in cells of the "across" axis.
  const scale = vertical ? 1 / CELL_ASPECT : 1;
  const amplitude = 1.1 * scale;
  const prong = Math.round(2 * scale);
  const width = 2 * prong + 1 + (broken ? 1 : 0);
  const mid = prong;
  const tail = 5;
  const spread = 6;
  // The fork starts near three quarters of the length (earlier on short
  // lances, so the points keep their proportion), snapped to where the
  // strands are furthest apart so they open without crossing.
  const forkAt = length < 50 ? 0.58 : 0.72;
  const fork =
    Math.round((length * forkAt - 0.75 * twist) / twist) * twist +
    Math.round(0.75 * twist);

  // Offset across the lance of one strand (the other mirrors it) at `along`.
  const strand = (along: number) => {
    const wave = amplitude * Math.sin((2 * Math.PI * along) / twist);
    if (along < tail) return (along / tail) * wave;
    if (along < fork) return wave;
    const t = Math.min(1, (along - fork) / spread);
    const ease = t * t * (3 - 2 * t);
    return -amplitude + (amplitude - prong) * ease;
  };

  // Glyph for a strand drifting `slope` across-cells per along-cell.
  const glyph = (slope: number) => {
    if (vertical) {
      // Columns per row, in screen units.
      const visual = slope * CELL_ASPECT;
      if (Math.abs(visual) < 0.3) return "|";
      if (Math.abs(visual) > 2.2) return "-";
      return visual > 0 ? "\\" : "/";
    }
    if (Math.abs(slope) > 1.3) return "|";
    if (Math.abs(slope) < 0.32) return "-";
    return slope > 0 ? "\\" : "/";
  };

  // grid[along][across]
  const grid = Array.from({ length }, () => Array(width).fill(" "));
  for (let along = 0; along < length; along += 1) {
    const offset = strand(along);
    const slope = strand(along + 0.5) - strand(along - 0.5);
    const a = Math.round(mid + offset);
    const b = Math.round(mid - offset);
    if (a === b) {
      grid[along][a] =
        Math.abs(slope) > 0.32 * scale ? "X" : vertical ? "|" : "=";
    } else {
      grid[along][a] = glyph(slope);
      grid[along][b] = glyph(-slope);
    }
  }
  // Butt end and the two points.
  grid[0][mid] = vertical ? "^" : "<";
  grid[length - 1][mid - prong] = vertical ? "V" : ">";
  grid[length - 1][mid + prong] = vertical ? "V" : ">";

  // A clean break a little before the middle: three cells of nothing, and
  // the point half dropped one cell out of line.
  if (broken) {
    const at = Math.round(length * 0.42);
    for (let along = at; along < at + 3; along += 1) grid[along].fill(" ");
    for (let along = length - 1; along >= at + 3; along -= 1) {
      grid[along] = [" ", ...grid[along].slice(0, -1)];
    }
  }

  // Lay the grid out as lines of text.
  let lines: string[];
  if (vertical) {
    lines = grid.map((row) => row.join(""));
  } else {
    lines = Array.from({ length: width }, (_, across) =>
      grid.map((row) => row[across]).join(""),
    );
  }

  // Mirror for left- or up-facing points.
  const swap: Record<string, string> = {
    "/": "\\",
    "\\": "/",
    "<": ">",
    ">": "<",
    "^": "V",
    V: "^",
  };
  if (point === "left") {
    lines = lines.map((line) =>
      [...line]
        .reverse()
        .map((c) => swap[c] ?? c)
        .join(""),
    );
  } else if (point === "up") {
    lines = lines
      .reverse()
      .map((line) => [...line].map((c) => swap[c] ?? c).join(""));
  }

  const trimmed = lines.map((line) => line.replace(/\s+$/, ""));
  while (trimmed.length && !trimmed[0].trim()) trimmed.shift();
  while (trimmed.length && !trimmed[trimmed.length - 1].trim()) trimmed.pop();
  return trimmed.join("\n");
}
