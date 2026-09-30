import type { Matrix2D } from './matrix-2d';
import type { Point } from './point';

/** The origin: the point when none is given. */
const ORIGIN = { x: 0, y: 0 };
/** The identity matrix: no transform, when none is given. */
const IDENTITY = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };

/**
 * Applies a transform to a displacement: rotation, scale, skew and flips, without the translation (a
 * movement does not depend on where it starts).
 *
 * @param delta - A movement, as `{ x: dx, y: dy }`. Defaults to the origin `{ x: 0, y: 0 }`.
 * @param matrix - The matrix to apply, such as the result of `parseTransform`. Defaults to the identity matrix.
 * @returns The transformed movement.
 * @example
 * transformDelta({ x: 10, y: 0 }, { a: 0, b: 1, c: -1, d: 0, e: 500, f: 500 }); // { x: 0, y: 10 }
 */
export function transformDelta(delta?: Point | null, matrix?: Matrix2D | null): Point {
  const resolvedDelta = delta ?? ORIGIN;
  const resolvedMatrix = matrix ?? IDENTITY;
  return {
    x: resolvedMatrix.a * resolvedDelta.x + resolvedMatrix.c * resolvedDelta.y,
    y: resolvedMatrix.b * resolvedDelta.x + resolvedMatrix.d * resolvedDelta.y,
  };
}
