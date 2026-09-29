import { formatTimeSpan } from './format-time-span.ts';
import { parseTimeSpan } from './parse-time-span.ts';

describe(formatTimeSpan, () => {
  it.for([
    [93_784_567, '1.02:03:04.5670000'],
    [-30_000, '-00:00:30'],
    [0, '00:00:00'],
    [0.0001, '00:00:00.0000001'],
    [43_200_000, '12:00:00'],
  ] as const)('formats %s ms as %j', ([ms, expected]) => {
    expect(formatTimeSpan(ms)).toBe(expected);
  });

  it('round-trips with parseTimeSpan', () => {
    expect(parseTimeSpan(formatTimeSpan(123_456_789.1234))?.totalMilliseconds).toBeCloseTo(123_456_789.1234, 4);
  });

  it.for([NaN, -Infinity])('returns an empty string for %s', (ms) => {
    expect(formatTimeSpan(ms)).toBe('');
  });
});
