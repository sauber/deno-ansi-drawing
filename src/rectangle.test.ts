import { assertEquals } from "@std/assert";
import { drawRectangle } from "./rectangle.ts";
import { CharCanvas } from "./canvas.ts";

// Testcases
const testCases = [
  // TODO: negative width and height
  // TODO: Very small sizes like 0.25x0.25
  {
    description: "Zero block 0x0 at (0,0)",
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    expected: "",
  },
  {
    description: "Single block 1x1 at (0,0)",
    x: 0,
    y: 0,
    width: 1,
    height: 1,
    expected: "█",
  },
  {
    description: "Filled block 3x3 at (0,0)",
    x: 0,
    y: 0,
    width: 3,
    height: 3,
    expected: [
      "███",
      "███",
      "███",
    ].join("\n"),
  },
  {
    description: "Top left block 0.5x0.5 at (0,0.5)",
    x: 0,
    y: 0.5,
    width: 0.5,
    height: 0.5,
    expected: "▘",
  },
  {
    description: "Top right block 0.5x0.5 at (0.5,0.5)",
    x: 0.5,
    y: 0.5,
    width: 0.5,
    height: 0.5,
    expected: "▝",
  },
  {
    description: "Bottom left block 0.5x0.5 at (0,0)",
    x: 0,
    y: 0,
    width: 0.5,
    height: 0.5,
    expected: "▖",
  },
  {
    description: "Bottom right block 0.5x0.5 at (0.5,0)",
    x: 0.5,
    y: 0,
    width: 0.5,
    height: 0.5,
    expected: "▗",
  },
  {
    description: "Offset block 1x1 at (0.5,0.5)",
    x: 0.5,
    y: 0.5,
    width: 1,
    height: 1,
    expected: [
      "▗▖",
      "▝▘",
    ].join("\n"),
  },
  {
    description: "Offset block 3x3 at (0.5,0.5)",
    x: 0.5,
    y: 0.5,
    width: 3,
    height: 3,
    expected: [
      "▗▄▄▖",
      "▐██▌",
      "▐██▌",
      "▝▀▀▘",
    ].join("\n"),
  },
  {
    description: "Offset block 3x3 at (0.2,0.2)",
    x: 0.2,
    y: 0.2,
    width: 3,
    height: 3,
    expected: [
      "███",
      "███",
      "███",
    ].join("\n"),
  },
];

Deno.test("drawRectangle testcases", () => {
  for (const { description, x, y, width, height, expected } of testCases) {
    const canvas = new CharCanvas();
    drawRectangle(canvas, x, y, width, height);
    assertEquals(canvas.toString(), expected, description);
  }
});
