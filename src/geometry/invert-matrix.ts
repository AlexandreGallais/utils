import type { Matrix2D } from './matrix-2d';

/**
 * Computes the inverse transform: it brings points from the transformed (screen) space back into the local
 * space of an element, such as a click position into a rotated symbol's coordinates.
 *
 * @param matrix - An invertible matrix.
 * @returns The inverse matrix, or `undefined` when `matrix` flattens the plane (zero determinant, such as a
 * zero scale).
 * @example
 * invertMatrix({ a: 2, b: 0, c: 0, d: 2, e: 100, f: 0 }); // { a: 0.5, b: 0, c: 0, d: 0.5, e: -50, f: 0 }
 */
export function invertMatrix(matrix: Matrix2D): Matrix2D | undefined {
  const { a, b, c, d, e, f } = matrix;
  const determinant = a * d - b * c;
  if (determinant === 0 || !Number.isFinite(determinant)) {
    return undefined;
  }
  return {
    a: d / determinant,
    b: -b / determinant,
    c: -c / determinant,
    d: a / determinant,
    e: (c * f - d * e) / determinant,
    f: (b * e - a * f) / determinant,
  };
}
