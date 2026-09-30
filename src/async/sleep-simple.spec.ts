import { sleepSimple } from './sleep-simple';

describe(sleepSimple, () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('resolves after the delay', async () => {
    const promise = sleepSimple(100);
    await vi.advanceTimersByTimeAsync(100);
    await expect(promise).resolves.toBeUndefined();
  });
});
