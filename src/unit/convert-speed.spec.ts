import { convertSpeed } from './convert-speed';

describe(convertSpeed, () => {
  it.for([
    [10, 'kn', 'm/s', 5.144444444],
    [36, 'km/h', 'm/s', 10],
    [1, 'kn', 'km/h', 1.852],
    [60, 'mph', 'km/h', 96.56064],
    [5.144444444, 'm/s', 'kn', 10],
  ] as const)('converts %s %s to %s', ([value, from, to, expected]) => {
    expect(convertSpeed(value, from, to)).toBeCloseTo(expected, 6);
  });

  it('returns the value unchanged for the same unit', () => {
    expect(convertSpeed(12.3, 'kn', 'kn')).toBe(12.3);
  });
});
