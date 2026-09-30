import { formatPoint, getBarEdges, lerpPoint } from './internal';
import type { SvgBar } from './svg-bar';

/**
 * Draws evenly spaced graduations along a bar in one `<path>` of any group: `count` intervals give `count + 1`
 * ticks, drawn across the bar from one of its sides.
 *
 * @param path - The `<path>` to write.
 * @param bar - The element giving the area of the bar, and its direction.
 * @param count - The number of intervals.
 * @param length - The length of each tick, across the bar, in the coordinates of the path.
 * @param side - The side the ticks start from: `'start'` is the left side of an `'up'` bar, the top side of a
 * `'right'` bar. Defaults to `'start'`.
 * @throws {TypeError} When an element is not rendered.
 * @example
 * drawSvgBarTicks(majorTicks, { element: track, direction: 'up' }, 5, 12);
 */
export function drawSvgBarTicks(
  path: SVGGraphicsElement,
  bar: SvgBar,
  count: number,
  length: number,
  side: 'end' | 'start' = 'start',
): void {
  const [start0, start1, end0, end1] = getBarEdges(bar, path);
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
  path.setAttribute('d', d);
}
