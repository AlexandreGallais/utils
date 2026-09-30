import type { Point } from '../geometry';
import { transformPoint } from '../geometry';
import { getSvgMatrixBetween } from './get-svg-matrix-between';

/** The origin: the point when none is given. */
const ORIGIN = { x: 0, y: 0 };

/**
 * Converts a point from the coordinates of one SVG element to those of another, whatever groups and
 * transforms lie between them.
 *
 * @param point - The point, in the local coordinates of `from`. Defaults to the origin `{ x: 0, y: 0 }`.
 * @param from - The element the point belongs to.
 * @param to - The element whose coordinates are wanted.
 * @returns The same point on screen, in the local coordinates of `to`.
 * @throws {TypeError} When an element is not rendered, or `to` is flattened.
 * @example
 * const tip = convertSvgPoint({ x: 0, y: -40 }, needle, overlayLayer); // needle tip in the overlay
 */
export function convertSvgPoint(
  point: Point | null | undefined,
  from: SVGGraphicsElement,
  to: SVGGraphicsElement,
): Point {
  const resolvedPoint = point ?? ORIGIN;
  return transformPoint(resolvedPoint, getSvgMatrixBetween(from, to));
}
