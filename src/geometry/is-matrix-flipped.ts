import type { Matrix2D } from './matrix-2d.ts';

/**
 * Checks whether a transform mirrors the element (an odd number of flips), whatever its rotation.
 *
 * @param matrix - The transform of the element, such as the result of `parseTransform`.
 * @returns `true` when the transform mirrors (negative determinant).
 * @example
 * isMatrixFlipped(parseTransform('scale(-1 1)') ?? identityMatrix()); // true
 * isMatrixFlipped(parseTransform('scale(-1 -1)') ?? identityMatrix()); // false (a 180° rotation)
 */
export function isMatrixFlipped(matrix: Matrix2D): boolean {
  return matrix.a * matrix.d < matrix.b * matrix.c;
}
