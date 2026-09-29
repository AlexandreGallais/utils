import type { BarScale } from './bar-scale.ts';
import { valueRangeToRect } from './value-range-to-rect.ts';

const RECT = { x: 10, y: 20, width: 100, height: 200 };

function scale(direction: BarScale['direction']): BarScale {
  return { min: 0, max: 10, rect: RECT, direction };
}

describe(valueRangeToRect, () => {
  it.for([
    ['up', 8, 10, { x: 10, y: 20, width: 100, height: 40 }],
    ['up', 0, 2.5, { x: 10, y: 170, width: 100, height: 50 }],
    ['down', 0, 2.5, { x: 10, y: 20, width: 100, height: 50 }],
    ['right', 0, 2.5, { x: 10, y: 20, width: 25, height: 200 }],
    ['left', 0, 2.5, { x: 85, y: 20, width: 25, height: 200 }],
  ] as const)('covers %s bar values %s to %s', ([direction, from, to, expected]) => {
    expect(valueRangeToRect(from, to, scale(direction))).toStrictEqual(expected);
  });

  it('accepts the values in any order and cuts them to the scale', () => {
    expect(valueRangeToRect(12, 8, scale('up'))).toStrictEqual({ x: 10, y: 20, width: 100, height: 40 });
    expect(valueRangeToRect(-5, -1, scale('up'))).toStrictEqual({ x: 10, y: 220, width: 100, height: 0 });
  });
});
