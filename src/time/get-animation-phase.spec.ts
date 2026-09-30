import { getAnimationPhase } from './get-animation-phase';

describe(getAnimationPhase, () => {
  it.for([
    [0, 0],
    [500, 0.25],
    [2000, 0],
    [3000, 0.5],
    [-500, 0.75],
    [-2000, 0],
  ] as const)('is at phase %s at %s ms', ([timeMs, expected]) => {
    expect(getAnimationPhase(timeMs, 2000)).toBe(expected);
  });

  it.for([0, -1, NaN, Infinity])('throws a RangeError for period %s', (periodMs) => {
    expect(() => getAnimationPhase(0, periodMs)).toThrow(RangeError);
  });
});
