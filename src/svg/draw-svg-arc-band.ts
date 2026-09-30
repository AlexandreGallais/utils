import { getSvgAnchorPointIn } from './get-svg-anchor-point-in';
import { createArcPath, formatCoordinate, formatPoint, polarToCartesian } from './internal';
import type { SvgArc } from './svg-arc';

const FULL_TURN = 360;
const HALF_TURN = 180;

/**
 * Draws a band along an arc in a `<path>`, around the center of an element in any group: a threshold zone of
 * a round gauge. Style it with `fill`; a full ring needs `fill-rule="evenodd"`.
 *
 * @param path - The `<path>` to write.
 * @param arc - The center element, the radius of the middle of the band, the start angle and the opening.
 * @param thickness - The width of the band, half inside and half outside `radius`.
 * @throws {TypeError} When an element is not rendered.
 * @example
 * drawSvgArcBand(redZone, { center: hub, radius: 40, startAngle: 81, sweepAngle: 54 }, 6);
 */
export function drawSvgArcBand(path: SVGGraphicsElement, arc: SvgArc, thickness: number): void {
  const center = getSvgAnchorPointIn(arc.center, 'center', path);
  const inner = arc.radius - thickness / 2;
  const outer = arc.radius + thickness / 2;
  const { startAngle, sweepAngle } = arc;
  const endAngle = startAngle + sweepAngle;
  if (Math.abs(sweepAngle) >= FULL_TURN) {
    path.setAttribute(
      'd',
      `${createArcPath(center, outer, 0, FULL_TURN)} Z ${createArcPath(center, inner, 0, FULL_TURN)} Z`,
    );
    return;
  }
  const r = formatCoordinate(inner);
  const largeArc = Math.abs(sweepAngle) > HALF_TURN ? 1 : 0;
  const backDirection = sweepAngle > 0 ? 0 : 1;
  path.setAttribute(
    'd',
    `${createArcPath(center, outer, startAngle, endAngle)} L ${formatPoint(polarToCartesian(center, inner, endAngle))} A ${r} ${r} 0 ${largeArc} ${backDirection} ${formatPoint(polarToCartesian(center, inner, startAngle))} Z`,
  );
}
