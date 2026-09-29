import { polarToCartesian } from '../geometry/polar-to-cartesian.ts';
import { createTicksPath } from './create-ticks-path.ts';
import { getSvgAnchorPointIn } from './get-svg-anchor-point-in.ts';
import type { SvgArc } from './svg-arc.ts';

/**
 * Draws evenly spaced graduations along an arc in one `<path>`, around the center of an element, whatever
 * groups each one is in: `count` intervals give `count + 1` ticks, from the start to the end of the arc.
 * Draw the major and the minor ticks in two paths, with their own length and `stroke-width`.
 *
 * @param path - The `<path>` whose `d` attribute is written.
 * @param arc - The center element, the radius where the ticks start, the start angle and the opening.
 * @param count - Number of intervals between ticks, a positive integer (10 intervals give 11 ticks).
 * @param length - Length of each tick, towards the center; negative to draw outwards.
 * @throws {RangeError} When `count` is not a positive integer.
 * @throws {TypeError} When an element is not rendered, or the path is flattened.
 * @example
 * const arc = { center: hub, radius: 40, startAngle: -135, sweepAngle: 270 };
 * drawSvgArcTicks(majorTicks, arc, 6, 8); // 7 long ticks
 * drawSvgArcTicks(minorTicks, arc, 30, 4); // 31 short ones (thin stroke in CSS)
 */
export function drawSvgArcTicks(path: SVGGraphicsElement, arc: SvgArc, count: number, length: number): void {
  if (!Number.isSafeInteger(count) || count < 1) {
    throw new RangeError(`count must be a positive integer, got ${count}`);
  }
  const center = getSvgAnchorPointIn(arc.center, 'center', path);
  const ticks = Array.from({ length: count + 1 }, (_, index) => {
    const angle = arc.startAngle + (arc.sweepAngle * index) / count;
    return {
      start: polarToCartesian(center, arc.radius, angle),
      end: polarToCartesian(center, arc.radius - length, angle),
    };
  });
  path.setAttribute('d', createTicksPath(ticks));
}
