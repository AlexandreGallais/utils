import type { Point } from '../geometry/point.ts';
import { formatCoordinate } from './internal/format-coordinate.ts';

/**
 * Builds the `d` attribute of a staircase line through points, for discrete signals (a valve state, a
 * setpoint, a mode) that hold their value until the next sample instead of varying linearly.
 *
 * @param points - The vertices, sorted by ascending `x`.
 * @param position - Where the step happens between two points: `'after'` holds each value until the next
 * point (a sampled state), `'before'` jumps at once to the next value, `'middle'` switches halfway.
 * @returns The path data, with `H` and `V` commands; `''` without point.
 * @example
 * createStepPath([{ x: 0, y: 10 }, { x: 5, y: 0 }, { x: 10, y: 10 }], 'after'); // 'M 0 10 H 5 V 0 H 10 V 10'
 */
export function createStepPath(points: Iterable<Point>, position: 'after' | 'before' | 'middle'): string {
  const commands: string[] = [];
  let previous: Point | undefined;
  for (const point of points) {
    const x = formatCoordinate(point.x);
    const y = formatCoordinate(point.y);
    if (previous === undefined) {
      commands.push(`M ${x} ${y}`);
    } else if (position === 'after') {
      commands.push(`H ${x} V ${y}`);
    } else if (position === 'before') {
      commands.push(`V ${y} H ${x}`);
    } else {
      commands.push(`H ${formatCoordinate((previous.x + point.x) / 2)} V ${y} H ${x}`);
    }
    previous = point;
  }
  return commands.join(' ');
}
