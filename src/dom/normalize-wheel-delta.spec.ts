import { normalizeWheelDelta } from './normalize-wheel-delta';

describe(normalizeWheelDelta, () => {
  it.for([
    { deltaMode: 0, deltaY: 53, expected: 53 },
    { deltaMode: 1, deltaY: 3, expected: 48 },
    { deltaMode: 2, deltaY: -1, expected: -800 },
  ])('converts $deltaY in mode $deltaMode to $expected px', ({ deltaMode, deltaY, expected }) => {
    expect(normalizeWheelDelta({ deltaMode, deltaY }, 800)).toBe(expected);
  });

  it('uses the given page height', () => {
    expect(normalizeWheelDelta({ deltaMode: 2, deltaY: 1 }, 300)).toBe(300);
  });

  it('takes a page of 800 px for null or undefined', () => {
    expect(normalizeWheelDelta({ deltaMode: 2, deltaY: 1 })).toBe(800);
    expect(normalizeWheelDelta({ deltaMode: 2, deltaY: 1 }, null)).toBe(800);
  });
});
