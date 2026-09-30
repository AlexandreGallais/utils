import type { Point } from '../geometry';
import { formatCoordinate } from './internal';

/**
 * Builds the `d` attribute of the area between a line and a horizontal baseline, closed: the filled zone
 * under a trend curve, a tank level profile, a confidence band against an axis.
 *
 * @param points - The vertices of the top line, sorted by ascending `x`. Defaults to `[]`.
 * @param baselineY - The vertical coordinate of the bottom edge, such as the bottom of the plot area or the
 * projected zero. Defaults to `0`.
 * @returns The closed path data; `''` without point.
 * @example
 * createAreaPath([{ x: 0, y: 5 }, { x: 10, y: 2 }], 20); // 'M 0 20 L 0 5 L 10 2 L 10 20 Z'
 */
export function createAreaPath(points?: Iterable<Point> | null, baselineY?: number | null): string {
  const resolvedPoints = points ?? [];
  const resolvedBaselineY = baselineY ?? 0;
  const baseline = formatCoordinate(resolvedBaselineY);
  const commands: string[] = [];
  let lastX = '';
  for (const point of resolvedPoints) {
    lastX = formatCoordinate(point.x);
    if (commands.length === 0) {
      commands.push(`M ${lastX} ${baseline}`);
    }
    commands.push(`L ${lastX} ${formatCoordinate(point.y)}`);
  }
  if (commands.length > 0) {
    commands.push(`L ${lastX} ${baseline} Z`);
  }
  return commands.join(' ');
}
