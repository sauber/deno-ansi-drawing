import type { Canvas } from "./types.ts";

/** Draw a frame with rounded corners on a canvas
 * @param canvas The canvas to draw on
 * @param x The x-coordinate of the bottom-left corner of the frame
 * @param y The y-coordinate of the bottom-left corner of the frame
 * @param width The width of the frame, minimum 2
 * @param height The height of the frame, minimum 2
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
  // Confirm that the width and height are sufficient to draw a frame
  if (width < 2 || height < 2) {
    throw new Error("Width and height must be at least 2 to draw a frame.");
  }
  // Top and bottom edges
  for (let i = 1; i < width - 1; i++) {
    canvas.insert(x + i, y + height - 1, "─", ansi);
    canvas.insert(x + i, y, "─", ansi);
  }
  // Left and right edges
  for (let i = 1; i < height - 1; i++) {
    canvas.insert(x, y + i, "│", ansi);
    canvas.insert(x + width - 1, y + i, "│", ansi);
  }
  // Top left corner
  canvas.insert(x, y + height - 1, "┌", ansi);
  // Top right corner
  canvas.insert(x + width - 1, y + height - 1, "┐", ansi);
  // Bottom right corner
  canvas.insert(x + width - 1, y, "┘", ansi);
  // Bottom left corner
  canvas.insert(x, y, "└", ansi);
}
