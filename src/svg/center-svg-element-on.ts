import type { Point } from '../geometry';
import { getSvgAnchorPoint } from './get-svg-anchor-point';
import { moveSvgElement } from './move-svg-element';

/**
 * Moves an SVG element so that the center of what is seen lands on a screen point: recenters a symbol or a
 * text drawn off-center (a text is centered on its middle, not on its baseline).
 *
 * @param element - A rendered SVG element.
 * @param target - Where its center must be, in screen pixels (such as the result of `getSvgAnchorPoint`).
 * @throws {TypeError} When the element is not rendered, a transform is flattened or its `transform`
 * attribute is invalid.
 * @example
 * centerSvgElementOn(label, getSvgAnchorPoint(zone, 'center'));
 */
export function centerSvgElementOn(element: SVGGraphicsElement, target: Point): void {
  const center = getSvgAnchorPoint(element, 'center');
  moveSvgElement(element, target.x - center.x, target.y - center.y);
}
