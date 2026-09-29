import { createFpsMeter } from 'utils';

/* Five seconds of frames at 60 Hz. */
const TIMESTAMPS = Array.from({ length: 300 }, (_, index) => index * 16.7);
const WINDOW_SIZE = 60;
/* Results are written here so the engine cannot drop the benchmarked code as dead. */
let _sink: unknown;

function naiveFps(timestamps: number[], timestamp: number): number {
  timestamps.push(timestamp);
  if (timestamps.length > WINDOW_SIZE + 1) {
    // eslint-disable-next-line unicorn/no-array-front-mutation -- the naive baseline this benchmark measures.
    timestamps.shift();
  }
  const [first = timestamp] = timestamps;
  return timestamp > first ? ((timestamps.length - 1) * 1000) / (timestamp - first) : 0;
}

describe('createFpsMeter', () => {
  it('compares with an array and shift', async ({ bench: benchmark }) => {
    await benchmark.compare(
      benchmark('createFpsMeter (ring buffer)', () => {
        const meter = createFpsMeter(WINDOW_SIZE);
        for (const timestamp of TIMESTAMPS) {
          _sink = meter.tick(timestamp);
        }
      }),
      benchmark('array push and shift', () => {
        const timestamps: number[] = [];
        for (const timestamp of TIMESTAMPS) {
          _sink = naiveFps(timestamps, timestamp);
        }
      }),
    );
  });
});
