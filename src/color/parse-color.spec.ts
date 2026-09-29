import { parseColor } from './parse-color.ts';
import type { Rgba } from './rgba.ts';

const RED: Rgba = { r: 255, g: 0, b: 0, a: 1 };

describe(parseColor, () => {
  it.for([
    ['#FFF', { r: 255, g: 255, b: 255, a: 1 }],
    ['  RGB(255, 0, 0)  ', RED],
    ['HSL(0, 100%, 50%)', RED],
    ['RED', RED],
    ['fff', { r: 255, g: 255, b: 255, a: 1 }],
    ['transparent', { r: 0, g: 0, b: 0, a: 0 }],
  ] as const)('parses %j', ([input, expected]) => {
    expect(parseColor(input)).toStrictEqual(expected);
  });

  it.for(['', 'not a color', '#ggg', 'rgb(1, 2)', 'hsl(1, 2)'])('returns undefined for %j', (input) => {
    expect(parseColor(input)).toBeUndefined();
  });

  it('returns a new object at each call', () => {
    expect(parseColor('#123456')).not.toBe(parseColor('#123456'));
  });
});
