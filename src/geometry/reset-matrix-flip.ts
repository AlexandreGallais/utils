import { withFixedPoint } from './internal';
import { isMatrixFlipped } from './is-matrix-flipped';
import type { Matrix2D } from './matrix-2d';
import type { Point } from './point';

/** The origin: the point when none is given. */
const ORIGIN = { x: 0, y: 0 };

/**
 * Cancels the mirroring of a transform without moving the element: the pivot stays at the same place on
 * screen, and the rotation and the scale are kept. Makes a flipped text readable again in place.
 *
 * @param matrix - The current transform of the element.
 * @param pivot - The local point that stays in place, such as the center of its bounding box. Defaults to the origin `{
 * x: 0, y: 0 }`.
 * @returns The transform without flip; `matrix` itself when it is not mirrored.
 * @example
 * resetMatrixFlip(parseTransform('scale(-1 1)') ?? createIdentityMatrix(), { x: 10, y: 5 });
 * // { a: 1, b: 0, c: 0, d: 1, e: -20, f: 0 }: unmirrored, (10, 5) still drawn at (-10, 5)
 */
export function resetMatrixFlip(matrix: Matrix2D, pivot?: Point | null): Matrix2D {
  const resolvedPivot = pivot ?? ORIGIN;
  if (!isMatrixFlipped(matrix)) {
    return matrix;
  }
  // `rotate(θ) scale(-sx, sy)` without the flip is `rotate(θ) scale(sx, sy)`: negate the first column.
  return withFixedPoint(matrix, { a: -matrix.a, b: -matrix.b, c: matrix.c, d: matrix.d, e: 0, f: 0 }, resolvedPivot);
}
