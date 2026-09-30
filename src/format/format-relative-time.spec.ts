import { formatRelativeTime } from './format-relative-time';

describe(formatRelativeTime, () => {
  it.for([
    { offsetMs: -5 * 60_000, expected: '5 minutes ago' },
    { offsetMs: 2 * 3_600_000, expected: 'in 2 hours' },
    { offsetMs: -3 * 86_400_000, expected: '3 days ago' },
    { offsetMs: 14 * 86_400_000, expected: 'in 2 weeks' },
    { offsetMs: 90_000, expected: 'in 2 minutes' },
    { offsetMs: -30_000, expected: '30 seconds ago' },
    { offsetMs: 200, expected: 'now' },
  ])('formats $offsetMs ms as "$expected"', ({ offsetMs, expected }) => {
    expect(formatRelativeTime(offsetMs, 'en-US', 'auto')).toBe(expected);
  });

  it('uses words for close days with the auto style', () => {
    expect(formatRelativeTime(-86_400_000, 'fr-FR', 'auto')).toBe('hier');
    expect(formatRelativeTime(-86_400_000, 'fr-FR', 'always')).toBe('il y a 1 jour');
  });

  it('takes the defaults for null or undefined', () => {
    expect(formatRelativeTime(-86_400_000)).toStrictEqual(formatRelativeTime(-86_400_000, 'en-US', 'auto'));
    expect(formatRelativeTime(-86_400_000, null, null)).toStrictEqual(formatRelativeTime(-86_400_000, 'en-US', 'auto'));
  });
});
