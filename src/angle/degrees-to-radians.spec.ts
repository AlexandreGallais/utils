import { degreesToRadians } from './degrees-to-radians.ts';

describe(degreesToRadians, () => {
  it.for([
    [0, 0],
    [180, Math.PI],
    [-90, -Math.PI / 2],
    [360, 2 * Math.PI],
  ] as const)('converts %s° to %s rad', ([degrees, radians]) => {
    expect(degreesToRadians(degrees)).toBeCloseTo(radians, 12);
  });
});
