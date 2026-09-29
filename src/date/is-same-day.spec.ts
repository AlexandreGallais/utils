import { isSameDay } from './is-same-day.ts';

describe(isSameDay, () => {
  it('compares UTC days', () => {
    expect(isSameDay(new Date('2026-09-29T00:10:00Z'), new Date('2026-09-29T23:50:00Z'), true)).toBe(true);
    expect(isSameDay(new Date('2026-09-29T23:50:00Z'), new Date('2026-09-30T00:10:00Z'), true)).toBe(false);
  });

  it('compares local days by default', () => {
    expect(isSameDay(new Date(2026, 8, 29, 0, 5), new Date(2026, 8, 29, 23, 55))).toBe(true);
    expect(isSameDay(new Date(2026, 8, 29), new Date(2025, 8, 29))).toBe(false);
  });

  it('is false for an invalid date', () => {
    expect(isSameDay(new Date('oops'), new Date('oops'))).toBe(false);
  });
});
