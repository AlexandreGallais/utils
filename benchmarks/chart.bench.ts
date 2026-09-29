import { downsampleMinMax, projectPoints, sliceVisiblePoints } from 'utils';
import type { Point } from 'utils';

/* One hour of a 10 Hz signal, zoomed on the last minute of an 800 × 200 px plot. */
const SERIES: Point[] = Array.from({ length: 36_000 }, (_, index) => ({
  x: index * 100,
  y: Math.sin(index / 50) * 20,
}));
const MIN_X = 3_540_000;
const MAX_X = 3_600_000;
const BOUNDS = { minX: 0, maxX: 3_600_000, minY: -20, maxY: 20 };
const PLOT = { x: 0, y: 0, width: 800, height: 200 };
/* Results are written here so the engine cannot drop the benchmarked code as dead. */
let _sink: unknown;

describe('sliceVisiblePoints', () => {
  it('compares with Array.filter', async ({ bench: benchmark }) => {
    await benchmark.compare(
      benchmark('sliceVisiblePoints (binary search)', () => {
        _sink = sliceVisiblePoints(SERIES, MIN_X, MAX_X, false);
      }),
      benchmark('filter', () => {
        _sink = SERIES.filter(({ x }) => x >= MIN_X && x <= MAX_X);
      }),
    );
  });
});

describe('downsampleMinMax', () => {
  it('compares projecting the downsampled series with projecting every point', async ({ bench: benchmark }) => {
    await benchmark.compare(
      benchmark('downsampleMinMax then projectPoints', () => {
        _sink = projectPoints(downsampleMinMax(SERIES, PLOT.width), BOUNDS, PLOT);
      }),
      benchmark('projectPoints of every point', () => {
        _sink = projectPoints(SERIES, BOUNDS, PLOT);
      }),
    );
  });
});
