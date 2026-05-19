import { drawDots } from "./dots.ts";
import type { Canvas } from "./types.ts";

/** Generate dot-space points for a circle using the midpoint circle algorithm.
 * The circle is centred at (cx, cy) in **Braille dot-space** and has radius r
 * in dot-space units (multiply canvas radius by 2 or 4 as needed before calling).
 *
 * @param cx Dot-space centre x = cx_canvas * 2
 * @param cy Dot-space centre y = cy_canvas * 4
 * @param r Dot-space radius
 */
function circlePoints(
  cx: number,
  cy: number,
  r: number,
): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = [];
  let x = r;
  let y = 0;
  let err = 1 - x;

  while (x >= y) {
    // 8-fold symmetry
    points.push(
      { x: cx + x, y: cy + y },
      { x: cx - x, y: cy + y },
      { x: cx + x, y: cy - y },
      { x: cx - x, y: cy - y },
      { x: cx + y, y: cy + x },
      { x: cx - y, y: cy + x },
      { x: cx + y, y: cy - x },
      { x: cx - y, y: cy - x },
    );
    y++;
    if (err < 0) {
      err += 2 * y + 1;
    } else {
      x--;
      err += 2 * (y - x) + 1;
    }
  }
  return points;
}

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
export function drawCircle(
  canvas: Canvas,
  cx: number,
  cy: number,
  r: number,
  ansi?: string,
): void {
  // Convert centre and radius to Braille dot-space
  const dotCx = Math.round(cx * 2);
  const dotCy = Math.round(cy * 4);
  const dotR = Math.round(r * 2);

  const points = circlePoints(dotCx, dotCy, dotR);
  drawDots(canvas, points, ansi);
}
