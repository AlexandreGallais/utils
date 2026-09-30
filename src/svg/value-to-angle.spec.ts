import { valueToAngle } from './value-to-angle';

describe(valueToAngle, () => {
  it.for([
    [0, -135],
    [15, 0],
    [30, 135],
    [45, 135],
    [-10, -135],
  ] as const)('places %s at %s°', ([value, expected]) => {
    expect(valueToAngle(value, 0, 30, -135, 135, true)).toBe(expected);
  });

  it('extrapolates when not clamped', () => {
    expect(valueToAngle(45, 0, 30, -135, 135, false)).toBe(270);
  });

  it('supports counterclockwise scales', () => {
    expect(valueToAngle(25, 0, 100, 90, -90, true)).toBe(45);
  });

  it('takes the defaults for null or undefined', () => {
    expect(valueToAngle(0.5)).toStrictEqual(valueToAngle(0.5, 0, 1, 0, 360, true));
    expect(valueToAngle(0.5, null, null, null, null, null)).toStrictEqual(valueToAngle(0.5, 0, 1, 0, 360, true));
  });
});
