import type { Matrix2D } from '../geometry/matrix-2d.ts';
import { parseTransform } from '../geometry/parse-transform.ts';

/**
 * Reads the `transform` attribute of an SVG element as a matrix, from its local coordinates to its parent's.
 *
 * @param element - The SVG element, such as a `<g>` symbol or a `<text>`.
 * @returns The matrix; the identity without `transform` attribute.
 * @throws {TypeError} When the attribute is not a valid SVG transform list.
 * @example
 * const matrix = getSvgTransform(symbol); // from transform="translate(100 50) rotate(45)"
 */
export function getSvgTransform(element: Element): Matrix2D {
  const text = element.getAttribute('transform') ?? '';
  const matrix = parseTransform(text);
  if (matrix === undefined) {
    throw new TypeError(`Invalid transform: '${text}'`);
  }
  return matrix;
}
