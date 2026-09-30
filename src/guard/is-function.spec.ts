import { isFunction } from './is-function';

class Point {
  public readonly x = 0;
}

// Plain function type: calls are not seen as conditions, so any value can be passed.

describe(isFunction, () => {
  it('accepts functions and classes', () => {
    expect(isFunction(() => 0)).toBe(true);
    expect(isFunction(Point)).toBe(true);
    expect(isFunction({})).toBe(false);
  });
});
