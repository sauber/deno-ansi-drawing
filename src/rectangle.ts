import type { Canvas } from "./types.ts";

const CHARS = " ▖▗▄▘▌▚▙▝▞▐▟▀▛▜█";

/**
 * Draws a rectangle on the canvas.
 * @param canvas - Canvas to draw on
 * @param x - X start position
 * @param y - Y start position
 * @param w - Width
 * @param h - Height
 * @param ansi - ANSI code for styling (optional)
 */
export function drawRectangle(
  canvas: Canvas,
  x: number,
  y: number,
  w: number,
  h: number,
  ansi?: string,
): void {
  // Handle negative width and height by adjusting the starting position and making them positive.
  if (w < 0) {
    x += w;
    w = -w;
  }
  if (h < 0) {
    y += h;
    h = -h;
  }

  // If the rectangle is too small to be visible, skip drawing it.
  if (w < 0.5 || h < 0.5) return;

  // We use a 2x2 grid to determine which character to use for each cell.
  const xs = Math.floor(x), ys = Math.floor(y);
  const xe = Math.ceil(x + w), ye = Math.ceil(y + h);
  const hw = (xe - xs) * 2, hh = (ye - ys) * 2;
  const grid: number[][] = Array.from({ length: hh }, () => Array(hw).fill(0));

  // Mark the grid cells that are covered by the rectangle.
  for (let col = 0; col < hw; col++) {
    for (let row = 0; row < hh; row++) {
      if (
        x + w > xs + col / 2 + 0.25 && x < xs + col / 2 + 0.25 &&
        y + h > ys + row / 2 + 0.25 && y < ys + row / 2 + 0.25
      ) {
        grid[row][col] = 1;
      }
    }
  }

  // Convert the grid to characters and insert them into the canvas.
  for (let row = 0; row < hh; row += 2) {
    for (let col = 0; col < hw; col += 2) {
      const i = grid[row][col] | (grid[row][col + 1] << 1) |
        (grid[row + 1][col] << 2) | (grid[row + 1][col + 1] << 3);
      if (i) canvas.insert(xs + col / 2, ys + row / 2, CHARS[i], ansi);
    }
  }
}
