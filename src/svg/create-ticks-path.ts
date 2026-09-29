import type { Point } from '../geometry/point.ts';
import { formatCoordinate } from './internal/format-coordinate.ts';

/** A tick line: from `start` to `end`. */
interface TickLine {
  /** First end of the line. */
  readonly start: Point;
  /** Second end of the line. */
  readonly end: Point;
}

/**
 * Joins tick lines into the `d` attribute of a single path: one DOM element for the whole scale is much
 * cheaper to create, style and update than one `<line>` per tick. Stroke it (it has no area to fill).
 *
 * @param ticks - Lines from `createArcTicks` or `createBarTicks`, or any `{ start, end }` pairs.
 * @returns One `M … L …` segment per tick; `''` without tick.
 * @example
 * majorScale.setAttribute('d', createTicksPath(ticks.filter((tick) => tick.isMajor)));
 */
export function createTicksPath(ticks: Iterable<TickLine>): string {
  const segments: string[] = [];
  for (const { start, end } of ticks) {
    segments.push(
      `M ${formatCoordinate(start.x)} ${formatCoordinate(start.y)} L ${formatCoordinate(end.x)} ${formatCoordinate(end.y)}`,
    );
  }
  return segments.join(' ');
}
