import { insetRect } from './inset-rect';

const RECT = { x: 0, y: 0, width: 100, height: 50 };

describe(insetRect, () => {
  it('applies the same margin on every side', () => {
    expect(insetRect(RECT, 10)).toStrictEqual({ x: 10, y: 10, width: 80, height: 30 });
  });

  it('applies a margin per side', () => {
    expect(insetRect(RECT, { top: 5, right: 0, bottom: 15, left: 20 })).toStrictEqual({
      x: 20,
      y: 5,
      width: 80,
      height: 30,
    });
  });

  it('grows with a negative margin', () => {
    expect(insetRect(RECT, -5)).toStrictEqual({ x: -5, y: -5, width: 110, height: 60 });
  });

  it('collapses an over-shrunk side to zero at its center', () => {
    expect(insetRect(RECT, 30)).toStrictEqual({ x: 30, y: 25, width: 40, height: 0 });
    expect(insetRect(RECT, { top: 0, right: 80, bottom: 0, left: 40 })).toStrictEqual({
      x: 30,
      y: 0,
      width: 0,
      height: 50,
    });
  });
});
