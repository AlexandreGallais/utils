import { getRotationRadians, withFixedPoint } from './internal';
import type { Matrix2D } from './matrix-2d';
import type { Point } from './point';

/**
 * Cancels the rotation of a transform without moving the element: the pivot (typically its center) stays at
 * the same place on screen, and the flip, the scale and the skew are kept. Straightens a rotated symbol or
 * label in place.
 *
 * @param matrix - The current transform of the element.
 * @param pivot - The local point that stays in place, such as the center of its bounding box.
 * @returns The transform without rotation.
 * @example
 * const center = { x: 10, y: 10 }; // center of a 20 × 20 symbol
 * resetMatrixRotation(parseTransform('translate(100 50) rotate(45 10 10)') ?? createIdentityMatrix(), center);
 * // translate(100 50): upright, center still at (110, 60)
 */
export function resetMatrixRotation(matrix: Matrix2D, pivot: Point): Matrix2D {
  const angle = -getRotationRadians(matrix);
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const linear = {
    a: cos * matrix.a - sin * matrix.b,
    b: sin * matrix.a + cos * matrix.b,
    c: cos * matrix.c - sin * matrix.d,
    d: sin * matrix.c + cos * matrix.d,
    e: 0,
    f: 0,
  };
  return withFixedPoint(matrix, linear, pivot);
}
