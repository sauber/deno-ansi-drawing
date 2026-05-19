import { CharCanvas } from "./canvas.ts";
import { drawLabel, drawLabelCentered } from "./label.ts";
import { assertEquals } from "@std/assert";

Deno.test("drawLabel", () => {
  const canvas = new CharCanvas();
  drawLabel(canvas, 0, 0, "Hi");
  assertEquals(canvas.toString(), "Hi");
});

Deno.test("drawLabelCentered", () => {
  const canvas = new CharCanvas();
  drawLabel(canvas, 0, 0, "AAAAA");
  drawLabelCentered(canvas, 2, 0, "B");
  assertEquals(canvas.toString(), "AABAA");
});
