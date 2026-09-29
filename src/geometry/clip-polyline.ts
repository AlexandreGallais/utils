import { clipSegment } from './clip-segment.ts';
import type { Point } from './point.ts';
import type { Rect } from './rect.ts';

/**
 * Cuts a broken line to the parts inside a rectangle, such as a chart series zoomed in: each part is a
 * continuous run to draw as its own polyline (a line leaving and coming back into view gives two runs).
 *
 * @param points - The vertices of the line, in drawing order.
 * @param rect - The clipping rectangle, edges included.
 * @returns The visible runs, each with at least two points; empty below two points.
 * @example
 * clipPolyline([{ x: 5, y: 5 }, { x: 15, y: 5 }, { x: 5, y: 8 }], { x: 0, y: 0, width: 10, height: 10 });
 * // [[{ x: 5, y: 5 }, { x: 10, y: 5 }], [{ x: 10, y: 6.5 }, { x: 5, y: 8 }]]
 */
export function clipPolyline(points: readonly Point[], rect: Rect): Point[][] {
  const runs: Point[][] = [];
  let run: Point[] | undefined;
  let start: Point | undefined;
  for (const end of points) {
    const clipped = start && clipSegment(start, end, rect);
    if (clipped === undefined) {
      run = undefined;
    } else {
      // `clipSegment` returns an end inside as the same object: another object means the line was cut there.
      if (run === undefined || clipped[0] !== start) {
        run = [clipped[0]];
        runs.push(run);
      }
      run.push(clipped[1]);
      if (clipped[1] !== end) {
        run = undefined;
      }
    }
    start = end;
  }
  return runs;
}
