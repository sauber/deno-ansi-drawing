# deno-ansi-drawing

Drawing basic shapes in a terminal.

## Examples

Here is a complete example of defining and agent, input parameters, dashboard
and running the optimization process.

```typescript
import * from "jsr:@sauber/ansi-draw";

const canvas = new CharCanvas();
drawFrame(canvas, 0, 0, 10, 5);
drawRectangle(canvas, 10.5, 0.5, 9, 4);
drawLine(canvas, 0, 0, 10, 4.5);
drawCircle(canvas, 10, 2, 3);
drawDots(canvas, [{ x: 10, y: 2 }, { x: 11, y: 2 }]);
drawLabelCentered(canvas, 5, 2, "Hello");

console.log(canvas.toString());
```
