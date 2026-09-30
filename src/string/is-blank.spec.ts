import { isBlank } from './is-blank';

describe(isBlank, () => {
  it.for([
    [null, true],
    [undefined, true],
    ['', true],
    [' \n\t', true],
    [' a ', false],
    ['0', false],
  ] as const)('checks %j as %s', ([input, expected]) => {
    expect(isBlank(input)).toBe(expected);
  });
});
