import { parseHsl } from './parse-hsl.ts';
import type { Rgba } from './rgba.ts';

const RED: Rgba = { r: 255, g: 0, b: 0, a: 1 };

describe(parseHsl, () => {
  it.for([
    ['hsl(0, 100%, 50%)', RED],
    ['hsl(120, 100%, 25%)', { r: 0, g: 128, b: 0, a: 1 }],
    ['hsl(240 100% 50%)', { r: 0, g: 0, b: 255, a: 1 }],
    ['hsla(0, 0%, 100%, 0.5)', { r: 255, g: 255, b: 255, a: 0.5 }],
    ['hsl(0.5turn 100% 50% / 20%)', { r: 0, g: 255, b: 255, a: 0.2 }],
    ['hsl(-120deg, 100%, 50%)', { r: 0, g: 0, b: 255, a: 1 }],
    ['hsl(3.14159265rad 100% 50%)', { r: 0, g: 255, b: 255, a: 1 }],
    ['hsl(200grad 100% 50%)', { r: 0, g: 255, b: 255, a: 1 }],
    ['hsl(0 100 50)', RED],
    ['hsl(0, 150%, 50%)', RED],
  ] as const)('parses %j', ([input, expected]) => {
    expect(parseHsl(input)).toStrictEqual(expected);
  });

  it.for([
    'hsl()',
    'hsl(0, 100%)',
    'hsl(red, 100%, 50%)',
    'hsl(10px, 100%, 50%)',
    'hsl(0, x, 50%)',
    'hsl(0, 1%, 1%, y)',
    'hsl(1..2, 1%, 1%)',
  ])('rejects %j', (input) => {
    expect(parseHsl(input)).toBeUndefined();
  });
});
