import type { BarScale } from './bar-scale.ts';
import { valueToBarPosition } from './value-to-bar-position.ts';

const RECT = { x: 10, y: 20, width: 100, height: 200 };

function scale(direction: BarScale['direction']): BarScale {
  return { min: 0, max: 10, rect: RECT, direction };
}

describe(valueToBarPosition, () => {
  it.for([
    ['up', 0, 220],
    ['up', 2.5, 170],
    ['up', 10, 20],
    ['down', 2.5, 70],
    ['right', 2.5, 35],
    ['left', 2.5, 85],
  ] as const)('places %s bar value %s at %s', ([direction, value, expected]) => {
    expect(valueToBarPosition(value, scale(direction))).toBe(expected);
  });

  it('stops at the ends unless extrapolation is asked', () => {
    expect(valueToBarPosition(20, scale('up'))).toBe(20);
    expect(valueToBarPosition(-5, scale('right'))).toBe(10);
    expect(valueToBarPosition(20, scale('up'), false)).toBe(-180);
  });
});
