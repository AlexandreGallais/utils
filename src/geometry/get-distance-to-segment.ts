import type { Point } from './point.ts';

/**
 * Measures the shortest distance from a point to a segment, to hover or click a thin line (a trend curve, a
 * pipe of a synoptic) with a tolerance of a few pixels.
 *
 * @param point - The tested position.
 * @param start - First end of the segment.
 * @param end - Second end of the segment.
 * @returns The distance to the closest point of the segment (to an end when the perpendicular falls
 * outside the segment).
 * @example
 * getDistanceToSegment({ x: 5, y: 3 }, { x: 0, y: 0 }, { x: 10, y: 0 }); // 3
 * const isHovered = getDistanceToSegment(mouse, a, b) <= 4;
 */
export function getDistanceToSegment(point: Point, start: Point, end: Point): number {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const lengthSquared = dx * dx + dy * dy;
  // Position of the projection of the point on the segment, from 0 (start) to 1 (end).
  const t =
    lengthSquared === 0
      ? 0
      : Math.min(1, Math.max(0, ((point.x - start.x) * dx + (point.y - start.y) * dy) / lengthSquared));
  return Math.hypot(point.x - (start.x + t * dx), point.y - (start.y + t * dy));
}
