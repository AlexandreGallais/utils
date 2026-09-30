import { createStaleDetectorSimple } from './create-stale-detector-simple';

describe(createStaleDetectorSimple, () => {
  it('is fresh right after an update', () => {
    const detector = createStaleDetectorSimple(60_000);
    expect(detector.isStale()).toBe(true);
    detector.update();
    expect(detector.isStale()).toBe(false);
  });
});
