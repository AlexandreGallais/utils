import type { Anchor, Point } from '../geometry';
import { getAnchorPoint } from '../geometry';
import { getSvgScreenBox } from './get-svg-screen-box';

/**
 * Finds one of the 9 anchors of an SVG element as seen on screen (corners, middles of the sides, center of
 * its visible box), in pixels.
 *
 * @param element - A rendered SVG element.
 * @param anchor - The point, such as `'center'` or `'top-right'`.
 * @returns The point, in screen pixels.
 * @throws {TypeError} When the element is not rendered.
 * @example
 * getSvgAnchorPoint(symbol, 'top-right'); // { x: 220, y: 92 }
 */
export function getSvgAnchorPoint(element: SVGGraphicsElement, anchor: Anchor): Point {
  return getAnchorPoint(getSvgScreenBox(element), anchor);
}
