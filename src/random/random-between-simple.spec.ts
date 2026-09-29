import { randomBetweenSimple } from './random-between-simple.ts';

describe(randomBetweenSimple, () => {
  it('stays within the interval', () => {
    const value = randomBetweenSimple(2, 3);
    expect(value).toBeGreaterThanOrEqual(2);
    expect(value).toBeLessThan(3);
  });
});
