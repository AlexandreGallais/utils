import { meetsContrastLevel } from './meets-contrast-level';
import type { Rgb } from './rgb';

const BLACK: Rgb = { r: 0, g: 0, b: 0 };

const WHITE: Rgb = { r: 255, g: 255, b: 255 };

describe(meetsContrastLevel, () => {
  const gray: Rgb = { r: 0x76, g: 0x76, b: 0x76 };
  const lightGray: Rgb = { r: 0x94, g: 0x94, b: 0x94 };

  it('applies the normal text thresholds', () => {
    expect(meetsContrastLevel(gray, WHITE, 'AA', false)).toBe(true);
    expect(meetsContrastLevel(gray, WHITE, 'AAA', false)).toBe(false);
    expect(meetsContrastLevel(BLACK, WHITE, 'AAA', false)).toBe(true);
  });

  it('applies the large text thresholds', () => {
    expect(meetsContrastLevel(lightGray, WHITE, 'AA', false)).toBe(false);
    expect(meetsContrastLevel(lightGray, WHITE, 'AA', true)).toBe(true);
    expect(meetsContrastLevel(gray, WHITE, 'AAA', true)).toBe(true);
  });

  it('takes the defaults for null or undefined', () => {
    expect(meetsContrastLevel({ r: 0, g: 0, b: 0 }, { r: 200, g: 100, b: 50 })).toStrictEqual(
      meetsContrastLevel({ r: 0, g: 0, b: 0 }, { r: 200, g: 100, b: 50 }, 'AA', false),
    );
    expect(meetsContrastLevel({ r: 0, g: 0, b: 0 }, { r: 200, g: 100, b: 50 }, null, null)).toStrictEqual(
      meetsContrastLevel({ r: 0, g: 0, b: 0 }, { r: 200, g: 100, b: 50 }, 'AA', false),
    );
  });
});
