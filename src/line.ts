import { drawDots } from "./dots.ts";
import type { Canvas } from "./types.ts";

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
function bresenham(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = [];
  let x = x1;
  let y = y1;
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  const sx = x1 < x2 ? 1 : -1;
  const sy = y1 < y2 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    points.push({ x, y });
    if (x === x2 && y === y2) break;
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x += sx;
    }
    if (e2 < dx) {
      err += dx;
      y += sy;
    }
  }
  return points;
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
export function drawLine(
  canvas: Canvas,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  ansi?: string,
): void {
  // Convert canvas units to Braille dot-space
  const p1x = Math.round(x1 * 2);
  const p1y = Math.round(y1 * 4);
  const p2x = Math.round(x2 * 2);
  const p2y = Math.round(y2 * 4);

  const points = bresenham(p1x, p1y, p2x, p2y);
  drawDots(canvas, points, ansi);
}
