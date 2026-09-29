import { isObject } from './is-object.ts';

class Point {
  public readonly x = 0;
}

// Plain function type: calls are not seen as conditions, so any value can be passed.

describe(isObject, () => {
  it.for([
    [{}, true],
    [[], true],
    [new Point(), true],
    [new Date(0), true],
    [null, false],
    [undefined, false],
    ['object', false],
    [(): number => 0, false],
  ] as const)('checks %j as %s', ([value, expected]) => {
    expect(isObject(value)).toBe(expected);
  });
});
