import { getSvgAnchorPointIn } from '../svg-transform';
import { formatPoint, polarToCartesian } from './internal';
import type { SvgArc } from './svg-arc';

/**
 * Creates the `d` of evenly spaced graduations along an arc, around the center of an element in any group:
 * `count` intervals give `count + 1` ticks. Make one path for the major ticks, one for the minor ones.
 *
 * @param target - The element in whose coordinates the path is written, such as the `<path>` that receives it.
 * @param arc - The center element, the radius where the ticks start, the start angle and the opening.
 * @param count - The number of intervals.
 * @param length - The length of each tick, towards the center; negative to go outwards.
 * @returns The path data, one `M … L …` per tick.
 * @throws {TypeError} When an element is not rendered.
 * @example
 * const arc = { center: hub, radius: 40, startAngle: -135, sweepAngle: 270 };
 * majorTicks.setAttribute('d', createSvgArcTicksPath(majorTicks, arc, 6, 8)); // 7 long ticks
 * minorTicks.setAttribute('d', createSvgArcTicksPath(minorTicks, arc, 30, 4)); // 31 short ones
 */
export function createSvgArcTicksPath(target: SVGGraphicsElement, arc: SvgArc, count: number, length: number): string {
  const center = getSvgAnchorPointIn(arc.center, 'center', target);
  let d = '';
  for (let index = 0; index <= count; index++) {
    const angle = arc.startAngle + (arc.sweepAngle * index) / count;
    const start = polarToCartesian(center, arc.radius, angle);
    const end = polarToCartesian(center, arc.radius - length, angle);
    d += `${index === 0 ? '' : ' '}M ${formatPoint(start)} L ${formatPoint(end)}`;
  }
  return d;
}
