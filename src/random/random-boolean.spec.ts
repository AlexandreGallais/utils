import { randomBoolean } from './random-boolean';

describe(randomBoolean, () => {
  it('draws true below the probability', () => {
    expect(randomBoolean(0.3, () => 0.29)).toBe(true);
    expect(randomBoolean(0.3, () => 0.3)).toBe(false);
  });

  it('draws an even chance at 0.5', () => {
    expect(randomBoolean(0.5, () => 0.49)).toBe(true);
    expect(randomBoolean(0.5, () => 0.5)).toBe(false);
    expect(randomBoolean(0.5, Math.random)).toBeTypeOf('boolean');
  });

  it('never draws true at 0 and always at 1', () => {
    expect(randomBoolean(0, () => 0)).toBe(false);
    expect(randomBoolean(1, () => 0.999999)).toBe(true);
  });

  it('takes Math.random and the other defaults for null or undefined', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.3);
    expect(randomBoolean()).toStrictEqual(randomBoolean(0.5, Math.random));
    expect(randomBoolean(null, null)).toStrictEqual(randomBoolean(0.5, Math.random));
    vi.restoreAllMocks();
  });
});
