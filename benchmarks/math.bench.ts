import { formatDecimal, roundToFractionDigits, roundToStep } from 'utils';

const VALUES = Array.from({ length: 1000 }, (_, index) => index * 1.2345 - 500);
/* Results are written here so the engine cannot drop the benchmarked code as dead. */
let _sink: unknown;

describe('roundToFractionDigits', () => {
  it('compares with string-based rounding', async ({ bench: benchmark }) => {
    await benchmark.compare(
      benchmark('roundToFractionDigits (arithmetic)', () => {
        for (const value of VALUES) {
          _sink = roundToFractionDigits(value, 2);
        }
      }),
      benchmark('Number(formatDecimal()) (Intl)', () => {
        for (const value of VALUES) {
          _sink = Number(formatDecimal(value, 2));
        }
      }),
      benchmark('Number(toFixed()) (wrong: 1.005 → 1)', () => {
        for (const value of VALUES) {
          _sink = Number(value.toFixed(2));
        }
      }),
    );
  });
});

describe('roundToStep', () => {
  it('compares with the naive formula', async ({ bench: benchmark }) => {
    await benchmark.compare(
      benchmark('roundToStep (no float noise)', () => {
        for (const value of VALUES) {
          _sink = roundToStep(value, 0.1);
        }
      }),
      benchmark('Math.round(value / step) * step (float noise)', () => {
        for (const value of VALUES) {
          _sink = Math.round(value / 0.1) * 0.1;
        }
      }),
    );
  });
});
