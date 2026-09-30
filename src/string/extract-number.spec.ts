import { extractNumber } from './extract-number';

describe(extractNumber, () => {
  it.for([
    ['42', 42],
    ['Speed: -12,5 kn', -12.5],
    ['heading 270.5°', 270.5],
    ['+3', 3],
    ['value .5', 0.5],
    ['1,234', 1.234],
    ['a1b2', 1],
  ] as const)('extracts %j as %s', ([input, expected]) => {
    expect(extractNumber(input)).toBe(expected);
  });

  it.for(['', 'n/a', '-', '.', 'abc'])('returns undefined for %j', (input) => {
    expect(extractNumber(input)).toBeUndefined();
  });
});
