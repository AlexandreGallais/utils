import { normalizeWheelDeltaSimple } from './normalize-wheel-delta-simple';

describe(normalizeWheelDeltaSimple, () => {
  it('converts pages with 800 px', () => {
    expect(normalizeWheelDeltaSimple({ deltaMode: 2, deltaY: 1 })).toBe(800);
    expect(normalizeWheelDeltaSimple({ deltaMode: 0, deltaY: 53 })).toBe(53);
  });
});
