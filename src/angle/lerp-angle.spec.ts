import { lerpAngle } from './lerp-angle';

describe(lerpAngle, () => {
  it.for([
    [350, 10, 0.5, 0],
    [10, 350, 0.5, 0],
    [0, 90, 0.5, 45],
    [350, 10, 0.25, 355],
    [350, 10, 1, 10],
  ] as const)('interpolates %s° → %s° at %s as %s°', ([from, to, t, expected]) => {
    expect(lerpAngle(from, to, t)).toBeCloseTo(expected, 10);
  });
});
