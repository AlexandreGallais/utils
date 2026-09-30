import { createPeakHoldSimple } from './create-peak-hold-simple';

describe(createPeakHoldSimple, () => {
  it('drops at once after the hold', () => {
    const peak = createPeakHoldSimple(100);
    peak.update(9, 0);
    expect(peak.update(3, 101)).toBe(3);
  });
});
