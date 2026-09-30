import { getSvgAnchorPointIn } from '../svg-transform';
import { createArcPath, formatCoordinate, formatPoint, polarToCartesian } from './internal';
import type { SvgArc } from './svg-arc';

const FULL_TURN = 360;
const HALF_TURN = 180;

/**
 * Creates the `d` of a band along an arc, around the center of an element in any group: a threshold zone of
 * a round gauge, to fill. A full ring needs `fill-rule="evenodd"`.
 *
 * @param target - The element in whose coordinates the path is written, such as the `<path>` that receives it.
 * @param arc - The center element, the radius of the middle of the band, the start angle and the opening.
 * @param thickness - The width of the band, half inside and half outside `radius`.
 * @returns The closed path data.
 * @throws {TypeError} When an element is not rendered.
 * @example
 * redZone.setAttribute('d', createSvgArcBandPath(redZone, { center: hub, radius: 40, startAngle: 81, sweepAngle: 54 }, 6));
 */
export function createSvgArcBandPath(target: SVGGraphicsElement, arc: SvgArc, thickness: number): string {
  const center = getSvgAnchorPointIn(arc.center, 'center', target);
  const inner = arc.radius - thickness / 2;
  const outer = arc.radius + thickness / 2;
  const { startAngle, sweepAngle } = arc;
  const endAngle = startAngle + sweepAngle;
  if (Math.abs(sweepAngle) >= FULL_TURN) {
    return `${createArcPath(center, outer, 0, FULL_TURN)} Z ${createArcPath(center, inner, 0, FULL_TURN)} Z`;
  }
  const r = formatCoordinate(inner);
  const largeArc = Math.abs(sweepAngle) > HALF_TURN ? 1 : 0;
  const backDirection = sweepAngle > 0 ? 0 : 1;
  const innerEnd = formatPoint(polarToCartesian(center, inner, endAngle));
  const innerStart = formatPoint(polarToCartesian(center, inner, startAngle));
  return `${createArcPath(center, outer, startAngle, endAngle)} L ${innerEnd} A ${r} ${r} 0 ${largeArc} ${backDirection} ${innerStart} Z`;
}
