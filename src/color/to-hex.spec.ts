import { parseColorOrThrow } from './parse-color-or-throw';
import type { Rgba } from './rgba';
import { toHex } from './to-hex';

const RED: Rgba = { r: 255, g: 0, b: 0, a: 1 };

describe(toHex, () => {
  it.for([
    [{ r: 255, g: 128, b: 0 }, '#ff8000'],
    [RED, '#ff0000'],
    [{ ...RED, a: 0.5 }, '#ff000080'],
    [{ r: 300, g: -5, b: 12.4 }, '#ff000c'],
    [{ r: NaN, g: 0, b: 0 }, '#000000'],
  ] as const)('converts %j to %s', ([color, expected]) => {
    expect(toHex(color)).toBe(expected);
  });

  it('round-trips with parseHex', () => {
    expect(toHex(parseColorOrThrow('#1e90ffcc'))).toBe('#1e90ffcc');
  });
});
