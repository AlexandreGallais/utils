import type { Matrix2D } from '../matrix-2d';

/**
 * Reads the rotation of a transform, a mirrored transform being read as a horizontal flip applied before
 * the rotation (`rotate(θ) scale(-1, 1)`), the way symbol editors present it.
 *
 * @internal
 * @param matrix - The transform.
 * @returns The rotation in radians, clockwise in SVG coordinates.
 */
export function getRotationRadians(matrix: Matrix2D): number {
  const isFlipped = matrix.a * matrix.d < matrix.b * matrix.c;
  // For `rotate(θ) scale(-sx, sy)`, the first column is `-sx (cos θ, sin θ)`.
  return isFlipped ? Math.atan2(-matrix.b, -matrix.a) : Math.atan2(matrix.b, matrix.a);
}
