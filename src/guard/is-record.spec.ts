import { isRecord } from './is-record';

class Point {
  public readonly x = 0;
}

// Plain function type: calls are not seen as conditions, so any value can be passed.

describe(isRecord, () => {
  it.for([
    [{}, true],
    [{ a: 1 }, true],
    [Object.create(null), true],
    [[], false],
    [new Point(), false],
    [new Map(), false],
    [null, false],
    [1, false],
  ] as const)('checks %j as %s', ([value, expected]) => {
    expect(isRecord(value)).toBe(expected);
  });
});
