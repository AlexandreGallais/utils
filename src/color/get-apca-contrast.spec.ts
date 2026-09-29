import { getApcaContrast } from './get-apca-contrast.ts';

const BLACK = { r: 0, g: 0, b: 0 };
const WHITE = { r: 255, g: 255, b: 255 };

describe(getApcaContrast, () => {
  it.for([
    [BLACK, WHITE, 106.04],
    [WHITE, BLACK, -107.88],
    [{ r: 0x88, g: 0x88, b: 0x88 }, WHITE, 63.06],
    [WHITE, { r: 0x88, g: 0x88, b: 0x88 }, -68.54],
    [{ r: 0x11, g: 0x22, b: 0x33 }, { r: 0xdd, g: 0xee, b: 0xff }, 91.67],
  ] as const)('computes the Lc of %j on %j as %s', ([text, background, expected]) => {
    expect(getApcaContrast(text, background)).toBeCloseTo(expected, 2);
  });

  it('returns 0 for identical or nearly identical colors', () => {
    expect(getApcaContrast(WHITE, WHITE)).toBe(0);
    expect(getApcaContrast({ r: 250, g: 250, b: 250 }, WHITE)).toBe(0);
    expect(getApcaContrast(WHITE, { r: 250, g: 250, b: 250 })).toBe(0);
  });
});
