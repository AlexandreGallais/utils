import { isBlinkOn } from './is-blink-on.ts';

describe(isBlinkOn, () => {
  it.for([
    [0, true],
    [499, true],
    [500, false],
    [999, false],
    [1000, true],
    [12_345_250, true],
    [-250, false],
  ] as const)('is on at %s ms: %s', ([timeMs, expected]) => {
    expect(isBlinkOn(timeMs, 1000)).toBe(expected);
  });

  it('applies the duty cycle', () => {
    expect(isBlinkOn(200, 1000, 0.25)).toBe(true);
    expect(isBlinkOn(300, 1000, 0.25)).toBe(false);
    expect(isBlinkOn(999, 1000, 1)).toBe(true);
    expect(isBlinkOn(0, 1000, 0)).toBe(false);
  });

  it('gives the same state to every element at the same time', () => {
    const states = [0, 1, 2].map(() => isBlinkOn(1_234_567, 800));
    expect(states).toStrictEqual([states[0], states[0], states[0]]);
  });

  it.for([0, -1, NaN, Infinity])('throws a RangeError for period %s', (periodMs) => {
    expect(() => isBlinkOn(0, periodMs)).toThrow(RangeError);
  });
});
