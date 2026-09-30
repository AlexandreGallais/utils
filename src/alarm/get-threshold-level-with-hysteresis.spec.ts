import { getThresholdLevelWithHysteresis } from './get-threshold-level-with-hysteresis';
import type { ThresholdScale } from './threshold-scale';

type Level = 'alarm' | 'normal' | 'warning';

const SCALE: ThresholdScale<Level> = {
  belowLevel: 'alarm',
  thresholds: [
    { from: 5, level: 'warning' },
    { from: 10, level: 'normal' },
    { from: 80, level: 'warning' },
    { from: 90, level: 'alarm' },
  ],
};

describe(getThresholdLevelWithHysteresis, () => {
  it.for([
    { value: 89.5, previous: 'alarm', expected: 'alarm' },
    { value: 88.9, previous: 'alarm', expected: 'warning' },
    { value: 90.5, previous: 'warning', expected: 'warning' },
    { value: 91.1, previous: 'warning', expected: 'alarm' },
    { value: 9.5, previous: 'normal', expected: 'normal' },
    { value: 8.9, previous: 'normal', expected: 'warning' },
    { value: 50, previous: 'alarm', expected: 'normal' },
    { value: 4.5, previous: 'warning', expected: 'warning' },
    { value: 3.9, previous: 'warning', expected: 'alarm' },
  ] as const)('goes from $previous to $expected at $value', ({ value, previous, expected }) => {
    expect(getThresholdLevelWithHysteresis(value, SCALE, previous, 1)).toBe(expected);
  });

  it('gives the level below for NaN', () => {
    expect(getThresholdLevelWithHysteresis(NaN, SCALE, 'normal', 1)).toBe('alarm');
  });

  it('behaves like getThresholdLevel without deadband', () => {
    expect(getThresholdLevelWithHysteresis(90, SCALE, 'warning', 0)).toBe('alarm');
    expect(getThresholdLevelWithHysteresis(89.99, SCALE, 'alarm', 0)).toBe('warning');
  });

  it('takes the defaults for null or undefined', () => {
    expect(getThresholdLevelWithHysteresis(90, SCALE, 'warning')).toStrictEqual(
      getThresholdLevelWithHysteresis(90, SCALE, 'warning', 0),
    );
    expect(getThresholdLevelWithHysteresis(90, SCALE, 'warning', null)).toStrictEqual(
      getThresholdLevelWithHysteresis(90, SCALE, 'warning', 0),
    );
  });
});
