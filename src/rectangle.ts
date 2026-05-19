import type { Canvas } from "./types.ts";

/** Draw a rectangle using terminal block chars */
function _old_drawRectangle(
  canvas: Canvas,
  x: number,
  y: number,
  width: number,
  height: number,
  ansi?: string,
): void {
  // Move x and y if width or height is negative
  if (width < 0) {
    x += width;
    width = -width;
  }
  if (height < 0) {
    y += height;
    height = -height;
  }

  // Confirm width and height are positive are large enough for at least a half block
  if (width <= 0.5 || height <= 0.5) return;

  // Are edges full or half blocks?
  const leftFraction = x - Math.floor(x);
  const rightFraction = Math.ceil(x + width) - (x + width);
  const bottomFraction = y - Math.floor(y);
  const topFraction = Math.ceil(y + height) - (y + height);

  console.log({
    leftFraction,
    rightFraction,
    bottomFraction,
    topFraction,
  });

  // Top left corner
  let topLeftChar: string = "▗";
  if (leftFraction > 0.5 && topFraction > 0.5) {
    topLeftChar = "█";
  } else if (leftFraction > 0.5) {
    topLeftChar = "▄";
  } else if (topFraction > 0.5) {
    topLeftChar = "▐";
  }

  // Top right corner
  let topRightChar: string = "▖";
  if (rightFraction > 0.5 && topFraction > 0.5) {
    topRightChar = "█";
  } else if (rightFraction > 0.5) {
    topRightChar = "▄";
  } else if (topFraction > 0.5) {
    topRightChar = "▌";
  }

  // Bottom left corner
  let bottomLeftChar: string = "▝";
  if (leftFraction > 0.5 && bottomFraction > 0.5) {
    bottomLeftChar = "█";
  } else if (leftFraction > 0.5) {
    bottomLeftChar = "▀";
  } else if (bottomFraction > 0.5) {
    bottomLeftChar = "▐";
  }

  // Bottom right corner
  let bottomRightChar: string = "▘";
  if (rightFraction > 0.5 && bottomFraction > 0.5) {
    bottomRightChar = "█";
  } else if (rightFraction > 0.5) {
    bottomRightChar = "▀";
  } else if (bottomFraction > 0.5) {
    bottomRightChar = "▌";
  }
  console.log(topLeftChar, topRightChar, bottomLeftChar, bottomRightChar);
  canvas.insert(x, y + height - 1, topLeftChar, ansi);
  canvas.insert(x + width - 1, y + height - 1, topRightChar, ansi);
  canvas.insert(x, y, bottomLeftChar, ansi);
  canvas.insert(x + width - 1, y, bottomRightChar, ansi);

  // Fill in the horizontal edges
  const topChar = topFraction > 0.5 ? "█" : "▄";
  const bottomChar = bottomFraction > 0.5 ? "█" : "▀";
  for (let i = 1; i < width - 1; i++) {
    canvas.insert(x + i, y + height - 1, topChar);
    canvas.insert(x + i, y, bottomChar);
  }

  // Fill in the vertical edges
  const leftChar = leftFraction > 0.5 ? "█" : "▐";
  const rightChar = rightFraction > 0.5 ? "█" : "▌";
  for (let i = 1; i < height - 1; i++) {
    canvas.insert(x, y + i, leftChar);
    canvas.insert(x + width - 1, y + i, rightChar);
  }

  // Fill in the interior
  const fillChar = "█";
  for (let i = 1; i < width - 1; i++) {
    for (let j = 1; j < height - 1; j++) {
      canvas.insert(x + i, y + j, fillChar);
    }
  }
}

/** Draw a rectangle using terminal block chars */
export function drawRectangle(
  canvas: Canvas,
  x: number,
  y: number,
  width: number,
  height: number,
  ansi?: string,
): void {
  // Move x and y if width or height is negative
  if (width < 0) {
    x += width;
    width = -width;
  }
  if (height < 0) {
    y += height;
    height = -height;
  }

  // Confirm width and height are positive are large enough for at least a half block
  if (width < 0.5 || height < 0.5) return;

  // A grid marking if half blocks are needed
  type Dot = boolean;
  type Row = Array<Dot>;
  type Grid = Array<Row>;

  // Calculate width and height in terms of half blocks
  const xStart = Math.floor(x);
  const yStart = Math.floor(y);
  const xEnd = Math.ceil(x + width);
  const yEnd = Math.ceil(y + height);
  const halfWidth = (xEnd - xStart) * 2;
  const halfHeight = (yEnd - yStart) * 2;

  // Create a grid of dots representing the rectangle, where true means a half block is needed
  const grid: Grid = Array(halfHeight).fill(false).map(() =>
    Array(halfWidth).fill(false)
  );

  // console.log("Init:", { grid });

  // Mark the grid with true for each half block that is covered by the rectangle
  for (let col = 0; col < halfWidth; col++) {
    for (let row = 0; row < halfHeight; row++) {
      const xPos = xStart + col / 2 + 0.25;
      const yPos = yStart + row / 2 + 0.25;
      if (xPos >= x && xPos < x + width && yPos >= y && yPos < y + height) {
        grid[row][col] = true;
      }
    }
  }
  // console.log("Fill:", { grid });

  // Convert the grid of dots into characters and insert them into the canvas
  // 23   48
  // 01   12
  //  0
  //  1 "▖"
  //  2 "▗"
  //  3 "▄"
  //  4 "▘"
  //  5 "▌"
  //  6 "▚"
  //  7 "▙"
  //  8 "▝"
  //  9 "▞"
  // 10 "▐"
  // 11 "▟"
  // 12 "▀"
  // 13 "▛"
  // 14 "▜"
  // 15 "█"

  const chars = " ▖▗▄▘▌▚▙▝▞▐▟▀▛▜█";

  for (let row = 0; row < halfHeight; row += 2) {
    for (let col = 0; col < halfWidth; col += 2) {
      let index = 0;
      // console.log({ row, col });
      if (grid[row][col]) index |= 1; // bottom left
      if (grid[row][col + 1]) index |= 2; // bottom right
      if (grid[row + 1][col]) index |= 4; // top left
      if (grid[row + 1][col + 1]) index |= 8; // top right
      // console.log({ row, col, index, char: chars[index] });
      if (index > 0) {
        canvas.insert(xStart + col / 2, yStart + row / 2, chars[index], ansi);
      }
    }
  }
}
