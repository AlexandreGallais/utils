import { getSyncedAnimationDelay } from './get-synced-animation-delay';

describe(getSyncedAnimationDelay, () => {
  it.for([
    [0, 0],
    [250, -250],
    [1250, -250],
    [999, -999],
  ] as const)('delays by %s ms at %s ms', ([nowMs, expected]) => {
    expect(getSyncedAnimationDelay(1000, nowMs)).toBeCloseTo(expected, 9);
  });

  it('never returns -0', () => {
    expect(Object.is(getSyncedAnimationDelay(1000, 2000), 0)).toBe(true);
  });

  it('reads performance.now()', () => {
    vi.spyOn(performance, 'now').mockReturnValue(1300);
    expect(getSyncedAnimationDelay(1000, performance.now())).toBeCloseTo(-300, 9);
    vi.restoreAllMocks();
  });

  it('throws a RangeError for an invalid period', () => {
    expect(() => getSyncedAnimationDelay(0, 0)).toThrow(RangeError);
  });

  it('reads performance.now for null or undefined', () => {
    for (const delay of [getSyncedAnimationDelay(1000), getSyncedAnimationDelay(1000, null)]) {
      expect(delay).toBeLessThanOrEqual(0);
      expect(delay).toBeGreaterThan(-1000);
    }
  });
});
