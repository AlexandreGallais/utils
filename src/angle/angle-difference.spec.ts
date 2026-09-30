import { angleDifference } from './angle-difference';

describe(angleDifference, () => {
  it.for([
    [350, 10, 20],
    [10, 350, -20],
    [0, 180, -180],
    [90, 90, 0],
    [0, 540, -180],
    [-30, 30, 60],
  ] as const)('turns from %s° to %s° by %s°', ([from, to, expected]) => {
    expect(angleDifference(from, to)).toBe(expected);
  });
});
