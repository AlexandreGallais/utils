import { differenceInCalendarDaysSimple } from './difference-in-calendar-days-simple.ts';

describe(differenceInCalendarDaysSimple, () => {
  it('counts local days', () => {
    expect(differenceInCalendarDaysSimple(new Date(2026, 0, 16, 0, 1), new Date(2026, 0, 15, 23, 59))).toBe(1);
  });
});
