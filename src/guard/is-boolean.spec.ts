import { isBoolean } from './is-boolean';

describe(isBoolean, () => {
  it('accepts booleans only', () => {
    expect(isBoolean(false)).toBe(true);
    expect(isBoolean(0)).toBe(false);
    expect(isBoolean('true')).toBe(false);
  });
});
