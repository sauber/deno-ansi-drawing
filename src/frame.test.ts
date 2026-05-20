import type { Canvas } from "./types.ts";
import { drawFrame } from "./frame.ts";
import { assertEquals } from "@std/assert";
import { CharCanvas } from "./canvas.ts";

// Description, x, y, width, height, output
type TestCase = [string, number, number, number, number, string];

const testcases: TestCase[] = [
  ["Zero", 0, 0, 0, 0, ""],
  ["Small", 0, 0, 0.4, 0.4, "▢"],
  ["Flat", 0, 0, 2.6, 0.4, "╶─╴"],
  ["Narrow", 0, 0, 0.4, 2.6, "╷\n│\n╵"],
  ["1x1", 0, 0, 1, 1, "▢"],
  ["2x2", 0, 0, 2, 2, "╭╮\n╰╯"],
  ["3x3", 0, 0, 3, 3, "╭─╮\n│ │\n╰─╯"],
  ["Negative", 0, 0, -3, -2, "╭─╮\n╰─╯"],
  [
    "Float#1",
    14.67,
    5.47,
    10.56,
    3.44,
    [
      "╭──────────╮",
      "│          │",
      "│          │",
      "╰──────────╯",
    ].join("\n"),
  ],
  [
    "Float#2",
    46.67,
    17.71,
    6.03,
    5.52,
    [
      "╭─────╮",
      "│     │",
      "│     │",
      "│     │",
      "│     │",
      "│     │",
      "╰─────╯",
    ].join("\n"),
  ],
];

Deno.test("drawFrame", async (t) => {
  for (const [desc, x, y, width, height, expected] of testcases) {
    await t.step(desc, () => {
      const canvas: Canvas = new CharCanvas();
      drawFrame(canvas, x, y, width, height);
      const output = canvas.toString();
      assertEquals(output, expected, desc);
    });
  }
});
