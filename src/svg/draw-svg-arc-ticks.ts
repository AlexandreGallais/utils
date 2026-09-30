import { getSvgAnchorPointIn } from './get-svg-anchor-point-in';
import { formatPoint, polarToCartesian } from './internal';
import type { SvgArc } from './svg-arc';

/**
 * Draws evenly spaced graduations along an arc in one `<path>`, around the center of an element in any group:
 * `count` intervals give `count + 1` ticks. Draw major and minor ticks in two paths.
 *
 * @param path - The `<path>` to write.
 * @param arc - The center element, the radius where the ticks start, the start angle and the opening.
 * @param count - The number of intervals.
 * @param length - The length of each tick, towards the center; negative to draw outwards.
 * @throws {TypeError} When an element is not rendered.
 * @example
 * const arc = { center: hub, radius: 40, startAngle: -135, sweepAngle: 270 };
 * drawSvgArcTicks(majorTicks, arc, 6, 8); // 7 long ticks
 * drawSvgArcTicks(minorTicks, arc, 30, 4); // 31 short ones
 */
export function drawSvgArcTicks(path: SVGGraphicsElement, arc: SvgArc, count: number, length: number): void {
  const center = getSvgAnchorPointIn(arc.center, 'center', path);
  let d = '';
  for (let index = 0; index <= count; index++) {
    const angle = arc.startAngle + (arc.sweepAngle * index) / count;
    const start = polarToCartesian(center, arc.radius, angle);
    const end = polarToCartesian(center, arc.radius - length, angle);
    d += `${index === 0 ? '' : ' '}M ${formatPoint(start)} L ${formatPoint(end)}`;
  }
  path.setAttribute('d', d);
}
