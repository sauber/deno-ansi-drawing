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
drawLine(canvas, 5, 0, 15, 4.5);
drawCircle(canvas, 4, 3, 2);
drawDots(canvas, [{ x: 7, y: 5 }, { x: 9, y: 5 }]);
drawLabelCentered(canvas, 6, 2, "Hello");

console.log(canvas.toString());
