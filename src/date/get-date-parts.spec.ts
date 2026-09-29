import { getDateParts } from './get-date-parts.ts';

describe(getDateParts, () => {
  it('reads every field in UTC', () => {
    expect(getDateParts(new Date('2026-09-29T14:30:05.123Z'), true)).toStrictEqual({
      year: 2026,
      month: 9,
      day: 29,
      hour: 14,
      minute: 30,
      second: 5,
      millisecond: 123,
      weekday: 2,
      dayOfYear: 272,
      timestamp: 1_790_692_205_123,
    });
  });

  it('numbers Sunday 7 and counts the day of the year', () => {
    expect(getDateParts(new Date('2026-01-04T00:00:00Z'), true)).toMatchObject({ weekday: 7, dayOfYear: 4 });
    expect(getDateParts(new Date('2028-12-31T23:59:59Z'), true)).toMatchObject({ dayOfYear: 366 });
  });

  it('reads local time by default', () => {
    const date = new Date(2026, 8, 29, 14, 30);
    expect(getDateParts(date)).toMatchObject({ year: 2026, month: 9, day: 29, hour: 14, minute: 30, weekday: 2 });
  });

  it('returns undefined for an invalid date', () => {
    expect(getDateParts(new Date('oops'))).toBeUndefined();
  });
});
