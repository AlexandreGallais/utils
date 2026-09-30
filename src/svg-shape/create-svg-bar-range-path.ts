import { clamp } from '../math';
import { formatPoint, getBarEdges, lerpPoint } from './internal';
import type { SvgBar } from './svg-bar';

/**
 * Creates the `d` of the part of a bar between two ratios, across its whole thickness, in any group: the fill
 * level of a bar graph (0 to the value) or a threshold zone. The ratios are clamped to [0, 1].
 *
 * @param target - The element in whose coordinates the path is written, such as the `<path>` that receives it.
 * @param bar - The element giving the area of the bar, and its direction.
 * @param fromRatio - One end, from 0 (start of the bar) to 1 (end).
 * @param toRatio - The other end.
 * @returns The closed path data.
 * @throws {TypeError} When an element is not rendered.
 * @example
 * const bar = { element: track, direction: 'up' } as const;
 * level.setAttribute('d', createSvgBarRangePath(level, bar, 0, ratio(value, max))); // the fill level
 * redZone.setAttribute('d', createSvgBarRangePath(redZone, bar, 0.8, 1)); // the top 20 %
 */
export function createSvgBarRangePath(
  target: SVGGraphicsElement,
  bar: SvgBar,
  fromRatio: number,
  toRatio: number,
): string {
  const [start0, start1, end0, end1] = getBarEdges(bar, target);
  const from = clamp(fromRatio);
  const to = clamp(toRatio);
  return `M ${formatPoint(lerpPoint(start0, end0, from))} L ${formatPoint(lerpPoint(start1, end1, from))} L ${formatPoint(lerpPoint(start1, end1, to))} L ${formatPoint(lerpPoint(start0, end0, to))} Z`;
}
