import { resizeRect } from './resize-rect';

const BAR = { x: 0, y: 0, width: 20, height: 100 };

describe(resizeRect, () => {
  it.for([
    ['bottom', { x: 0, y: 70, width: 20, height: 30 }],
    ['top-left', { x: 0, y: 0, width: 20, height: 30 }],
    ['center', { x: 0, y: 35, width: 20, height: 30 }],
  ] as const)('keeps the %s anchor in place', ([anchor, expected]) => {
    expect(resizeRect(BAR, { width: 20, height: 30 }, anchor)).toStrictEqual(expected);
  });

  it('keeps the top-left corner', () => {
    expect(resizeRect({ x: 5, y: 5, width: 10, height: 10 }, { width: 4, height: 2 }, 'top-left')).toStrictEqual({
      x: 5,
      y: 5,
      width: 4,
      height: 2,
    });
  });

  it('takes the defaults for null or undefined', () => {
    expect(resizeRect({ x: 10, y: 20, width: 100, height: 50 }, { width: 50, height: 20 })).toStrictEqual(
      resizeRect({ x: 10, y: 20, width: 100, height: 50 }, { width: 50, height: 20 }, 'center'),
    );
    expect(resizeRect({ x: 10, y: 20, width: 100, height: 50 }, { width: 50, height: 20 }, null)).toStrictEqual(
      resizeRect({ x: 10, y: 20, width: 100, height: 50 }, { width: 50, height: 20 }, 'center'),
    );
  });
});
