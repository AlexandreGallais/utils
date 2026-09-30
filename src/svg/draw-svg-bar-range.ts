import { clamp } from '../math';
import { formatPoint, getBarEdges, lerpPoint } from './internal';
import type { SvgBar } from './svg-bar';

/**
 * Draws the part of a bar between two ratios across its whole thickness, in a `<path>` of any group: the fill
 * level of a bar graph (0 to the value), or a threshold zone. Ratios are clamped to [0, 1].
 *
 * @param path - The `<path>` to write.
 * @param bar - The element giving the area of the bar, and its direction.
 * @param fromRatio - One end, from 0 (start of the bar) to 1 (end).
 * @param toRatio - The other end.
 * @throws {TypeError} When an element is not rendered.
 * @example
 * const bar = { element: track, direction: 'up' } as const;
 * drawSvgBarRange(level, bar, 0, ratio(value, max)); // the fill level
 * drawSvgBarRange(redZone, bar, 0.8, 1); // the top 20 %
 */
export function drawSvgBarRange(path: SVGGraphicsElement, bar: SvgBar, fromRatio: number, toRatio: number): void {
  const [start0, start1, end0, end1] = getBarEdges(bar, path);
  const from = clamp(fromRatio);
  const to = clamp(toRatio);
  path.setAttribute(
    'd',
    `M ${formatPoint(lerpPoint(start0, end0, from))} L ${formatPoint(lerpPoint(start1, end1, from))} L ${formatPoint(lerpPoint(start1, end1, to))} L ${formatPoint(lerpPoint(start0, end0, to))} Z`,
  );
}
