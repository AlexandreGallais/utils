import type { Anchor } from './anchor';
import { getSvgAnchorPoint } from './get-svg-anchor-point';
import { getScreenMatrix } from './internal';

/**
 * Finds an anchor of an element as seen on screen, in the coordinates of another element, whatever groups
 * lie between: the center of a hub for the `setRotate` of a needle drawn in another group.
 *
 * @param element - The element giving the point.
 * @param anchor - The point of its visible box, such as `'center'`.
 * @param target - The element whose coordinates are wanted.
 * @returns The point, in the coordinates of `target`, after its whole `transform` list.
 * @throws {TypeError} When an element is not rendered.
 * @example
 * const hub = getSvgAnchorPointIn(hubElement, 'center', needle);
 */
export function getSvgAnchorPointIn(element: SVGGraphicsElement, anchor: Anchor, target: SVGGraphicsElement): DOMPoint {
  return getSvgAnchorPoint(element, anchor).matrixTransform(getScreenMatrix(target).inverse());
}
