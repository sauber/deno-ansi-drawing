import type { Canvas } from "./types.ts";
import { drawFrame } from "./frame.ts";
import { assertEquals, assertThrows } from "@std/assert";
import { CharCanvas } from "./canvas.ts";

Deno.test("drawFrame frame", () => {
  const canvas: Canvas = new CharCanvas();
  drawFrame(canvas, 0, 0, 3, 3);
  assertEquals(canvas.toString(), "┌─┐\n│ │\n└─┘");
});

Deno.test("drawFrame minimum size", () => {
  const canvas: Canvas = new CharCanvas();
  assertThrows(() => drawFrame(canvas, 0, 0, 1, 1));
});

Deno.test("Float#1", () => {
  const position = [
    14.669710012050714,
    5.466408422492504,
    25.238675876884326,
    8.903691876313028,
  ];
  const canvas: Canvas = new CharCanvas();
  drawFrame(
    canvas,
    position[0],
    position[1],
    position[2] - position[0],
    position[3] - position[1],
  );
  // console.log(canvas.toString());
  assertEquals(
    canvas.toString(),
    [
      "┌────────┐",
      "│        │",
      "│        │",
      "└────────┘",
    ].join("\n"),
  );
});

Deno.test("Float#2", () => {
  const position = [
    46.64728588917686,
    17.710518022841903,
    52.67268232266839,
    23.22815091068719,
  ];
  const canvas: Canvas = new CharCanvas();
  drawFrame(
    canvas,
    position[0],
    position[1],
    position[2] - position[0],
    position[3] - position[1],
  );
  // console.log(canvas.toString());
  assertEquals(
    canvas.toString(),
    [
      "┌────┐",
      "│    │",
      "│    │",
      "│    │",
      "└────┘",
    ].join("\n"),
  );
});
