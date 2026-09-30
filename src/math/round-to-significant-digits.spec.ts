import { roundToSignificantDigits } from './round-to-significant-digits';

describe(roundToSignificantDigits, () => {
  it.for([
    [123_456, 3, 123_000],
    [0.0012345, 3, 0.00123],
    [-9.876, 2, -9.9],
    [0.1 + 0.2, 15, 0.3],
    [0, 3, 0],
    [Infinity, 3, Infinity],
  ] as const)('rounds %s to %s digits: %s', ([value, digits, expected]) => {
    expect(roundToSignificantDigits(value, digits)).toBe(expected);
  });

  it('keeps NaN', () => {
    expect(roundToSignificantDigits(NaN, 2)).toBeNaN();
  });

  it('takes the defaults', () => {
    expect(roundToSignificantDigits(123_456)).toStrictEqual(roundToSignificantDigits(123_456, 3));
  });
});
