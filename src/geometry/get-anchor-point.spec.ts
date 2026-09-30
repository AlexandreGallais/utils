import { getAnchorPoint } from './get-anchor-point';

const BOX = { x: 10, y: 20, width: 100, height: 50 };

describe(getAnchorPoint, () => {
  it.for([
    ['top-left', { x: 10, y: 20 }],
    ['top', { x: 60, y: 20 }],
    ['top-right', { x: 110, y: 20 }],
    ['left', { x: 10, y: 45 }],
    ['center', { x: 60, y: 45 }],
    ['right', { x: 110, y: 45 }],
    ['bottom-left', { x: 10, y: 70 }],
    ['bottom', { x: 60, y: 70 }],
    ['bottom-right', { x: 110, y: 70 }],
  ] as const)('finds the %s point', ([anchor, expected]) => {
    expect(getAnchorPoint(BOX, anchor)).toStrictEqual(expected);
  });

  it('takes the defaults for null or undefined', () => {
    expect(getAnchorPoint({ x: 10, y: 20, width: 100, height: 50 })).toStrictEqual(
      getAnchorPoint({ x: 10, y: 20, width: 100, height: 50 }, 'center'),
    );
    expect(getAnchorPoint({ x: 10, y: 20, width: 100, height: 50 }, null)).toStrictEqual(
      getAnchorPoint({ x: 10, y: 20, width: 100, height: 50 }, 'center'),
    );
  });
});
