import type { Matrix2D } from './matrix-2d';
import type { Point } from './point';

/** The origin: the point when none is given. */
const ORIGIN = { x: 0, y: 0 };
/** The identity matrix: no transform, when none is given. */
const IDENTITY = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };

/**
 * Applies a transform to a point, translation included: where a point of an element's local space lands.
 *
 * @param point - A point in the local space. Defaults to the origin `{ x: 0, y: 0 }`.
 * @param matrix - The matrix to apply, such as the result of `parseTransform`. Defaults to the identity matrix.
 * @returns The transformed point.
 * @example
 * transformPoint({ x: 1, y: 1 }, { a: 2, b: 0, c: 0, d: 2, e: 100, f: 0 }); // { x: 102, y: 2 }
 */
export function transformPoint(point?: Point | null, matrix?: Matrix2D | null): Point {
  const resolvedPoint = point ?? ORIGIN;
  const resolvedMatrix = matrix ?? IDENTITY;
  return {
    x: resolvedMatrix.a * resolvedPoint.x + resolvedMatrix.c * resolvedPoint.y + resolvedMatrix.e,
    y: resolvedMatrix.b * resolvedPoint.x + resolvedMatrix.d * resolvedPoint.y + resolvedMatrix.f,
  };
}
