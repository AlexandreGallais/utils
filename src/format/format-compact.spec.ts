import { formatCompact } from './format-compact.ts';

describe(formatCompact, () => {
  it.for([
    [1234, '1.2K'],
    [15_300_000, '15.3M'],
    [999, '999'],
    [-2500, '-2.5K'],
  ] as const)('formats %s as %s', ([value, expected]) => {
    expect(formatCompact(value, 'en-US', 1)).toBe(expected);
  });

  it('uses the locale and the precision', () => {
    expect(formatCompact(1234, 'fr-FR', 1)).toBe('1,2 k');
    expect(formatCompact(1234, 'en-US', 0)).toBe('1K');
  });

  it('throws a RangeError for invalid digits', () => {
    expect(() => formatCompact(1, 'en-US', -1)).toThrow(RangeError);
  });
});
