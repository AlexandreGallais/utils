import type { Point } from '../geometry';
import { formatCoordinate } from './internal';

/** Catmull-Rom to cubic Bézier: control points sit a sixth of the neighbour span away. */
const CATMULL_ROM_DIVISOR = 6;
/** A segment is computed from its two ends and their outer neighbours. */
const SEGMENT_POINTS = 4;

/**
 * Builds the `d` attribute of a smooth curve passing through every point (a Catmull-Rom spline drawn as
 * cubic Bézier curves): a trend curve that reads better than a broken line.
 *
 * @param points - The points to pass through, in drawing order. Defaults to `[]`.
 * @param tension - Curvature: `0` gives straight lines, `1` a standard Catmull-Rom curve. Defaults to `1`.
 * @returns The path data; a single point gives a move only, no point gives `''`.
 * @example
 * trend.setAttribute('d', createSmoothPath(history.toArray().map((value, index) => ({ x: index * 4, y: 100 - value })),
 * 1));
 */
export function createSmoothPath(points?: readonly Point[] | null, tension?: number | null): string {
  const resolvedPoints = points ?? [];
  const resolvedTension = tension ?? 1;
  const [first] = resolvedPoints;
  if (!first) {
    return '';
  }
  // The ends are repeated so the first and last segments have neighbours.
  const extended = [first, ...resolvedPoints, ...resolvedPoints.slice(-1)];
  const commands = [`M ${formatCoordinate(first.x)} ${formatCoordinate(first.y)}`];
  for (let index = 1; index < resolvedPoints.length; index++) {
    const [previous = first, start = first, end = first, next = first] = extended.slice(
      index - 1,
      index - 1 + SEGMENT_POINTS,
    );
    const factor = resolvedTension / CATMULL_ROM_DIVISOR;
    const control1 = { x: start.x + (end.x - previous.x) * factor, y: start.y + (end.y - previous.y) * factor };
    const control2 = { x: end.x - (next.x - start.x) * factor, y: end.y - (next.y - start.y) * factor };
    commands.push(
      [
        'C',
        formatCoordinate(control1.x),
        formatCoordinate(control1.y),
        formatCoordinate(control2.x),
        formatCoordinate(control2.y),
        formatCoordinate(end.x),
        formatCoordinate(end.y),
      ].join(' '),
    );
  }
  return commands.join(' ');
}
