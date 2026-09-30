import { isNearlyEqualSimple } from './is-nearly-equal-simple';

describe(isNearlyEqualSimple, () => {
  it('ignores float noise', () => {
    expect(isNearlyEqualSimple(0.1 + 0.2, 0.3)).toBe(true);
    expect(isNearlyEqualSimple(1, 1.001)).toBe(false);
  });
});
