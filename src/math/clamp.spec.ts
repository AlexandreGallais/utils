import { clamp } from './clamp';

describe(clamp, () => {
  it.for([
    [5, 0, 10, 5],
    [-5, 0, 10, 0],
    [15, 0, 10, 10],
    [5, 10, 0, 5],
    [15, 10, 0, 10],
    [-5, 10, 0, 0],
  ] as const)('clamps %s into [%s, %s] as %s', ([value, min, max, expected]) => {
    expect(clamp(value, min, max)).toBe(expected);
  });

  it('takes the defaults for null or undefined', () => {
    expect(clamp(1.5)).toStrictEqual(clamp(1.5, 0, 1));
    expect(clamp(1.5, null, null)).toStrictEqual(clamp(1.5, 0, 1));
  });
});
