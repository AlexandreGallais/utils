import { isNull } from './is-null';

describe(isNull, () => {
  it.for([
    [null, true],
    [undefined, false],
    [0, false],
  ] as const)('checks %s as %s', ([value, expected]) => {
    expect(isNull(value)).toBe(expected);
  });
});
