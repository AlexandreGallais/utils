import { isSameDaySimple } from './is-same-day-simple';

describe(isSameDaySimple, () => {
  it('compares local days', () => {
    expect(isSameDaySimple(new Date(2026, 0, 15, 1), new Date(2026, 0, 15, 23))).toBe(true);
    expect(isSameDaySimple(new Date(2026, 0, 15), new Date(2026, 0, 16))).toBe(false);
  });
});
