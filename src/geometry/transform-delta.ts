import type { Matrix2D } from './matrix-2d';
import type { Point } from './point';

/**
 * Applies a transform to a displacement: rotation, scale, skew and flips, without the translation (a
 * movement does not depend on where it starts).
 *
 * @param delta - A movement, as `{ x: dx, y: dy }`.
 * @param matrix - The matrix to apply, such as the result of `parseTransform`.
 * @returns The transformed movement.
 * @example
 * transformDelta({ x: 10, y: 0 }, { a: 0, b: 1, c: -1, d: 0, e: 500, f: 500 }); // { x: 0, y: 10 }
 */
export function transformDelta(delta: Point, matrix: Matrix2D): Point {
  return { x: matrix.a * delta.x + matrix.c * delta.y, y: matrix.b * delta.x + matrix.d * delta.y };
}
