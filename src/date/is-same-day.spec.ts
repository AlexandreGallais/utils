import { isSameDay } from './is-same-day';

describe(isSameDay, () => {
  it('compares UTC days', () => {
    expect(isSameDay(new Date('2026-09-29T00:10:00Z'), new Date('2026-09-29T23:50:00Z'), true)).toBe(true);
    expect(isSameDay(new Date('2026-09-29T23:50:00Z'), new Date('2026-09-30T00:10:00Z'), true)).toBe(false);
  });

  it('compares local days', () => {
    expect(isSameDay(new Date(2026, 8, 29, 0, 5), new Date(2026, 8, 29, 23, 55), false)).toBe(true);
    expect(isSameDay(new Date(2026, 8, 29), new Date(2025, 8, 29), false)).toBe(false);
  });

  it('is false for an invalid date', () => {
    expect(isSameDay(new Date('oops'), new Date('oops'), false)).toBe(false);
  });

  it('takes the defaults for null or undefined', () => {
    expect(isSameDay(new Date('2026-09-29T14:30:05Z'), new Date('2026-09-29T14:30:05Z'))).toStrictEqual(
      isSameDay(new Date('2026-09-29T14:30:05Z'), new Date('2026-09-29T14:30:05Z'), false),
    );
    expect(isSameDay(new Date('2026-09-29T14:30:05Z'), new Date('2026-09-29T14:30:05Z'), null)).toStrictEqual(
      isSameDay(new Date('2026-09-29T14:30:05Z'), new Date('2026-09-29T14:30:05Z'), false),
    );
  });
});
