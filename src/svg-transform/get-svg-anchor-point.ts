import type { Anchor } from './anchor';
import { getAnchorPoint } from './internal';

/**
 * Finds an anchor of the box an SVG element takes on screen: a corner, the middle of a side or the center.
 *
 * @param element - A rendered SVG element.
 * @param anchor - The point, such as `'top-right'`. Defaults to `'center'`.
 * @returns The point, in screen pixels.
 * @example
 * getSvgAnchorPoint(symbol, 'top-right'); // DOMPoint { x: 220, y: 92 }
 */
export function getSvgAnchorPoint(element: SVGGraphicsElement, anchor: Anchor = 'center'): DOMPoint {
  return getAnchorPoint(element.getBoundingClientRect(), anchor);
}
