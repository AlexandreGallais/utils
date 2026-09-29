import { startOfDaySimple } from './start-of-day-simple.ts';

describe(startOfDaySimple, () => {
  it('goes back to local midnight', () => {
    expect(startOfDaySimple(new Date(2026, 0, 15, 9, 5))).toStrictEqual(new Date(2026, 0, 15));
  });
});
