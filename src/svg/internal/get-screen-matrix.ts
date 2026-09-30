import type { Matrix2D } from '../../geometry';

/**
 * Reads the matrix from the local coordinates of an element to screen pixels (the transforms of all its
 * groups and the `viewBox` scaling included).
 *
 * @internal
 * @param element - A rendered SVG element.
 * @returns The cumulated transform matrix.
 * @throws {TypeError} When the element is not rendered (no matrix).
 */
export function getScreenMatrix(element: SVGGraphicsElement): Matrix2D {
  const matrix = element.getScreenCTM();
  if (matrix === null) {
    throw new TypeError('The SVG element is not rendered: it has no transform matrix');
  }
  const { a, b, c, d, e, f } = matrix;
  return { a, b, c, d, e, f };
}
