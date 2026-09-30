import { formatDuration } from './format-duration';

describe(formatDuration, () => {
  it.for([
    [0, '0:00'],
    [999, '0:00'],
    [309_000, '5:09'],
    [3_599_999, '59:59'],
    [3_909_000, '1:05:09'],
    [90_000_000, '25:00:00'],
    [-65_000, '-1:05'],
    [-500, '0:00'],
  ] as const)('formats %s ms as %s', ([ms, expected]) => {
    expect(formatDuration(ms, 0)).toBe(expected);
  });

  it('shows truncated fractions of a second', () => {
    expect(formatDuration(9870, 1)).toBe('0:09.8');
    expect(formatDuration(9870, 3)).toBe('0:09.870');
    expect(formatDuration(61_005, 2)).toBe('1:01.00');
  });

  it('formats non-finite durations as a placeholder', () => {
    expect(formatDuration(NaN, 0)).toBe('--:--');
    expect(formatDuration(Infinity, 0)).toBe('--:--');
  });

  it.for([-1, 4, 1.5])('throws a RangeError for %s fraction digits', (digits) => {
    expect(() => formatDuration(0, digits)).toThrow(RangeError);
  });
});
