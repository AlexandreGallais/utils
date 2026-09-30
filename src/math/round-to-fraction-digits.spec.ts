import { formatDecimal } from '../format';
import { roundToFractionDigits } from './round-to-fraction-digits';

describe(roundToFractionDigits, () => {
  it.for([
    [1.005, 2, 1.01],
    [1.004, 2, 1],
    [-1.005, 2, -1.01],
    [2.5, 0, 3],
    [-2.5, 0, -3],
    [0.285, 2, 0.29],
    [1.45, 1, 1.5],
    [123.456, 1, 123.5],
    [1e21, 2, 1e21],
    [0.0000001, 8, 0.0000001],
  ] as const)('rounds %s to %s digits as %s', ([value, digits, expected]) => {
    expect(roundToFractionDigits(value, digits)).toBe(expected);
  });

  it('never returns -0', () => {
    expect(Object.is(roundToFractionDigits(-0.001, 2), 0)).toBe(true);
    expect(Object.is(roundToFractionDigits(-0, 2), 0)).toBe(true);
  });

  it('returns non-finite values unchanged', () => {
    expect(roundToFractionDigits(NaN, 2)).toBeNaN();
    expect(roundToFractionDigits(Infinity, 2)).toBe(Infinity);
  });

  it('throws a RangeError for invalid maxFractionDigits', () => {
    expect(() => roundToFractionDigits(1, -1)).toThrow(RangeError);
  });

  it('matches formatDecimal on decimal inputs', () => {
    const mismatches: string[] = [];
    for (let digits = 0; digits <= 4; digits++) {
      for (let thousandths = -20_000; thousandths <= 20_000; thousandths += 7) {
        const value = thousandths / 1000;
        const expected = Number(formatDecimal(value, digits));
        if (roundToFractionDigits(value, digits) !== expected) {
          mismatches.push(`${value} (${digits} digits)`);
        }
      }
    }
    expect(mismatches).toStrictEqual([]);
  });
});
