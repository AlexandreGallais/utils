import { polarToCartesian } from '../geometry';
import type { Point } from '../geometry';
import { getSvgAnchorPointIn } from './get-svg-anchor-point-in';
import type { SvgArc } from './svg-arc';

/**
 * Finds a point along an arc, in the coordinates of an element: where to put the label of a graduation or
 * the tip of a needle for a value, whatever groups each one is in.
 *
 * @param target - The element whose coordinates are wanted, such as the `<g>` of the labels.
 * @param arc - The center element, the radius, the start angle and the opening.
 * @param ratio - Position along the arc: 0 at the start, 1 at the end. Defaults to `0`.
 * @returns The point, in the local coordinates of `target`.
 * @throws {TypeError} When an element is not rendered, or `target` is flattened.
 * @example
 * const { x, y } = getSvgArcPoint(labels, { ...arc, radius: 28 }, index / 6); // label of the index-th tick
 */
export function getSvgArcPoint(target: SVGGraphicsElement, arc: SvgArc, ratio?: number | null): Point {
  const resolvedRatio = ratio ?? 0;
  const center = getSvgAnchorPointIn(arc.center, 'center', target);
  return polarToCartesian(center, arc.radius, arc.startAngle + arc.sweepAngle * resolvedRatio);
}
