import { assertEquals, assertThrows } from "@std/assert";
import { CharCanvas } from "./canvas.ts";

Deno.test("CharCanvas empty instance", () => {
  const cp = new CharCanvas();
  assertEquals(cp.lines, []);
  assertEquals(cp.width, 0);
  assertEquals(cp.height, 0);
});

Deno.test("CharCanvas single chars at integer positions", () => {
  const cp = new CharCanvas();
  cp.insert(0, 0, "A");
  cp.insert(1, 1, "B");
  cp.insert(2, 2, "C");
  assertEquals(cp.lines, ["  C", " B ", "A  "]);
});

Deno.test("CharCanvas double-width chars at integer positions", () => {
  const cp = new CharCanvas();
  cp.insert(0, 0, "あ");
  cp.insert(1, 1, "い");
  assertEquals(cp.lines, [" い", "あ "]);
});

Deno.test("CharCanvas single chars at non-integer positions", () => {
  const cp = new CharCanvas();
  cp.insert(0.5, 0.5, "A");
  cp.insert(1.5, 1.5, "B");
  cp.insert(2.5, 2.5, "C");
  assertEquals(cp.lines, ["  C", " B ", "A  "]);
});

Deno.test("Skipping lines", () => {
  const cp = new CharCanvas();
  cp.insert(0, 0, "A");
  cp.insert(3, 3, "D");
  assertEquals(cp.lines, ["   D", "    ", "    ", "A   "]);
});

Deno.test("Negative positions", () => {
  const cp = new CharCanvas();
  cp.insert(-1, -1, "A");
  cp.insert(-2, -2, "B");
  cp.insert(-3, -3, "C");
  assertEquals(cp.lines, ["  A", " B ", "C  "]);
});

Deno.test("Fail to insert multiple char string at one position", () => {
  const cp = new CharCanvas();
  assertThrows(
    () => cp.insert(0, 0, "CD"),
    Error,
  );
});

Deno.test("ANSI encoded chars", () => {
  const cp = new CharCanvas();
  cp.insert(0, 0, "あ", "\u001b[31m");
  cp.insert(1, 1, "い", "\u001b[32m");
  const lines = cp.lines;
  assertEquals(cp.lines, [
    " \u001b[32mい\u001b[0m",
    "\u001b[31mあ \u001b[0m",
  ]);
});

Deno.test("Two ansi chars of same style", () => {
  const cp = new CharCanvas();
  cp.insert(0, 0, "A", "\u001b[31m");
  cp.insert(1, 0, "B", "\u001b[31m");
  assertEquals(cp.lines, ["\u001b[31mAB\u001b[0m"]);
});

Deno.test("Two adjacent chars with different styles", () => {
  const cp = new CharCanvas();
  cp.insert(0, 0, "A", "\u001b[31m");
  cp.insert(1, 0, "B", "\u001b[32m");
  assertEquals(cp.lines, ["\u001b[31mA\u001b[32mB\u001b[0m"]);
});

Deno.test("Two adjacent chars with different styles and a blank char in between", () => {
  const cp = new CharCanvas();
  cp.insert(0, 0, "A", "\u001b[31m");
  cp.insert(2, 0, "B", "\u001b[32m");
  assertEquals(cp.lines, ["\u001b[31mA \u001b[32mB\u001b[0m"]);
});

Deno.test("ANSI style reset after styled char", () => {
  const cp = new CharCanvas();
  cp.insert(0, 0, "A", "\u001b[31m");
  cp.insert(1, 0, "B");
  assertEquals(cp.lines, ["\u001b[31mA\u001b[0mB"]);
});

Deno.test("ANSI style reset at end of line", () => {
  const cp = new CharCanvas();
  cp.insert(0, 0, "A", "\u001b[31m");
  assertEquals(cp.lines, ["\u001b[31mA\u001b[0m"]);
});

Deno.test("Invalid ANSI code with visible chars", () => {
  const cp = new CharCanvas();
  assertThrows(
    () => cp.insert(0, 0, "A", "\u001b[31mHello\u001b[0m"),
    Error,
  );
});
