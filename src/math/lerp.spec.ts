import { lerp } from './lerp.ts';

describe(lerp, () => {
  it.for([
    [0, 10, 0, 0],
    [0, 10, 1, 10],
    [0, 10, 0.5, 5],
    [0, 10, 2, 20],
    [10, 0, 0.25, 7.5],
  ] as const)('interpolates %s → %s at %s as %s', ([start, end, t, expected]) => {
    expect(lerp(start, end, t)).toBe(expected);
  });

  it('is exact at t = 1', () => {
    expect(lerp(0.1, 0.7, 1)).toBe(0.7);
  });
});
