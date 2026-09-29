import { invertMatrix } from './invert-matrix.ts';
import type { Matrix2D } from './matrix-2d.ts';
import type { Point } from './point.ts';
import { transformDelta } from './transform-delta.ts';

/**
 * Converts a movement made on screen (a drag) into the local coordinates of a transformed element, so it can
 * be added to the element's own `x` / `y` even when the element is rotated, flipped or scaled: no need to
 * reset the transform first.
 *
 * @param delta - The movement on screen, as `{ x: dx, y: dy }`.
 * @param matrix - The element's transform to the screen, such as `element.getScreenCTM()`.
 * @returns The same movement in the element's local space, or `undefined` when `matrix` is not invertible.
 * @example
 * // element flipped horizontally: dragging 10 px to the right means x - 10 in its own coordinates
 * screenDeltaToLocal({ x: 10, y: 0 }, { a: -1, b: 0, c: 0, d: 1, e: 200, f: 0 }); // { x: -10, y: 0 }
 */
export function screenDeltaToLocal(delta: Point, matrix: Matrix2D): Point | undefined {
  const inverse = invertMatrix(matrix);
  return inverse && transformDelta(delta, inverse);
}
