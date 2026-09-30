import { inverseLerp } from './inverse-lerp';

describe(inverseLerp, () => {
  it.for([
    [0, 10, 5, 0.5],
    [10, 0, 5, 0.5],
    [0, 10, 20, 2],
    [5, 5, 5, 0],
    [5, 5, 100, 0],
  ] as const)('places %s → %s at %s as %s', ([start, end, value, expected]) => {
    expect(inverseLerp(start, end, value)).toBe(expected);
  });
});
