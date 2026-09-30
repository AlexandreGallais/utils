import { formatMatrix } from '../geometry';
import type { Matrix2D } from '../geometry';

/** The identity matrix: no transform, when none is given. */
const IDENTITY = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };

/** Decimals written in the attribute: a millionth of a unit, invisible at any zoom level. */
const FRACTION_DIGITS = 6;

/**
 * Writes a matrix as the `transform` attribute of an SVG element, as `matrix(a b c d e f)`.
 *
 * @param element - The SVG element to transform.
 * @param matrix - The transform from its local coordinates to its parent's. Defaults to the identity matrix.
 * @example
 * setSvgTransform(symbol, moveMatrix(getSvgTransform(symbol), 10, 0));
 */
export function setSvgTransform(element: Element, matrix?: Matrix2D | null): void {
  const resolvedMatrix = matrix ?? IDENTITY;
  element.setAttribute('transform', formatMatrix(resolvedMatrix, FRACTION_DIGITS));
}
