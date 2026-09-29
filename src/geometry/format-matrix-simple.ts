import { formatMatrix } from './format-matrix.ts';
import type { Matrix2D } from './matrix-2d.ts';

/** Decimals written: a millionth of a unit, invisible at any zoom level. */
const FRACTION_DIGITS = 6;

/**
 * Writes a matrix as an SVG `transform` value like `formatMatrix`, precise to a millionth.
 *
 * @param matrix - The transform to write.
 * @returns `'matrix(a b c d e f)'`.
 * @simple Six decimals.
 * @example
 * element.setAttribute('transform', formatMatrixSimple(matrix));
 */
export function formatMatrixSimple(matrix: Matrix2D): string {
  return formatMatrix(matrix, FRACTION_DIGITS);
}
