import { addDays } from './add-days.ts';

describe(addDays, () => {
  it('moves by UTC days, across months and years', () => {
    expect(addDays(new Date('2026-09-29T14:00:00Z'), 3, true).toISOString()).toBe('2026-10-02T14:00:00.000Z');
    expect(addDays(new Date('2026-12-31T10:00:00Z'), 1, true).toISOString()).toBe('2027-01-01T10:00:00.000Z');
    expect(addDays(new Date('2026-03-01T10:00:00Z'), -1, true).toISOString()).toBe('2026-02-28T10:00:00.000Z');
  });

  it('keeps the local time of day', () => {
    const date = addDays(new Date(2026, 2, 28, 14, 0), 2, false);
    expect([date.getDate(), date.getHours()]).toStrictEqual([30, 14]);
  });
});
