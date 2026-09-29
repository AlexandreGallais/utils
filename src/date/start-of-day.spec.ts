import { startOfDay } from './start-of-day.ts';

describe(startOfDay, () => {
  it('goes back to midnight in UTC', () => {
    expect(startOfDay(new Date('2026-09-29T14:30:00Z'), true).toISOString()).toBe('2026-09-29T00:00:00.000Z');
  });

  it('goes back to local midnight, without changing the input', () => {
    const date = new Date(2026, 8, 29, 14, 30);
    const start = startOfDay(date, false);
    expect([start.getDate(), start.getHours(), start.getMinutes()]).toStrictEqual([29, 0, 0]);
    expect(date.getHours()).toBe(14);
  });
});
