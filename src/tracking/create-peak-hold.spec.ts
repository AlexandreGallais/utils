import { createPeakHold } from './create-peak-hold';

describe(createPeakHold, () => {
  it('holds the highest value, then jumps to the current value', () => {
    const peak = createPeakHold(1000, Infinity);
    expect(peak.value).toBeNaN();
    expect(peak.update(5, 0)).toBe(5);
    expect(peak.update(9, 100)).toBe(9);
    expect(peak.update(3, 1100)).toBe(9);
    expect(peak.update(3, 1101)).toBe(3);
  });

  it('falls back at a limited speed after the hold', () => {
    const peak = createPeakHold(1000, 10);
    peak.update(100, 0);
    peak.update(0, 500);
    // The fall starts at 1000 ms: 0.5 s at 10 units/s.
    expect(peak.update(0, 1500)).toBe(95);
    expect(peak.update(0, 2000)).toBe(90);
  });

  it('takes a new peak during the fall', () => {
    const peak = createPeakHold(0, 10);
    peak.update(100, 0);
    peak.update(0, 1000);
    expect(peak.update(95, 1100)).toBe(95);
  });

  it('starts over after reset', () => {
    const peak = createPeakHold(1000, Infinity);
    peak.update(100, 0);
    peak.reset();
    expect(peak.update(1, 10)).toBe(1);
  });

  it.for([
    [-1, 1],
    [Infinity, 1],
    [0, 0],
    [0, NaN],
  ])('throws a RangeError for hold %s and decay %s', ([holdMs = 0, decayPerSecond = 0]) => {
    expect(() => createPeakHold(holdMs, decayPerSecond)).toThrow(RangeError);
  });
});
