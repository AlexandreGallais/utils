import { isArray } from './is-array';

describe(isArray, () => {
  it('accepts arrays only', () => {
    expect(isArray([])).toBe(true);
    expect(isArray({ length: 0 })).toBe(false);
    expect(isArray('abc')).toBe(false);
    expect(isArray(null)).toBe(false);
  });
});
