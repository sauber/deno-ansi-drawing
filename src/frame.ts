import type { Canvas } from "./types.ts";

/** Draw a frame with rounded corners on a canvas */
export function drawFrame(
  canvas: Canvas,
  x: number,
  y: number,
  width: number,
  height: number,
  ansi?: string,
): void {
  // Draw nothing if size is 0
  if (width === 0 || height === 0) return;

  // Handle negative sizes by treating them as positive and adjusting the starting point
  if (width < 0) {
    x += width;
    width = -width;
  }
  if (height < 0) {
    y += height;
    height = -height;
  }

  // Size is less than 1, draw a single character
  if (width <= 1 && height <= 1) {
    canvas.insert(x, y, "▢", ansi);
    return;
  }

  const x1 = Math.floor(x);
  const y1 = Math.floor(y);
  let x2 = Math.floor(x + width);
  let y2 = Math.floor(y + height);
  if (x2 === x + width) x2--;
  if (y2 === y + height) y2--;

  // Horizontal line (height <= 1)
  if ((y2 - y1) < 1) {
    canvas.insert(x1, y1, "╶", ansi);
    for (let x = x1 + 1; x < x2; x++) canvas.insert(x, y1, "─", ansi);
    canvas.insert(x2, y1, "╴", ansi);
    return;
  }

  // Vertical line (width <=1 )
  if ((x2 - x1) < 1) {
    canvas.insert(x1, y1, "╵", ansi);
    for (let y = y1 + 1; y < y2; y++) canvas.insert(x1, y, "│", ansi);
    canvas.insert(x1, y2, "╷", ansi);
    return;
  }

  // Draw top and bottom horizontal edges
  for (let x = x1 + 1; x < x2; x++) {
    canvas.insert(x, y1, "─", ansi);
    canvas.insert(x, y2, "─", ansi);
  }

  // Draw left and right vertical edges
  for (let y = y1 + 1; y < y2; y++) {
    canvas.insert(x1, y, "│", ansi);
    canvas.insert(x2, y, "│", ansi);
  }

  // Draw corners
  canvas.insert(x1, y1, "╰", ansi);
  canvas.insert(x2, y1, "╯", ansi);
  canvas.insert(x1, y2, "╭", ansi);
  canvas.insert(x2, y2, "╮", ansi);
}
