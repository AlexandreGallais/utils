import { ratio } from './ratio.ts';

describe(ratio, () => {
  it.for([
    [5, 10, 0.5],
    [15, 10, 1.5],
    [5, 0, 0],
    [0, 0, 0],
    [-5, 10, -0.5],
  ] as const)('computes %s / %s as %s', ([value, total, expected]) => {
    expect(ratio(value, total)).toBe(expected);
  });
});
