import { randomDateSimple } from './random-date-simple';

describe(randomDateSimple, () => {
  it('stays within the interval', () => {
    const start = new Date(2026, 0, 1);
    const end = new Date(2026, 0, 2);
    const time = randomDateSimple(start, end).getTime();
    expect(time).toBeGreaterThanOrEqual(start.getTime());
    expect(time).toBeLessThanOrEqual(end.getTime());
  });
});
