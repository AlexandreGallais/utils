import { convertVolume } from './convert-volume.ts';

describe(convertVolume, () => {
  it.for([
    [1, 'm³', 'L', 1000],
    [2500, 'mL', 'L', 2.5],
    [1, 'gal', 'L', 3.785411784],
    [1, 'bbl', 'gal', 42],
    [1, 'ft³', 'L', 28.316846592],
    [7, 'L', 'L', 7],
  ] as const)('converts %s %s to %s', ([value, from, to, expected]) => {
    expect(convertVolume(value, from, to)).toBeCloseTo(expected, 9);
  });
});
