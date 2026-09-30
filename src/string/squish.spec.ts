import { squish } from './squish';

describe(squish, () => {
  it.for([
    ['  Engine\n  room   temperature \t', 'Engine room temperature'],
    ['already clean', 'already clean'],
    [' '.repeat(3), ''],
  ] as const)('squishes %j', ([input, expected]) => {
    expect(squish(input)).toBe(expected);
  });
});
