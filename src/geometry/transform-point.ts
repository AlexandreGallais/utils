import type { Matrix2D } from './matrix-2d.ts';
import type { Point } from './point.ts';

/**
 * Applies a transform to a point, translation included: where a point of an element's local space lands.
 *
 * @param point - A point in the local space.
 * @param matrix - The matrix to apply, such as the result of `parseTransform`.
 * @returns The transformed point.
 * @example
 * transformPoint({ x: 1, y: 1 }, { a: 2, b: 0, c: 0, d: 2, e: 100, f: 0 }); // { x: 102, y: 2 }
 */
export function transformPoint(point: Point, matrix: Matrix2D): Point {
  return {
    x: matrix.a * point.x + matrix.c * point.y + matrix.e,
    y: matrix.b * point.x + matrix.d * point.y + matrix.f,
  };
}
