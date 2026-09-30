import type { Point } from '../geometry';
import { formatCoordinate } from './internal';

/**
 * Builds the `d` attribute of a staircase line through points, for discrete signals (a valve state, a
 * setpoint, a mode) that hold their value until the next sample instead of varying linearly.
 *
 * @param points - The vertices, sorted by ascending `x`. Defaults to `[]`.
 * @param position - Where the step happens between two points: `'after'` holds each value until the next
 * point (a sampled state), `'before'` jumps at once to the next value, `'middle'` switches halfway. Defaults to
 * `'after'`.
 * @returns The path data, with `H` and `V` commands; `''` without point.
 * @example
 * createStepPath([{ x: 0, y: 10 }, { x: 5, y: 0 }, { x: 10, y: 10 }], 'after'); // 'M 0 10 H 5 V 0 H 10 V 10'
 */
export function createStepPath(
  points?: Iterable<Point> | null,
  position?: 'after' | 'before' | 'middle' | null,
): string {
  const resolvedPoints = points ?? [];
  const resolvedPosition = position ?? 'after';
  const commands: string[] = [];
  let previous: Point | undefined;
  for (const point of resolvedPoints) {
    const x = formatCoordinate(point.x);
    const y = formatCoordinate(point.y);
    if (previous === undefined) {
      commands.push(`M ${x} ${y}`);
    } else if (resolvedPosition === 'after') {
      commands.push(`H ${x} V ${y}`);
    } else if (resolvedPosition === 'before') {
      commands.push(`V ${y} H ${x}`);
    } else {
      commands.push(`H ${formatCoordinate((previous.x + point.x) / 2)} V ${y} H ${x}`);
    }
    previous = point;
  }
  return commands.join(' ');
}
