import { getWheelZoomFactor } from './get-wheel-zoom-factor.ts';

describe(getWheelZoomFactor, () => {
  it('zooms in upwards and out downwards', () => {
    expect(getWheelZoomFactor(-100, 0.002)).toBeGreaterThan(1);
    expect(getWheelZoomFactor(100, 0.002)).toBeLessThan(1);
    expect(getWheelZoomFactor(0, 0.002)).toBe(1);
  });

  it('comes back to the same zoom after opposite scrolls', () => {
    expect(getWheelZoomFactor(-120, 0.002) * getWheelZoomFactor(120, 0.002)).toBe(1);
  });

  it('uses the sensitivity', () => {
    expect(getWheelZoomFactor(-1, Math.LN2)).toBe(2);
  });
});
