import { convertDistance } from './convert-distance';

describe(convertDistance, () => {
  it.for([
    [1, 'nmi', 'm', 1852],
    [1000, 'ft', 'm', 304.8],
    [5, 'km', 'nmi', 2.699784],
    [1, 'mi', 'ft', 5280],
    [304.8, 'm', 'ft', 1000],
  ] as const)('converts %s %s to %s', ([value, from, to, expected]) => {
    expect(convertDistance(value, from, to)).toBeCloseTo(expected, 6);
  });

  it('returns the value unchanged for the same unit', () => {
    expect(convertDistance(0.1, 'm', 'm')).toBe(0.1);
  });
});
