import { drawLabelCentered } from "./src/label.ts";
import { drawRectangle } from "./src/rectangle.ts";
import { drawLine } from "./src/line.ts";
import { drawCircle } from "./src/circle.ts";
import { drawDots } from "./src/dots.ts";
import { drawFrame } from "./src/frame.ts";
import { CharCanvas } from "./src/canvas.ts";

const canvas = new CharCanvas();
drawFrame(canvas, 0, 0, 10, 5);
drawRectangle(canvas, 10.5, 0.5, 9, 4);
drawLine(canvas, 0, 0, 10, 4.5);
drawCircle(canvas, 10, 2, 3);
drawDots(canvas, [{ x: 10, y: 2 }, { x: 11, y: 2 }]);
drawLabelCentered(canvas, 5, 2, "Hello");

console.log(canvas.toString());
