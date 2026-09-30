import type { Point } from '../geometry';
import { getSvgAnchorPoint } from './get-svg-anchor-point';
import { moveSvgElement } from './move-svg-element';

/** The origin: the point when none is given. */
const ORIGIN = { x: 0, y: 0 };

/**
 * Moves an SVG element so that the center of what is seen lands on a screen point: recenters a symbol or a
 * text drawn off-center (a text is centered on its middle, not on its baseline).
 *
 * @param element - A rendered SVG element.
 * @param target - Where its center must be, in screen pixels (such as the result of `getSvgAnchorPoint`). Defaults to
 * the origin `{ x: 0, y: 0 }`.
 * @throws {TypeError} When the element is not rendered, a transform is flattened or its `transform`
 * attribute is invalid.
 * @example
 * centerSvgElementOn(label, getSvgAnchorPoint(zone, 'center'));
 */
export function centerSvgElementOn(element: SVGGraphicsElement, target?: Point | null): void {
  const resolvedTarget = target ?? ORIGIN;
  const center = getSvgAnchorPoint(element, 'center');
  moveSvgElement(element, resolvedTarget.x - center.x, resolvedTarget.y - center.y);
}
