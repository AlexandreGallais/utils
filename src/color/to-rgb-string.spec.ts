import type { Rgba } from './rgba';
import { toRgbString } from './to-rgb-string';

const RED: Rgba = { r: 255, g: 0, b: 0, a: 1 };

describe(toRgbString, () => {
  it.for([
    [{ r: 255, g: 128, b: 0 }, 'rgb(255, 128, 0)'],
    [RED, 'rgb(255, 0, 0)'],
    [{ ...RED, a: 0.5 }, 'rgba(255, 0, 0, 0.5)'],
    [{ r: 1.6, g: 0, b: 0, a: 1 / 3 }, 'rgba(2, 0, 0, 0.333)'],
    [{ ...RED, a: -1 }, 'rgba(255, 0, 0, 0)'],
  ] as const)('converts %j to %s', ([color, expected]) => {
    expect(toRgbString(color)).toBe(expected);
  });
});
