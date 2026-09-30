import { getArcLength } from './get-arc-length';

describe(getArcLength, () => {
  it.for([
    [10, 0, 360, 20 * Math.PI],
    [40, -135, 135, 60 * Math.PI],
    [5, 90, 0, 2.5 * Math.PI],
    [5, 30, 30, 0],
  ] as const)('measures an arc of radius %s from %s° to %s°', ([radius, start, end, expected]) => {
    expect(getArcLength(radius, start, end)).toBeCloseTo(expected, 9);
  });
});
