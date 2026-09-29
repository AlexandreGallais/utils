import { isUndefined } from './is-undefined.ts';

describe(isUndefined, () => {
  it('accepts undefined only', () => {
    expect(isUndefined(undefined)).toBe(true);
    expect(isUndefined(null)).toBe(false);
    expect(isUndefined(0)).toBe(false);
  });
});
