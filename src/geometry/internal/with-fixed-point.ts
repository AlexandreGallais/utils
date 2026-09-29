import type { Matrix2D } from '../matrix-2d.ts';
import type { Point } from '../point.ts';

/**
 * Replaces the linear part of a transform (rotation, scale, flip, skew) while keeping one local point at
 * the same place in the parent coordinates: the element changes shape around that point without moving.
 *
 * @internal
 * @param original - The current transform.
 * @param linear - The new `a b c d` coefficients; its `e` and `f` are ignored.
 * @param pivot - The local point that must not move, such as the center of the element.
 * @returns The new transform, with the translation that keeps `pivot` in place.
 */
export function withFixedPoint(original: Matrix2D, linear: Matrix2D, pivot: Point): Matrix2D {
  const screenX = original.a * pivot.x + original.c * pivot.y + original.e;
  const screenY = original.b * pivot.x + original.d * pivot.y + original.f;
  const { a, b, c, d } = linear;
  return { a, b, c, d, e: screenX - (a * pivot.x + c * pivot.y), f: screenY - (b * pivot.x + d * pivot.y) };
}
