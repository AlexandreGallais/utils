import { createStaleDetector } from './create-stale-detector';

describe(createStaleDetector, () => {
  it('is stale until the first update', () => {
    const detector = createStaleDetector(100, () => 0);
    expect(detector.isStale()).toBe(true);
    expect(detector.getAgeMs()).toBe(Infinity);
  });

  it('turns stale once the maximum age is exceeded', () => {
    let time = 1000;
    const detector = createStaleDetector(100, () => time);
    detector.update();
    time = 1100;
    expect(detector.isStale()).toBe(false);
    expect(detector.getAgeMs()).toBe(100);
    time = 1101;
    expect(detector.isStale()).toBe(true);
    detector.update();
    expect(detector.isStale()).toBe(false);
  });

  it('reads performance.now', () => {
    const detector = createStaleDetector(60_000, () => performance.now());
    detector.update();
    expect(detector.isStale()).toBe(false);
  });

  it.for([0, -1, Infinity, NaN])('throws a RangeError for a maximum age of %s', (maxAgeMs) => {
    expect(() => createStaleDetector(maxAgeMs, () => performance.now())).toThrow(RangeError);
  });

  it('reads performance.now for null or undefined', () => {
    for (const detector of [createStaleDetector(60_000), createStaleDetector(60_000, null)]) {
      detector.update();
      expect(detector.isStale()).toBe(false);
    }
  });
});
