import { invertMatrix, multiplyMatrices } from '../geometry';
import type { Matrix2D } from '../geometry';
import { getScreenMatrix } from './internal';

/**
 * Computes the matrix that converts coordinates of one SVG element into coordinates of another, whatever
 * groups and transforms lie between them: the base of every "place this relative to that" computation.
 *
 * @param from - The element whose local coordinates are converted.
 * @param to - The element whose local coordinates are wanted.
 * @returns The conversion matrix, to use with `transformPoint`.
 * @throws {TypeError} When an element is not rendered, or `to` is flattened (a zero scale).
 * @example
 * const toNeedle = getSvgMatrixBetween(gaugeFace, needle);
 * transformPoint(getSvgLocalCenter(gaugeFace), toNeedle); // center of the face, in needle coordinates
 */
export function getSvgMatrixBetween(from: SVGGraphicsElement, to: SVGGraphicsElement): Matrix2D {
  const toInverse = invertMatrix(getScreenMatrix(to));
  if (toInverse === undefined) {
    throw new TypeError('The target SVG element is flattened: its coordinates cannot be computed');
  }
  return multiplyMatrices(toInverse, getScreenMatrix(from));
}
