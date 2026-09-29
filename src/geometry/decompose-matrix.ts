import { radiansToDegrees } from '../angle/radians-to-degrees.ts';
import type { DecomposedTransform } from './decomposed-transform.ts';
import type { Matrix2D } from './matrix-2d.ts';

/**
 * Splits a matrix into readable steps: translation, rotation, scales and skew. A flip (mirror) shows as a
 * negative `scaleY`: a horizontal flip reads as a 180° rotation with `scaleY` of -1. `composeMatrix` rebuilds
 * the matrix.
 *
 * @param matrix - The matrix, such as the result of `parseTransform` or `getCTM()`.
 * @returns The steps; a matrix that flattens the plane gives a zero `scaleY` and no skew.
 * @example
 * decomposeMatrix({ a: 0, b: 2, c: -2, d: 0, e: 10, f: 0 });
 * // { translateX: 10, translateY: 0, rotation: 90, scaleX: 2, scaleY: 2, skewX: 0 }
 */
export function decomposeMatrix(matrix: Matrix2D): DecomposedTransform {
  const { a, b, c, d, e, f } = matrix;
  const scaleX = Math.hypot(a, b);
  const determinant = a * d - b * c;
  const skew = determinant === 0 ? 0 : Math.atan((a * c + b * d) / determinant);
  return {
    translateX: e,
    translateY: f,
    rotation: radiansToDegrees(Math.atan2(b, a)),
    scaleX,
    scaleY: scaleX === 0 ? Math.hypot(c, d) : determinant / scaleX,
    // `+ 0` turns a `-0` into `0`.
    skewX: radiansToDegrees(skew) + 0,
  };
}
