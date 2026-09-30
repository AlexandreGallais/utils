import { parseNamedColor } from './parse-named-color';
import type { Rgba } from './rgba';

const RED: Rgba = { r: 255, g: 0, b: 0, a: 1 };

describe(parseNamedColor, () => {
  it.for([
    ['red', RED],
    ['Navy', { r: 0, g: 0, b: 128, a: 1 }],
    [' rebeccapurple ', { r: 102, g: 51, b: 153, a: 1 }],
    ['transparent', { r: 0, g: 0, b: 0, a: 0 }],
    ['yellowgreen', { r: 154, g: 205, b: 50, a: 1 }],
  ] as const)('parses %j', ([input, expected]) => {
    expect(parseNamedColor(input)).toStrictEqual(expected);
  });

  it.for(['', 'reddish', 'constructor', '#fff'])('rejects %j', (input) => {
    expect(parseNamedColor(input)).toBeUndefined();
  });
});
