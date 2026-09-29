import { getSyncedAnimationDelaySimple } from './get-synced-animation-delay-simple.ts';

describe(getSyncedAnimationDelaySimple, () => {
  it('stays within one period', () => {
    const delay = getSyncedAnimationDelaySimple(1000);
    expect(delay).toBeLessThanOrEqual(0);
    expect(delay).toBeGreaterThan(-1000);
  });
});
