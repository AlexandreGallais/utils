import type { Point } from '../geometry/point.ts';
import { formatCoordinate } from './internal/format-coordinate.ts';

/**
 * Builds the `d` attribute of a broken line through points: a trend line, a sparkline, an outline.
 *
 * @param points - The vertices, in drawing order.
 * @param isClosed - Whether to join the last point back to the first (a polygon).
 * @returns The path data; `''` without point.
 * @example
 * createPolylinePath([{ x: 0, y: 10 }, { x: 5, y: 0 }, { x: 10, y: 10 }], false); // 'M 0 10 L 5 0 L 10 10'
 * createPolylinePath(trianglePoints, true); // '… Z'
 */
export function createPolylinePath(points: Iterable<Point>, isClosed: boolean): string {
  const commands: string[] = [];
  for (const { x, y } of points) {
    commands.push(`${commands.length === 0 ? 'M' : 'L'} ${formatCoordinate(x)} ${formatCoordinate(y)}`);
  }
  if (isClosed && commands.length > 0) {
    commands.push('Z');
  }
  return commands.join(' ');
}
