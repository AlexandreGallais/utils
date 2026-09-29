import type { Matrix2D } from './matrix-2d.ts';

/**
 * Resets the rotation, the flips and the skew of a transform while keeping its translation and its size:
 * the element keeps its local origin at the same place, upright and unmirrored, so moving or resizing it
 * afterwards works with plain screen offsets.
 *
 * @param matrix - The current transform of the element.
 * @returns `translate(e f) scale(sx sy)` with the absolute scales of `matrix`.
 * @example
 * // rotate(90) scale(-2 2) at (100, 50) → translate(100 50) scale(2)
 * removeRotationAndFlip({ a: 0, b: -2, c: -2, d: 0, e: 100, f: 50 }); // { a: 2, b: 0, c: 0, d: 2, e: 100, f: 50 }
 */
export function removeRotationAndFlip(matrix: Matrix2D): Matrix2D {
  const scaleX = Math.hypot(matrix.a, matrix.b);
  const scaleY = Math.hypot(matrix.c, matrix.d);
  return { a: scaleX, b: 0, c: 0, d: scaleY, e: matrix.e, f: matrix.f };
}
