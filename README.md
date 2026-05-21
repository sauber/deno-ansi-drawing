# Ansi Draw

Drawing basic shapes in a terminal.

## Examples

Example or using the variuos shapes:

```typescript
import * from "jsr:@sauber/ansi-draw";

const canvas = new CharCanvas();
drawFrame(canvas, 0, 0, 10, 5);
drawRectangle(canvas, 10.5, 0.5, 9, 4);
drawLine(canvas, 5, 0, 15, 4.5);
drawCircle(canvas, 4, 3, 2);
drawDots(canvas, [{ x: 7, y: 5 }, { x: 9, y: 5 }]);
drawLabelCentered(canvas, 9, 3, "Hello");

console.log(canvas.toString());
```

Output will look like this:

```bash
~$ deno example.ts
╭──⢀⣀────╮▗▄▄▄⡠⠂▄▄▄▖
│ ⡜⠁ ⠙⡄Hello⠤⠊█████▌
│ ⠱⢄⣀⠴⠁  ⢀⠔⠁███████▌
│  ⠠⠠  ⣀⠔⠁▐████████▌
╰────⡠⠊──╯▝▀▀▀▀▀▀▀▀▘
```
