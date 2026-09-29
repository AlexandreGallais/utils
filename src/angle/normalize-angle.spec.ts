import { normalizeAngle } from './normalize-angle.ts';

describe(normalizeAngle, () => {
  it.for([
    [0, 0],
    [360, 0],
    [720, 0],
    [-90, 270],
    [450, 90],
    [-450, 270],
    [359.5, 359.5],
  ] as const)('normalizes %s° as %s°', ([degrees, expected]) => {
    expect(normalizeAngle(degrees)).toBe(expected);
  });
});
