import { fitRect } from './fit-rect.ts';

const SQUARE = { x: 0, y: 0, width: 100, height: 100 };
const WIDE = { width: 200, height: 100 };

describe(fitRect, () => {
  it('contains the content, centered', () => {
    expect(fitRect(WIDE, SQUARE)).toStrictEqual({ x: 0, y: 25, width: 100, height: 50, scale: 0.5 });
  });

  it('covers the container, centered', () => {
    expect(fitRect(WIDE, SQUARE, 'cover')).toStrictEqual({ x: -50, y: 0, width: 200, height: 100, scale: 1 });
  });

  it('aligns the content in the free space', () => {
    expect(fitRect(WIDE, SQUARE, 'contain', 0, 0)).toMatchObject({ x: 0, y: 0 });
    expect(fitRect(WIDE, SQUARE, 'contain', 1, 1)).toMatchObject({ x: 0, y: 50 });
  });

  it('offsets the result by the container position', () => {
    expect(fitRect({ width: 10, height: 10 }, { x: 5, y: 5, width: 20, height: 40 })).toStrictEqual({
      x: 5,
      y: 15,
      width: 20,
      height: 20,
      scale: 2,
    });
  });

  it('gives a zero scale for an empty content', () => {
    expect(fitRect({ width: 0, height: 0 }, SQUARE).scale).toBe(0);
  });
});
