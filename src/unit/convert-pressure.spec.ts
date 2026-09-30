import { convertPressure } from './convert-pressure';

describe(convertPressure, () => {
  it.for([
    [1, 'bar', 'psi', 14.5037738],
    [1013.25, 'hPa', 'bar', 1.01325],
    [100, 'kPa', 'bar', 1],
    [1, 'psi', 'Pa', 6894.757293],
  ] as const)('converts %s %s to %s', ([value, from, to, expected]) => {
    expect(convertPressure(value, from, to)).toBeCloseTo(expected, 6);
  });

  it('returns the value unchanged for the same unit', () => {
    expect(convertPressure(2.5, 'bar', 'bar')).toBe(2.5);
  });
});
