import type { Point } from './point';

/** The origin: the point when none is given. */
const ORIGIN = { x: 0, y: 0 };

/**
 * Measures the shortest distance from a point to a segment, to hover or click a thin line (a trend curve, a
 * pipe of a synoptic) with a tolerance of a few pixels.
 *
 * @param point - The tested position. Defaults to the origin `{ x: 0, y: 0 }`.
 * @param start - First end of the segment. Defaults to the origin `{ x: 0, y: 0 }`.
 * @param end - Second end of the segment. Defaults to the origin `{ x: 0, y: 0 }`.
 * @returns The distance to the closest point of the segment (to an end when the perpendicular falls
 * outside the segment).
 * @example
 * getDistanceToSegment({ x: 5, y: 3 }, { x: 0, y: 0 }, { x: 10, y: 0 }); // 3
 * const isHovered = getDistanceToSegment(mouse, a, b) <= 4;
 */
export function getDistanceToSegment(point?: Point | null, start?: Point | null, end?: Point | null): number {
  const resolvedPoint = point ?? ORIGIN;
  const resolvedStart = start ?? ORIGIN;
  const resolvedEnd = end ?? ORIGIN;
  const dx = resolvedEnd.x - resolvedStart.x;
  const dy = resolvedEnd.y - resolvedStart.y;
  const lengthSquared = dx * dx + dy * dy;
  // Position of the projection of the point on the segment, from 0 (start) to 1 (end).
  const t =
    lengthSquared === 0
      ? 0
      : Math.min(
          1,
          Math.max(
            0,
            ((resolvedPoint.x - resolvedStart.x) * dx + (resolvedPoint.y - resolvedStart.y) * dy) / lengthSquared,
          ),
        );
  return Math.hypot(resolvedPoint.x - (resolvedStart.x + t * dx), resolvedPoint.y - (resolvedStart.y + t * dy));
}
