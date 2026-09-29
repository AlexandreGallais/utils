import { isString } from './is-string.ts';

describe(isString, () => {
  it('accepts strings only', () => {
    expect(isString('')).toBe(true);
    expect(isString(1)).toBe(false);
  });
});
