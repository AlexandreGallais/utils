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

  it('takes Math.random and the other defaults for null or undefined', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.3);
    expect(randomBetween()).toStrictEqual(randomBetween(0, 1, Math.random));
    expect(randomBetween(null, null, null)).toStrictEqual(randomBetween(0, 1, Math.random));
    vi.restoreAllMocks();
  });
});
