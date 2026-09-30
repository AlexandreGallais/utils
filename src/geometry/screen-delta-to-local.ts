import { invertMatrix } from './invert-matrix';
import type { Matrix2D } from './matrix-2d';
import type { Point } from './point';
import { transformDelta } from './transform-delta';

/** The origin: the point when none is given. */
const ORIGIN = { x: 0, y: 0 };
/** The identity matrix: no transform, when none is given. */
const IDENTITY = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };

/**
 * Converts a movement made on screen (a drag) into the local coordinates of a transformed element, so it can
 * be added to the element's own `x` / `y` even when the element is rotated, flipped or scaled: no need to
 * reset the transform first.
 *
 * @param delta - The movement on screen, as `{ x: dx, y: dy }`. Defaults to the origin `{ x: 0, y: 0 }`.
 * @param matrix - The element's transform to the screen, such as `element.getScreenCTM()`. Defaults to the identity
 * matrix.
 * @returns The same movement in the element's local space, or `undefined` when `matrix` is not invertible.
 * @example
 * // element flipped horizontally: dragging 10 px to the right means x - 10 in its own coordinates
 * screenDeltaToLocal({ x: 10, y: 0 }, { a: -1, b: 0, c: 0, d: 1, e: 200, f: 0 }); // { x: -10, y: 0 }
 */
export function screenDeltaToLocal(delta?: Point | null, matrix?: Matrix2D | null): Point | undefined {
  const resolvedDelta = delta ?? ORIGIN;
  const resolvedMatrix = matrix ?? IDENTITY;
  const inverse = invertMatrix(resolvedMatrix);
  return inverse && transformDelta(resolvedDelta, inverse);
}
