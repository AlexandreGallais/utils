import { getWheelZoomFactorSimple } from './get-wheel-zoom-factor-simple.ts';

describe(getWheelZoomFactorSimple, () => {
  it('zooms in when scrolling up', () => {
    expect(getWheelZoomFactorSimple(-100)).toBeCloseTo(Math.exp(0.2), 12);
  });
});
