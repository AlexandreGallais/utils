import { formatDecimal, formatNumber } from 'utils';

const VALUES = Array.from({ length: 1000 }, (_, index) => index * 1.2345 - 500);
/* Results are written here so the engine cannot drop the benchmarked code as dead. */
let _sink: unknown;

describe('formatDecimal', () => {
  it('compares with a formatter created per call', async ({ bench: benchmark }) => {
    await benchmark.compare(
      benchmark('formatDecimal (cached Intl.NumberFormat)', () => {
        for (const value of VALUES) {
          _sink = formatDecimal(value, 2);
        }
      }),
      benchmark('new Intl.NumberFormat per call', () => {
        for (const value of VALUES) {
          const formatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2, useGrouping: false });
          _sink = formatter.format(value);
        }
      }),
      benchmark('toLocaleString per call', () => {
        for (const value of VALUES) {
          _sink = value.toLocaleString('en-US', { maximumFractionDigits: 2, useGrouping: false });
        }
      }),
    );
  });
});

describe('formatNumber', () => {
  it('compares with a formatter created per call', async ({ bench: benchmark }) => {
    await benchmark.compare(
      benchmark('formatNumber (cached per locale and digitsInfo)', () => {
        for (const value of VALUES) {
          _sink = formatNumber(value, '1.0-2', 'en-US');
        }
      }),
      benchmark('new Intl.NumberFormat per call', () => {
        for (const value of VALUES) {
          const formatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });
          _sink = formatter.format(value);
        }
      }),
    );
  });
});
