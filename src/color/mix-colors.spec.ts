import { mixColors } from './mix-colors';
import type { Rgb } from './rgb';
import type { Rgba } from './rgba';

const BLACK: Rgb = { r: 0, g: 0, b: 0 };

const WHITE: Rgb = { r: 255, g: 255, b: 255 };

const RED: Rgba = { r: 255, g: 0, b: 0, a: 1 };

describe(mixColors, () => {
  it('interpolates every channel', () => {
    expect(mixColors(BLACK, WHITE, 0.5)).toStrictEqual({ r: 127.5, g: 127.5, b: 127.5, a: 1 });
    expect(mixColors(RED, { r: 0, g: 0, b: 255, a: 0 }, 0.25)).toStrictEqual({ r: 191.25, g: 0, b: 63.75, a: 0.75 });
  });

  it('returns the ends for t = 0 and t = 1', () => {
    expect(mixColors(RED, WHITE, 0)).toStrictEqual(RED);
    expect(mixColors(RED, WHITE, 1)).toStrictEqual({ ...WHITE, a: 1 });
  });
});
