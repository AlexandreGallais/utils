import { randomBetween } from './random-between';

describe(randomBetween, () => {
  it('maps the random source onto the interval', () => {
    expect(randomBetween(10, 20, () => 0)).toBe(10);
    expect(randomBetween(10, 20, () => 0.5)).toBe(15);
    expect(randomBetween(-1, 1, () => 0.75)).toBe(0.5);
  });

  it('stays within the interval with Math.random', () => {
    const value = randomBetween(3, 4, Math.random);
    expect(value).toBeGreaterThanOrEqual(3);
    expect(value).toBeLessThan(4);
  });
});
