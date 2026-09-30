import type { Point } from '../geometry';
import { formatCoordinate } from './internal';

/**
 * Builds the `d` attribute of a broken line through points: a trend line, a sparkline, an outline.
 *
 * @param points - The vertices, in drawing order. Defaults to `[]`.
 * @param isClosed - Whether to join the last point back to the first (a polygon). Defaults to `false`.
 * @returns The path data; `''` without point.
 * @example
 * createPolylinePath([{ x: 0, y: 10 }, { x: 5, y: 0 }, { x: 10, y: 10 }], false); // 'M 0 10 L 5 0 L 10 10'
 * createPolylinePath(trianglePoints, true); // '… Z'
 */
export function createPolylinePath(points?: Iterable<Point> | null, isClosed?: boolean | null): string {
  const resolvedPoints = points ?? [];
  const resolvedIsClosed = isClosed ?? false;
  const commands: string[] = [];
  for (const { x, y } of resolvedPoints) {
    commands.push(`${commands.length === 0 ? 'M' : 'L'} ${formatCoordinate(x)} ${formatCoordinate(y)}`);
  }
  if (resolvedIsClosed && commands.length > 0) {
    commands.push('Z');
  }
  return commands.join(' ');
}
