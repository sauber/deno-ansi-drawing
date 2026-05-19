/** A text canvas to insert chars on.
 * X direction is left to right, Y direction is bottom to top.
 */
export interface Canvas {
  insert(x: number, y: number, char: string, ansi?: string): void;
  toString(): string;
}
