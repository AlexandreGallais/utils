import { convertAngularVelocity } from './convert-angular-velocity';

describe(convertAngularVelocity, () => {
  it.for([
    [60, 'rpm', 'deg/s', 360],
    [Math.PI, 'rad/s', 'deg/s', 180],
    [1, 'rad/s', 'rpm', 60 / (2 * Math.PI)],
    [3, 'rpm', 'rpm', 3],
  ] as const)('converts %s %s to %s', ([value, from, to, expected]) => {
    expect(convertAngularVelocity(value, from, to)).toBeCloseTo(expected, 9);
  });
});
