import { capitalize } from './capitalize';

describe(capitalize, () => {
  it.for([
    ['hello world', 'Hello world'],
    ['Hello', 'Hello'],
    ['hELLO', 'HELLO'],
    ['élan', 'Élan'],
    ['1st', '1st'],
    ['', ''],
    ['\u{10428}x', '\u{10400}x'],
  ] as const)('capitalizes %j as %j', ([input, expected]) => {
    expect(capitalize(input)).toBe(expected);
  });

  it('takes the defaults for null or undefined', () => {
    expect(capitalize()).toStrictEqual(capitalize(''));
    expect(capitalize(null)).toStrictEqual(capitalize(''));
  });
});
