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
  const absW = Math.abs(width);
  const absH = Math.abs(height);

  // If both dimensions are very small, draw nothing
  if (absW < 0.5 && absH < 0.5) {
    return;
  }

  const x0 = Math.round(x);
  const y0 = Math.round(y);

  // Horizontal line (height < 0.5, width >= 0.5)
  if (absH < 0.5 && absW >= 0.5) {
    const L = Math.round(absW);
    if (L >= 1) {
      canvas.insert(x0, y0, "╶", ansi);
      // Fill middle with horizontal line characters
      for (let i = 1; i < L - 1; i++) {
        canvas.insert(x0 + i, y0, "─", ansi);
      }
      canvas.insert(x0 + L - 1, y0, "╴", ansi);
    }
    return;
  }

  // Vertical line (width < 0.5, height >= 0.5)
  if (absW < 0.5 && absH >= 0.5) {
    const L = Math.round(absH);
    if (L >= 1) {
      // Insert bottom cap "╵" at bottom (y0 is bottom)
      canvas.insert(x0, y0, "╵", ansi);
      // Insert middle "│" for each intermediate row
      for (let j = 1; j < L - 1; j++) {
        canvas.insert(x0, y0 + j, "│", ansi);
      }
      // Insert top cap "╷" at top
      canvas.insert(x0, y0 + L - 1, "╷", ansi);
    }
    return;
  }

  // Full frame
  // Determine integer width and height, enforcing minimum size of 2x2
  const w = Math.max(2, Math.round(absW));
  const h = Math.max(2, Math.round(absH));

  // Draw corners (y0 is bottom in canvas coordinate system)
  canvas.insert(x0, y0, "╰", ansi); // bottom-left
  canvas.insert(x0 + w, y0, "╯", ansi); // bottom-right
  canvas.insert(x0, y0 + h, "╭", ansi); // top-left
  canvas.insert(x0 + w, y0 + h, "╮", ansi); // top-right

  // Draw top and bottom horizontal edges
  for (let i = 1; i < w; i++) {
    // bottom edge (y0)
    canvas.insert(x0 + i, y0, "─", ansi);
    // top edge (y0 + h)
    canvas.insert(x0 + i, y0 + h, "─", ansi);
  }

  // Draw left and right vertical edges
  for (let j = 1; j < h; j++) {
    // left edge (x0)
    canvas.insert(x0, y0 + j, "│", ansi);
    // right edge (x0 + w)
    canvas.insert(x0 + w, y0 + j, "│", ansi);
  }

  // Fill interior with spaces
  for (let j = 1; j < h; j++) {
    for (let i = 1; i < w; i++) {
      canvas.insert(x0 + i, y0 + j, " ", ansi);
    }
  }
}
