import { resizeRect } from './resize-rect.ts';

const BAR = { x: 0, y: 0, width: 20, height: 100 };

describe(resizeRect, () => {
  it.for([
    ['bottom', { x: 0, y: 70, width: 20, height: 30 }],
    ['top-left', { x: 0, y: 0, width: 20, height: 30 }],
    ['center', { x: 0, y: 35, width: 20, height: 30 }],
  ] as const)('keeps the %s anchor in place', ([anchor, expected]) => {
    expect(resizeRect(BAR, { width: 20, height: 30 }, anchor)).toStrictEqual(expected);
  });

  it('keeps the top-left corner by default', () => {
    expect(resizeRect({ x: 5, y: 5, width: 10, height: 10 }, { width: 4, height: 2 })).toStrictEqual({
      x: 5,
      y: 5,
      width: 4,
      height: 2,
    });
  });
});
