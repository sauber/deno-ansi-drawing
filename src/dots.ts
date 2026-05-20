import type { Canvas } from "./types.ts";

/** A dot in a 2x4 dot space of a character */
export type Dot = { x: number; y: number };

// Braille dots are 2x4 per character cell
// x: 0 1
// y: 0 1 2 3
//
// Bit offsets for each dot position [localY][localX]
// localY=0 is the bottom dot row (canvas y grows upward)
const DOT_MAP: number[][] = [
  [0x1, 0x8], // localY=0
  [0x2, 0x10], // localY=1
  [0x4, 0x20], // localY=2
  [0x40, 0x80], // localY=3
];

/** Braille character mask to single Unicode character */
function brailleChar(mask: number): string {
  return String.fromCharCode(0x2800 + mask);
}

/** Plot Braille dot-space points directly onto the canvas.
 * Accumulates multiple dots that fall in the same character cell by OR-ing
 * their bit-masks, then inserts the resulting Braille character.
 *
 * Uses the same DOT_MAP and y-axis normalisation as accumulateDots before it
 * was inlined here.
 *
 * @param canvas The canvas to draw on
 * @param points Dot-space coordinates (x×2 canvas units, y×4 canvas units)
 * @param ansi Optional ANSI style applied to every character
 */
export function drawDots(
  canvas: Canvas,
  points: Array<Dot>,
  ansi?: string,
): void {
  const dots = new Map<string, number>();
  for (const { x, y } of points) {
    const charX = Math.floor(x / 2);
    const charY = Math.floor(y / 4);
    const localX = x % 2;
    // Normalise the remainder so negative y hits still map to [0, 3].
    const localY = 3 - ((y % 4 + 4) % 4);
    const key = `${charX},${charY}`;
    dots.set(key, (dots.get(key) ?? 0) | DOT_MAP[localY][localX]);
  }
  for (const [key, mask] of dots) {
    const [cx, cy] = key.split(",").map(Number);
    canvas.insert(cx, cy, brailleChar(mask), ansi);
  }
}
