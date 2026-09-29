import { clampedRatio } from './clamped-ratio.ts';

describe(clampedRatio, () => {
  it.for([
    [5, 10, 0.5],
    [15, 10, 1],
    [-5, 10, 0],
    [5, 0, 0],
  ] as const)('computes %s / %s clamped as %s', ([value, total, expected]) => {
    expect(clampedRatio(value, total)).toBe(expected);
  });
});
