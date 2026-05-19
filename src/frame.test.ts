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
