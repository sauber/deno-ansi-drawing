import { CharCanvas } from "./canvas.ts";
import { drawLine } from "./line.ts";
import type { Canvas } from "./types.ts";
import { assertEquals } from "@std/assert";

Deno.test("Line drawing", () => {
  const canvas: Canvas = new CharCanvas();
  drawLine(canvas, 0, 0, 5, 1);
  // console.log(canvas.toString());
  assertEquals(canvas.toString(), "    ⢀⡀\n⣀⠤⠒⠊⠁ ");
});
