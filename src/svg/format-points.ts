import type { Point } from '../geometry';
import { formatCoordinate } from './internal';

/**
 * Formats points as the `points` attribute of an SVG `<polygon>` or `<polyline>`.
 *
 * @param points - The vertices, in drawing order. Defaults to `[]`.
 * @returns `'x1,y1 x2,y2 …'`, coordinates rounded to 3 decimals; `''` without point.
 * @example
 * polygon.setAttribute('points', formatPoints([{ x: 0, y: 10 }, { x: 5, y: 0 }, { x: 10, y: 10 }]));
 * // '0,10 5,0 10,10'
 */
export function formatPoints(points?: Iterable<Point> | null): string {
  const resolvedPoints = points ?? [];
  const pairs: string[] = [];
  for (const { x, y } of resolvedPoints) {
    pairs.push(`${formatCoordinate(x)},${formatCoordinate(y)}`);
  }
  return pairs.join(' ');
}
