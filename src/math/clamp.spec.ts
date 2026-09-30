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
});
