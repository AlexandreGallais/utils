import { roundToFractionDigits } from '../math/round-to-fraction-digits.ts';
import type { Matrix2D } from './matrix-2d.ts';

/**
 * Formats a matrix as the value of an SVG `transform` attribute (or a CSS `transform` with commas). Values
 * are rounded, so float noise such as `6.123233995736766e-17` becomes `0`.
 *
 * @param matrix - The transform to write, such as the result of `multiplyMatrices`.
 * @param maxFractionDigits - Decimals kept per value, an integer in [0, 100].
 * @returns `'matrix(a b c d e f)'`.
 * @throws {RangeError} When `maxFractionDigits` is not an integer in [0, 100].
 * @example
 * element.setAttribute('transform', formatMatrix(parseTransform('rotate(90)') ?? identityMatrix(), 6));
 * // 'matrix(0 1 -1 0 0 0)'
 */
export function formatMatrix(matrix: Matrix2D, maxFractionDigits: number): string {
  const values = [matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f];
  return `matrix(${values.map((value) => roundToFractionDigits(value, maxFractionDigits)).join(' ')})`;
}
