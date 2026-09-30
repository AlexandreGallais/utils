import { getStrokeDashOffset } from './get-stroke-dash-offset';

describe(getStrokeDashOffset, () => {
  it.for([
    [0, 100],
    [0.25, 75],
    [1, 0],
    [-1, 100],
    [2, 0],
  ] as const)('offsets a progress of %s by %s', ([progress, expected]) => {
    expect(getStrokeDashOffset(100, progress)).toBe(expected);
  });
});
