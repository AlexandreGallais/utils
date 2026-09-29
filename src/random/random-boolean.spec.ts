import { randomBoolean } from './random-boolean.ts';

describe(randomBoolean, () => {
  it('draws true below the probability', () => {
    expect(randomBoolean(0.3, () => 0.29)).toBe(true);
    expect(randomBoolean(0.3, () => 0.3)).toBe(false);
  });

  it('uses an even chance by default', () => {
    expect(randomBoolean(undefined, () => 0.49)).toBe(true);
    expect(randomBoolean(undefined, () => 0.5)).toBe(false);
    expect(randomBoolean()).toBeTypeOf('boolean');
  });

  it('never draws true at 0 and always at 1', () => {
    expect(randomBoolean(0, () => 0)).toBe(false);
    expect(randomBoolean(1, () => 0.999999)).toBe(true);
  });
});
