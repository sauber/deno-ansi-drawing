import type { Canvas } from "./types.ts";

/** Plot a text label
 * @param canvas The canvas to draw on
 * @param x The x-coordinate of the left edge of the label
 * @param y The y-coordinate of the bottom edge of the label
 * @param text The text to draw
 * @param ansi The ANSI escape code for styling the text
 */
export function drawLabel(
  canvas: Canvas,
  x: number,
  y: number,
  text: string,
  ansi?: string,
): void {
  // Copy each char to the canvas
  for (let i = 0; i < text.length; i++) {
    canvas.insert(x + i, y, text[i], ansi);
  }
}

/** Plot a centered text label
 * @param canvas The canvas to draw on
 * @param x The x-coordinate of the center of the label
 * @param y The y-coordinate of the middle of the label
 * @param text The text to draw
 * @param ansi The ANSI escape code for styling the text
 */
export function drawLabelCentered(
  canvas: Canvas,
  x: number,
  y: number,
  text: string,
  ansi?: string,
): void {
  // Calculate the starting x-coordinate to center the text
  const startX = Math.floor(x + text.length / 2);
  drawLabel(canvas, startX, y, text, ansi);
}
