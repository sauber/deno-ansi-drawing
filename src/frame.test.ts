import type { Canvas } from "./types.ts";
import { drawFrame } from "./frame.ts";
import { assertEquals } from "@std/assert";
import { CharCanvas } from "./canvas.ts";

// Description, x, y, width, height, output
type TestCase = [string, number, number, number, number, string];

const testcases: TestCase[] = [
  ["Zero", 0, 0, 0, 0, ""],
  ["Small", 0, 0, 0.4, 0.4, ""],
  ["Flat", 0, 0, 1.6, 0.4, "╶╴"],
  ["Narrow", 0, 0, 0.4, 1.6, "╷\n╵"],
  ["1x1", 0, 0, 1, 1, "╭╮\n╰╯"],
  ["2x2", 0, 0, 2, 2, "╭─╮\n│ │\n╰─╯"],
  ["3x3", 0, 0, 3, 3, "╭──╮\n│  │\n│  │\n╰──╯"],
  ["Negative", 0, 0, -2, -1, "╭─╮\n╰─╯"],
  [
    "Float#1",
    14.67,
    5.47,
    10.56,
    3.44,
    [
      "╭─────────╮",
      "│         │",
      "│         │",
      "│         │",
      "╰─────────╯",
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
      "╰─────╯",
    ].join("\n"),
  ],
];

Deno.test("drawFrame", async (t) => {
  for (const [desc, x, y, width, height, expected] of testcases) {
    // const canvas: Canvas = new CharCanvas();
    // drawFrame(canvas, x, y, width, height);
    // assertEquals(canvas.toString(), expected, desc);
    await t.step(desc, () => {
      const canvas: Canvas = new CharCanvas();
      drawFrame(canvas, x, y, width, height);
      assertEquals(canvas.toString(), expected, desc);
    });
  }
});

// Deno.test("drawFrame frame", () => {
//   const canvas: Canvas = new CharCanvas();
//   drawFrame(canvas, 0, 0, 3, 3);
//   assertEquals(canvas.toString(), "┌─┐\n│ │\n└─┘");
// });

// Deno.test("drawFrame minimum size", () => {
//   const canvas: Canvas = new CharCanvas();
//   // Should enforce minimum 2x2 size
//   drawFrame(canvas, 0, 0, 1, 1);
//   assertEquals(canvas.toString(), "┌─┐\n│ │\n└─┘");
// });

// Deno.test("drawFrame width 1 height 2", () => {
//   const canvas: Canvas = new CharCanvas();
//   // Width should be enforced to minimum 2
//   drawFrame(canvas, 0, 0, 1, 2);
//   assertEquals(canvas.toString(), "┌─┐\n│ │\n└─┘");
// });

// Deno.test("drawFrame width 2 height 1", () => {
//   const canvas: Canvas = new CharCanvas();
//   // Height should be enforced to minimum 2
//   drawFrame(canvas, 0, 0, 2, 1);
//   assertEquals(canvas.toString(), "┌─┐\n│ │\n└─┘");
// });

// Deno.test("drawFrame width 0 height 0", () => {
//   const canvas: Canvas = new CharCanvas();
//   // Both dimensions should be enforced to minimum 2
//   drawFrame(canvas, 0, 0, 0, 0);
//   assertEquals(canvas.toString(), "┌─┐\n│ │\n└─┘");
// });

// Deno.test("drawFrame negative size", () => {
//   const canvas: Canvas = new CharCanvas();
//   // Negative sizes should be enforced to minimum 2
//   drawFrame(canvas, 0, 0, -1, -1);
//   assertEquals(canvas.toString(), "┌─┐\n│ │\n└─┘");
// });

// Deno.test("Float#1", () => {
//   const position = [
//     14.669710012050714,
//     5.466408422492504,
//     25.238675876884326,
//     8.903691876313028,
//   ];
//   const canvas: Canvas = new CharCanvas();
//   drawFrame(
//     canvas,
//     position[0],
//     position[1],
//     position[2] - position[0],
//     position[3] - position[1],
//   );
//   // console.log(canvas.toString());
//   assertEquals(
//     canvas.toString(),
//     [
//       "┌────────┐",
//       "│        │",
//       "│        │",
//       "└────────┘",
//     ].join("\n"),
//   );
// });

// Deno.test("Float#2", () => {
//   const position = [
//     46.64728588917686,
//     17.710518022841903,
//     52.67268232266839,
//     23.22815091068719,
//   ];
//   const canvas: Canvas = new CharCanvas();
//   drawFrame(
//     canvas,
//     position[0],
//     position[1],
//     position[2] - position[0],
//     position[3] - position[1],
//   );
//   // console.log(canvas.toString());
//   assertEquals(
//     canvas.toString(),
//     [
//       "┌────┐",
//       "│    │",
//       "│    │",
//       "│    │",
//       "└────┘",
//     ].join("\n"),
//   );
// });
