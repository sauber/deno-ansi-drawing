import type { Canvas } from "./types.ts";

/** Draw a frame with rounded corners on a canvas
 * @param canvas The canvas to draw on
 * @param x The x-coordinate of the bottom-left corner of the frame
 * @param y The y-coordinate of the bottom-left corner of the frame
 * @param width The width of the frame; values < 3 are treated as 3
 * @param height The height of the frame; values < 3 are treated as 3
 * @param ansi The ANSI code for the frame characters
 */
export function drawFrame(
  canvas: Canvas,
  x: number,
  y: number,
  width: number,
  height: number,
  ansi?: string,
): void {
  // Enforce minimum size of 3x3; treat dimensions less than 3 as 3
  if (width < 3) width = 3;
  if (height < 3) height = 3;

  // Calculate actual corner coordinates (inclusive range)
  const x1 = Math.round(x);
  const y1 = Math.round(y);
  const x2 = Math.round(x + width - 1);
  const y2 = Math.round(y + height - 1);

  // Top and bottom edges (excluding corners)
  for (let i = x1 + 1; i < x2; i++) {
    canvas.insert(i, y2, "─", ansi); // Top edge
    canvas.insert(i, y1, "─", ansi); // Bottom edge
  }

  // Left and right edges (excluding corners)
  for (let i = y1 + 1; i < y2; i++) {
    canvas.insert(x1, i, "│", ansi); // Left edge
    canvas.insert(x2, i, "│", ansi); // Right edge
  }

  // Draw corners
  canvas.insert(x1, y2, "┌", ansi); // Top left
  canvas.insert(x2, y2, "┐", ansi); // Top right
  canvas.insert(x2, y1, "┘", ansi); // Bottom right
  canvas.insert(x1, y1, "└", ansi); // Bottom left
}
