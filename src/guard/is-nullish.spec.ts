import { isNullish } from './is-nullish';

describe(isNullish, () => {
  it.for([
    [null, true],
    [undefined, true],
    [0, false],
    ['', false],
    [false, false],
  ] as const)('checks %s as %s', ([value, expected]) => {
    expect(isNullish(value)).toBe(expected);
  });
});
