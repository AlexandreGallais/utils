import { getSvgAnchorPointIn } from '../svg-transform';
import { polarToCartesian } from './internal';
import type { SvgArc } from './svg-arc';

/**
 * Finds a point along an arc, in the coordinates of an element of any group: where to put the label of a
 * graduation or a marker.
 *
 * @param target - The element whose coordinates are wanted, such as the `<g>` of the labels.
 * @param arc - The center element, the radius, the start angle and the opening.
 * @param ratio - The position along the arc: 0 at the start, 1 at the end.
 * @returns The point, in the coordinates of `target`.
 * @throws {TypeError} When an element is not rendered.
 * @example
 * const { x, y } = getSvgArcPoint(labels, { ...arc, radius: 28 }, index / 6);
 */
export function getSvgArcPoint(target: SVGGraphicsElement, arc: SvgArc, ratio: number): DOMPoint {
  const center = getSvgAnchorPointIn(arc.center, 'center', target);
  return polarToCartesian(center, arc.radius, arc.startAngle + arc.sweepAngle * ratio);
}
