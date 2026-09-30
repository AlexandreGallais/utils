import { applyHysteresis } from './apply-hysteresis';

describe(applyHysteresis, () => {
  it.for([
    [95, false, true],
    [90, false, true],
    [87, false, false],
    [87, true, true],
    [85, true, false],
    [80, true, false],
  ] as const)('turns %s with state %s into %s', ([value, isOn, expected]) => {
    expect(applyHysteresis(value, isOn, 85, 90)).toBe(expected);
  });

  it('does not flicker around the high threshold', () => {
    let isOn = false;
    const states = [89, 91, 89, 88, 91, 86, 84].map((value) => {
      isOn = applyHysteresis(value, isOn, 85, 90);
      return isOn;
    });
    expect(states).toStrictEqual([false, true, true, true, true, true, false]);
  });

  it.for([
    [90, 90],
    [90, 85],
    [NaN, 90],
  ] as const)('throws a RangeError for thresholds %s and %s', ([low, high]) => {
    expect(() => applyHysteresis(0, false, low, high)).toThrow(RangeError);
  });
});
