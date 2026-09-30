import { formatCompactSimple } from './format-compact-simple';

describe(formatCompactSimple, () => {
  it.for([
    [1234, '1.2K'],
    [15_300_000, '15.3M'],
    [999, '999'],
  ] as const)('formats %s as %s', ([value, expected]) => {
    expect(formatCompactSimple(value)).toBe(expected);
  });
});
