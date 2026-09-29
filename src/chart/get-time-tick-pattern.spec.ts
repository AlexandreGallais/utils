import { getTimeTickPattern } from './get-time-tick-pattern.ts';

describe(getTimeTickPattern, () => {
  it.for([
    { stepMs: 100, expected: 'HH:mm:ss.SSS' },
    { stepMs: 1000, expected: 'HH:mm:ss' },
    { stepMs: 30_000, expected: 'HH:mm:ss' },
    { stepMs: 60_000, expected: 'HH:mm' },
    { stepMs: 21_600_000, expected: 'HH:mm' },
    { stepMs: 86_400_000, expected: 'DD/MM' },
    { stepMs: 129_600_000, expected: 'DD/MM HH:mm' },
  ])('uses $expected for a step of $stepMs ms', ({ stepMs, expected }) => {
    expect(getTimeTickPattern(stepMs)).toBe(expected);
  });
});
