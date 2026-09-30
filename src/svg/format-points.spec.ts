import { formatPoints } from './format-points';

describe(formatPoints, () => {
  it('formats the pairs', () => {
    expect(
      formatPoints([
        { x: 0, y: 10 },
        { x: 5.12345, y: -0.0001 },
      ]),
    ).toBe('0,10 5.123,0');
  });

  it('returns an empty string without point', () => {
    expect(formatPoints([])).toBe('');
  });

  it('takes the defaults for null or undefined', () => {
    expect(formatPoints()).toStrictEqual(formatPoints([]));
    expect(formatPoints(null)).toStrictEqual(formatPoints([]));
  });
});
