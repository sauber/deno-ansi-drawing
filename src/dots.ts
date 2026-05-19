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

/** Bresenham line algorithm in Braille dot-space.
 * Returns an array of {x, y} points where x is in dot-units (×2 canvas units)
 * and y is in dot-units (×4 canvas units), so that the midpoint of a canvas
 * unit maps exactly to a whole dot coordinate.
 *
 * @param x1 Dot-space start x
 * @param y1 Dot-space start y
 * @param x2 Dot-space end x
 * @param y2 Dot-space end y
 */
// function bresenham(x1: number, y1: number, x2: number, y2: number): { x: number; y: number }[] {
//   const points: { x: number; y: number }[] = [];
//   let x = x1;
//   let y = y1;
//   const dx = Math.abs(x2 - x1);
//   const dy = Math.abs(y2 - y1);
//   const sx = x1 < x2 ? 1 : -1;
//   const sy = y1 < y2 ? 1 : -1;
//   let err = dx - dy;

//   while (true) {
//     points.push({ x, y });
//     if (x === x2 && y === y2) break;
//     const e2 = 2 * err;
//     if (e2 > -dy) {
//       err -= dy;
//       x += sx;
//     }
//     if (e2 < dx) {
//       err += dx;
//       y += sy;
//     }
//   }
//   return points;
// }

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

/** Draw a line on the canvas using Bresenham algorithm onto Braille characters.
 * X direction is left to right (canvas units), Y direction is bottom to top.
 *
 * @param canvas The canvas to draw on
 * @param x1 The x-coordinate of the first point in canvas units
 * @param y1 The y-coordinate of the first point in canvas units
 * @param x2 The x-coordinate of the second point in canvas units
 * @param y2 The y-coordinate of the second point in canvas units
 * @param ansi The ANSI code for the line characters
 */
// export function drawLine(
//   canvas: Canvas,
//   x1: number,
//   y1: number,
//   x2: number,
//   y2: number,
//   ansi?: string,
// ): void {
//   // Convert canvas units to Braille dot-space
//   const p1x = Math.round(x1 * 2);
//   const p1y = Math.round(y1 * 4);
//   const p2x = Math.round(x2 * 2);
//   const p2y = Math.round(y2 * 4);

//   const points = bresenham(p1x, p1y, p2x, p2y);
//   drawDots(canvas, points, ansi);
// }

/** Generate dot-space points for a circle using the midpoint circle algorithm.
 * The circle is centred at (cx, cy) in **Braille dot-space** and has radius r
 * in dot-space units (multiply canvas radius by 2 or 4 as needed before calling).
 *
 * @param cx Dot-space centre x = cx_canvas * 2
 * @param cy Dot-space centre y = cy_canvas * 4
 * @param r Dot-space radius
 */
// function circlePoints(cx: number, cy: number, r: number): { x: number; y: number }[] {
//   const points: { x: number; y: number }[] = [];
//   let x = r;
//   let y = 0;
//   let err = 1 - x;

//   while (x >= y) {
//     // 8-fold symmetry
//     points.push(
//       { x: cx + x, y: cy + y },
//       { x: cx - x, y: cy + y },
//       { x: cx + x, y: cy - y },
//       { x: cx - x, y: cy - y },
//       { x: cx + y, y: cy + x },
//       { x: cx - y, y: cy + x },
//       { x: cx + y, y: cy - x },
//       { x: cx - y, y: cy - x },
//     );
//     y++;
//     if (err < 0) {
//       err += 2 * y + 1;
//     } else {
//       x--;
//       err += 2 * (y - x) + 1;
//     }
//   }
//   return points;
// }

/** Draw a circle on the canvas using Braille characters.
 * The circle uses the standard circle equation (x-cx)²+(y-cy)²=r².
 * X direction is left to right, Y direction is bottom to top.
 *
 * @param canvas The canvas to draw on
 * @param cx The x-coordinate of the circle centre in canvas units
 * @param cy The y-coordinate of the circle centre in canvas units
 * @param r The radius of the circle in canvas units
 * @param ansi Optional ANSI style applied to every character
 */
// export function drawCircle(
//   canvas: Canvas,
//   cx: number,
//   cy: number,
//   r: number,
//   ansi?: string,
// ): void {
//   // Convert centre and radius to Braille dot-space
//   const dotCx = Math.round(cx * 2);
//   const dotCy = Math.round(cy * 4);
//   const dotR = Math.round(r * 2);

//   const points = circlePoints(dotCx, dotCy, dotR);
//   plotDots(canvas, points, ansi);
// }
