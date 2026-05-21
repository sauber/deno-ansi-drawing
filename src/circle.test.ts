import { CharCanvas } from "./canvas.ts";
import { drawCircle } from "./circle.ts";
import { assertEquals } from "@std/assert";

Deno.test("Circle drawing", () => {
  const canvas = new CharCanvas();
  drawCircle(canvas, 2, 2, 2);
  assertEquals(
    canvas.toString(),
    [
      " ⢀⣀  ",
      "⡜⠁ ⠙⡄",
      "⠱⢄⣀⠴⠁",
    ].join("\n"),
  );
});
