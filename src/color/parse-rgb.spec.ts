import { parseRgb } from './parse-rgb.ts';
import type { Rgba } from './rgba.ts';

const RED: Rgba = { r: 255, g: 0, b: 0, a: 1 };

describe(parseRgb, () => {
  it.for([
    ['rgb(255, 0, 0)', RED],
    ['rgba(255,0,0,0.5)', { ...RED, a: 0.5 }],
    ['rgb(100%, 0%, 0%)', RED],
    ['rgb(255 0 0 / 50%)', { ...RED, a: 0.5 }],
    ['rgb(255 0 0)', RED],
    ['  RGB( 255 , 0 , 0 )  ', RED],
    ['rgb(300, -20, 127.6)', { r: 255, g: 0, b: 128, a: 1 }],
    ['rgba(0, 0, 0, 2)', { r: 0, g: 0, b: 0, a: 1 }],
    ['rgb(50% 50% 50% / .25)', { r: 128, g: 128, b: 128, a: 0.25 }],
  ] as const)('parses %j', ([input, expected]) => {
    expect(parseRgb(input)).toStrictEqual(expected);
  });

  it.for([
    'rgb()',
    'rgb(255, 0)',
    'rgb(255, 0, 0, 1, 1)',
    'rgb(a, 0, 0)',
    'rgb(255, 0, %)',
    'rgb(255 0 0 / 1 / 1)',
    'rgb(255, 0, 0, x)',
    'rgb(255, , 0)',
    'rgb 255 0 0',
    'hsl(0, 0%, 0%)',
  ])('rejects %j', (input) => {
    expect(parseRgb(input)).toBeUndefined();
  });
});
