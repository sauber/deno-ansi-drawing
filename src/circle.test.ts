import { CharCanvas } from "./canvas.ts";
import { drawCircle } from "./circle.ts";
import type { Canvas } from "./types.ts";
import { assertEquals } from "@std/assert";

Deno.test("Circle drawing", () => {
  const canvas: Canvas = new CharCanvas();
  drawCircle(canvas, 2, 2, 2);
  // console.log(canvas.toString());
  assertEquals(
    canvas.toString(),
    [
      " ⢀⣀  ",
      "⡜⠁ ⠙⡄",
      "⠱⢄⣀⠴⠁",
    ].join("\n"),
  );
});
