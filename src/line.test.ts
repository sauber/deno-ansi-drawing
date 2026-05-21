import { CharCanvas } from "./canvas.ts";
import { drawLine } from "./line.ts";
import { assertEquals } from "@std/assert";

Deno.test("Line drawing", () => {
  const canvas = new CharCanvas();
  drawLine(canvas, 0, 0, 5, 1);
  assertEquals(canvas.toString(), "    ⢀⡀\n⣀⠤⠒⠊⠁ ");
});
