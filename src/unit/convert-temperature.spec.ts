import { convertTemperature } from './convert-temperature.ts';

describe(convertTemperature, () => {
  it.for([
    [100, 'C', 'F', 212],
    [212, 'F', 'C', 100],
    [0, 'K', 'C', -273.15],
    [0, 'C', 'K', 273.15],
    [-40, 'F', 'C', -40],
    [300, 'K', 'F', 80.33],
    [80.33, 'F', 'K', 300],
  ] as const)('converts %s %s to %s', ([value, from, to, expected]) => {
    expect(convertTemperature(value, from, to)).toBeCloseTo(expected, 9);
  });

  it('returns the value unchanged for the same unit', () => {
    expect(convertTemperature(21.5, 'C', 'C')).toBe(21.5);
  });
});
