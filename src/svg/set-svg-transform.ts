import { formatMatrix } from '../geometry';
import type { Matrix2D } from '../geometry';

/** Decimals written in the attribute: a millionth of a unit, invisible at any zoom level. */
const FRACTION_DIGITS = 6;

/**
 * Writes a matrix as the `transform` attribute of an SVG element, as `matrix(a b c d e f)`.
 *
 * @param element - The SVG element to transform.
 * @param matrix - The transform from its local coordinates to its parent's.
 * @example
 * setSvgTransform(symbol, moveMatrix(getSvgTransform(symbol), 10, 0));
 */
export function setSvgTransform(element: Element, matrix: Matrix2D): void {
  element.setAttribute('transform', formatMatrix(matrix, FRACTION_DIGITS));
}
