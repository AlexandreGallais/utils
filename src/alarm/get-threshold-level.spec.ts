import { getThresholdLevel } from './get-threshold-level.ts';

type Level = 'alarm' | 'normal' | 'warning';

const SCALE = {
  belowLevel: 'alarm',
  thresholds: [
    { from: 5, level: 'warning' },
    { from: 10, level: 'normal' },
    { from: 80, level: 'warning' },
    { from: 90, level: 'alarm' },
  ],
} as const satisfies { belowLevel: Level; thresholds: readonly { from: number; level: Level }[] };

describe(getThresholdLevel, () => {
  it.for([
    { value: -10, expected: 'alarm' },
    { value: 5, expected: 'warning' },
    { value: 9.99, expected: 'warning' },
    { value: 10, expected: 'normal' },
    { value: 50, expected: 'normal' },
    { value: 85, expected: 'warning' },
    { value: 90, expected: 'alarm' },
    { value: Infinity, expected: 'alarm' },
  ])('gives $expected for $value', ({ value, expected }) => {
    expect(getThresholdLevel(value, SCALE)).toBe(expected);
  });

  it('returns the level below for NaN', () => {
    expect(getThresholdLevel(NaN, { belowLevel: 'low', thresholds: [{ from: 0, level: 'high' }] })).toBe('low');
  });

  it('returns the level below without threshold', () => {
    expect(getThresholdLevel(3, { belowLevel: 'normal', thresholds: [] })).toBe('normal');
  });
});
