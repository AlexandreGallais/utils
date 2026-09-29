import { moveAngleTowards } from './move-angle-towards.ts';

describe(moveAngleTowards, () => {
  it.for([
    { current: 350, target: 10, rate: 10, deltaMs: 1000, expected: 0 },
    { current: 10, target: 350, rate: 10, deltaMs: 500, expected: 5 },
    { current: 350, target: 10, rate: 100, deltaMs: 1000, expected: 10 },
    { current: 90, target: 180, rate: 45, deltaMs: 1000, expected: 135 },
  ])('turns from $current to $target at $rate°/s for $deltaMs ms', ({ current, target, rate, deltaMs, expected }) => {
    expect(moveAngleTowards(current, target, rate, deltaMs)).toBe(expected);
  });
});
