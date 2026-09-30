import { roundToFractionDigits } from '../math';
import type { Matrix2D } from './matrix-2d';

/** Decimals when none is given: below a thousandth of a pixel. */
const DEFAULT_MAX_FRACTION_DIGITS = 6;

/**
 * Formats a matrix as the value of an SVG `transform` attribute (or a CSS `transform` with commas). Values
 * are rounded, so float noise such as `6.123233995736766e-17` becomes `0`.
 *
 * @param matrix - The transform to write, such as the result of `multiplyMatrices`.
 * @param maxFractionDigits - Decimals kept per value, an integer in [0, 100]. Defaults to `6`.
 * @returns `'matrix(a b c d e f)'`.
 * @throws {RangeError} When `maxFractionDigits` is not an integer in [0, 100].
 * @example
 * element.setAttribute('transform', formatMatrix(parseTransform('rotate(90)') ?? createIdentityMatrix(), 6));
 * // 'matrix(0 1 -1 0 0 0)'
 */
export function formatMatrix(matrix: Matrix2D, maxFractionDigits?: number | null): string {
  const resolvedMaxFractionDigits = maxFractionDigits ?? DEFAULT_MAX_FRACTION_DIGITS;
  const values = [matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f];
  return `matrix(${values.map((value) => roundToFractionDigits(value, resolvedMaxFractionDigits)).join(' ')})`;
}
