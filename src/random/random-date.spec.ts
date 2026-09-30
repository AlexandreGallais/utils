import { randomDate } from './random-date';

describe(randomDate, () => {
  const start = new Date('2026-01-01T00:00:00Z');
  const end = new Date('2026-01-02T00:00:00Z');

  it('draws between the dates, both included', () => {
    expect(randomDate(start, end, () => 0)).toStrictEqual(start);
    expect(randomDate(start, end, () => 0.9999999999)).toStrictEqual(end);
    expect(randomDate(start, end, () => 0.5).toISOString()).toBe('2026-01-01T12:00:00.000Z');
  });

  it('returns a date in range', () => {
    const date = randomDate(start, end, Math.random);
    expect(date.getTime()).toBeGreaterThanOrEqual(start.getTime());
    expect(date.getTime()).toBeLessThanOrEqual(end.getTime());
  });

  it('throws a RangeError for an invalid or inverted interval', () => {
    expect(() => randomDate(new Date('2026-02-01'), new Date('2026-01-01'), Math.random)).toThrow(RangeError);
    expect(() => randomDate(new Date(NaN), end, Math.random)).toThrow(RangeError);
  });
});
