import type { Point } from './point';
import type { Rect } from './rect';

/** The origin: the point when none is given. */
const ORIGIN = { x: 0, y: 0 };

/**
 * Cuts a segment to the part inside a rectangle (Liang–Barsky algorithm), to draw a line that leaves a
 * plot area without spilling over the axes.
 *
 * @param start - First end of the segment. Defaults to the origin `{ x: 0, y: 0 }`.
 * @param end - Second end of the segment. Defaults to the origin `{ x: 0, y: 0 }`.
 * @param rect - The clipping rectangle, edges included.
 * @returns The visible part, from `start` towards `end`, or `undefined` when the segment misses the
 * rectangle. An end inside the rectangle is returned as is (same object), so a caller can tell a cut end
 * from an original one.
 * @example
 * clipSegment({ x: -10, y: 5 }, { x: 5, y: 5 }, { x: 0, y: 0, width: 10, height: 10 }); // [{ x: 0, y: 5 }, { x: 5, y:
 * 5 }]
 */
export function clipSegment(
  start: Point | null | undefined,
  end: Point | null | undefined,
  rect: Rect,
): readonly [start: Point, end: Point] | undefined {
  const resolvedStart = start ?? ORIGIN;
  const resolvedEnd = end ?? ORIGIN;
  const dx = resolvedEnd.x - resolvedStart.x;
  const dy = resolvedEnd.y - resolvedStart.y;
  // Each edge as [direction of the segment towards the outside, distance from start to the edge].
  const edges = [
    [-dx, resolvedStart.x - rect.x],
    [dx, rect.x + rect.width - resolvedStart.x],
    [-dy, resolvedStart.y - rect.y],
    [dy, rect.y + rect.height - resolvedStart.y],
  ] as const;
  let enter = 0;
  let exit = 1;
  for (const [direction, distance] of edges) {
    if (direction === 0) {
      if (distance < 0) {
        return undefined;
      }
    } else if (direction < 0) {
      enter = Math.max(enter, distance / direction);
    } else {
      exit = Math.min(exit, distance / direction);
    }
  }
  if (enter > exit) {
    return undefined;
  }
  return [pointAt(resolvedStart, dx, dy, enter), exit === 1 ? resolvedEnd : pointAt(resolvedStart, dx, dy, exit)];
}

/**
 * Computes a point along the segment.
 *
 * @param start - Origin of the segment.
 * @param dx - Horizontal extent of the segment.
 * @param dy - Vertical extent of the segment.
 * @param t - Position along the segment, from 0 (`start`) to 1 (its end).
 * @returns `start` itself at 0, a new point otherwise.
 */
function pointAt(start: Point, dx: number, dy: number, t: number): Point {
  return t === 0 ? start : { x: start.x + dx * t, y: start.y + dy * t };
}
