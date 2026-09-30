import { isNearlyEqual } from './is-nearly-equal';

describe(isNearlyEqual, () => {
  it('absorbs float noise', () => {
    expect(isNearlyEqual(0.1 + 0.2, 0.3, 1e-9)).toBe(true);
    expect(isNearlyEqual(1e12 + 0.0001, 1e12, 1e-9)).toBe(true);
    expect(isNearlyEqual(5, 5, 1e-9)).toBe(true);
  });

  it('detects real differences', () => {
    expect(isNearlyEqual(0.1, 0.1001, 1e-9)).toBe(false);
    expect(isNearlyEqual(1, 1.1, 0.01)).toBe(false);
    expect(isNearlyEqual(1, 1.1, 0.1)).toBe(true);
  });

  it('takes the defaults', () => {
    expect(isNearlyEqual(0.1 + 0.2, 0.3)).toStrictEqual(isNearlyEqual(0.1 + 0.2, 0.3, 1e-9));
  });
});
