import { differenceInCalendarDays } from './difference-in-calendar-days';

describe(differenceInCalendarDays, () => {
  it('counts the UTC day boundaries', () => {
    expect(differenceInCalendarDays(new Date('2026-10-01T00:01:00Z'), new Date('2026-09-29T23:59:00Z'), true)).toBe(2);
    expect(differenceInCalendarDays(new Date('2026-09-29T23:59:00Z'), new Date('2026-09-29T00:00:00Z'), true)).toBe(0);
    expect(differenceInCalendarDays(new Date('2026-09-01T00:00:00Z'), new Date('2026-09-29T00:00:00Z'), true)).toBe(
      -28,
    );
  });

  it('counts local days across daylight saving time', () => {
    expect(differenceInCalendarDays(new Date(2026, 2, 30, 12), new Date(2026, 2, 28, 12), false)).toBe(2);
  });

  it('returns NaN for an invalid date', () => {
    expect(differenceInCalendarDays(new Date('oops'), new Date(0), false)).toBeNaN();
  });

  it('takes the defaults for null or undefined', () => {
    expect(differenceInCalendarDays(new Date('2026-09-29T14:30:05Z'), new Date('2026-09-20T10:00:00Z'))).toStrictEqual(
      differenceInCalendarDays(new Date('2026-09-29T14:30:05Z'), new Date('2026-09-20T10:00:00Z'), false),
    );
    expect(
      differenceInCalendarDays(new Date('2026-09-29T14:30:05Z'), new Date('2026-09-20T10:00:00Z'), null),
    ).toStrictEqual(
      differenceInCalendarDays(new Date('2026-09-29T14:30:05Z'), new Date('2026-09-20T10:00:00Z'), false),
    );
  });
});
