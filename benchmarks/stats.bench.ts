import { maxOf, mean, MovingAverage } from 'utils';

const SAMPLES = Float64Array.from({ length: 10_000 }, (_, index) => Math.sin(index));
const SAMPLE_ARRAY = [...SAMPLES];
/* Results are written here so the engine cannot drop the benchmarked code as dead. */
let _sink: unknown;

describe('maxOf', () => {
  it('compares with Math.max(...values) on 10 000 values', async ({ bench: benchmark }) => {
    await benchmark.compare(
      benchmark('maxOf (loop)', () => {
        _sink = maxOf(SAMPLE_ARRAY);
      }),
      benchmark('Math.max(...values)', () => {
        _sink = Math.max(...SAMPLE_ARRAY);
      }),
    );
  });
});

describe('MovingAverage', () => {
  it('compares with slice + mean, window of 100, 1 000 updates', async ({ bench: benchmark }) => {
    await benchmark.compare(
      benchmark('MovingAverage (running sum)', () => {
        const average = new MovingAverage(100);
        for (let index = 0; index < 1000; index++) {
          _sink = average.push(SAMPLE_ARRAY[index] ?? 0);
        }
      }),
      benchmark('slice + mean per update', () => {
        const history: number[] = [];
        for (let index = 0; index < 1000; index++) {
          history.push(SAMPLE_ARRAY[index] ?? 0);
          _sink = mean(history.slice(-100));
        }
      }),
    );
  });
});
