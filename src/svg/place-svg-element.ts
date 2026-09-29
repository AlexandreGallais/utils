import type { Anchor } from '../geometry/anchor.ts';
import { getSvgAnchorPoint } from './get-svg-anchor-point.ts';
import { moveSvgElement } from './move-svg-element.ts';

/**
 * Moves an SVG element so that one of its 9 anchors lands on one of the 9 anchors of another element, as
 * seen on screen, whatever groups and transforms each one is in: a badge on the top-right corner of a
 * rotated symbol, a label in the middle of a zone. Only the position changes.
 *
 * @param element - The element to move.
 * @param elementAnchor - Its point that must land on the target, such as `'center'` or `'top-left'`.
 * @param reference - The element to align with.
 * @param referenceAnchor - The point of `reference` to reach, such as `'top-right'`.
 * @throws {TypeError} When an element is not rendered, a transform is flattened or a `transform` attribute
 * is invalid.
 * @example
 * placeSvgElement(badge, 'center', symbol, 'top-right'); // badge centered on the symbol's top-right corner
 * placeSvgElement(label, 'top', gauge, 'bottom'); // label just under the gauge
 */
export function placeSvgElement(
  element: SVGGraphicsElement,
  elementAnchor: Anchor,
  reference: SVGGraphicsElement,
  referenceAnchor: Anchor,
): void {
  const from = getSvgAnchorPoint(element, elementAnchor);
  const to = getSvgAnchorPoint(reference, referenceAnchor);
  moveSvgElement(element, to.x - from.x, to.y - from.y);
}
