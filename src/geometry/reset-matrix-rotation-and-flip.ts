import { withFixedPoint } from './internal';
import type { Matrix2D } from './matrix-2d';
import type { Point } from './point';

/** The origin: the point when none is given. */
const ORIGIN = { x: 0, y: 0 };

/**
 * Resets the rotation, the flips and the skew of a transform while keeping its size and the place of the
 * pivot on screen: the element stays where it is, upright and unmirrored, so moving or resizing it
 * afterwards works with plain screen offsets.
 *
 * @param matrix - The current transform of the element.
 * @param pivot - The local point that stays in place, such as the center of its bounding box, or
 * `{ x: 0, y: 0 }` to keep the local origin. Defaults to the origin `{ x: 0, y: 0 }`.
 * @returns A translation and a positive scale, with the absolute scales of `matrix`.
 * @example
 * // rotate(90) scale(-2 2) at (100, 50) → translate(100 50) scale(2)
 * resetMatrixRotationAndFlip({ a: 0, b: -2, c: -2, d: 0, e: 100, f: 50 }, { x: 0, y: 0 }); // { a: 2, b: 0, c: 0, d: 2,
 * e: 100, f: 50 }
 */
export function resetMatrixRotationAndFlip(matrix: Matrix2D, pivot?: Point | null): Matrix2D {
  const resolvedPivot = pivot ?? ORIGIN;
  const scaleX = Math.hypot(matrix.a, matrix.b);
  const scaleY = Math.hypot(matrix.c, matrix.d);
  return withFixedPoint(matrix, { a: scaleX, b: 0, c: 0, d: scaleY, e: 0, f: 0 }, resolvedPivot);
}
