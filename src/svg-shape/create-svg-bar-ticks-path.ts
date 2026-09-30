import { formatPoint, getBarEdges, lerpPoint } from './internal';
import type { SvgBar } from './svg-bar';

/**
 * Creates the `d` of evenly spaced graduations along a bar, in any group: `count` intervals give `count + 1`
 * ticks, across the bar from one of its sides.
 *
 * @param target - The element in whose coordinates the path is written, such as the `<path>` that receives it.
 * @param bar - The element giving the area of the bar, and its direction.
 * @param count - The number of intervals.
 * @param length - The length of each tick, across the bar, in the coordinates of `target`.
 * @param side - The side the ticks start from: `'start'` is the left side of an `'up'` bar, the top side of a
 * `'right'` bar. Defaults to `'start'`.
 * @returns The path data, one `M … L …` per tick.
 * @throws {TypeError} When an element is not rendered.
 * @example
 * majorTicks.setAttribute('d', createSvgBarTicksPath(majorTicks, { element: track, direction: 'up' }, 5, 12));
 */
export function createSvgBarTicksPath(
  target: SVGGraphicsElement,
  bar: SvgBar,
  count: number,
  length: number,
  side: 'end' | 'start' = 'start',
): string {
  const [start0, start1, end0, end1] = getBarEdges(bar, target);
  let d = '';
  for (let index = 0; index <= count; index++) {
    const t = index / count;
    const first = lerpPoint(start0, end0, t);
    const second = lerpPoint(start1, end1, t);
    const from = side === 'start' ? first : second;
    const across = side === 'start' ? second : first;
    const ratio = length / Math.hypot(across.x - from.x, across.y - from.y);
    d += `${index === 0 ? '' : ' '}M ${formatPoint(from)} L ${formatPoint(lerpPoint(from, across, ratio))}`;
  }
  return d;
}
