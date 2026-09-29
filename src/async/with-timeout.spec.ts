import { sleep } from './sleep.ts';
import { TimeoutError } from './timeout-error.ts';
import { withTimeout } from './with-timeout.ts';

describe(withTimeout, () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('resolves with the promise value when in time', async () => {
    await expect(withTimeout(Promise.resolve(42), 100)).resolves.toBe(42);
    expect(vi.getTimerCount()).toBe(0);
  });

  it('rejects with the promise error when in time', async () => {
    await expect(withTimeout(Promise.reject(new Error('Failed')), 100)).rejects.toThrow('Failed');
  });

  it('rejects with a TimeoutError when too slow', async () => {
    await Promise.all([
      expect(withTimeout(sleep(1000), 100)).rejects.toThrow(TimeoutError),
      vi.advanceTimersByTimeAsync(100),
    ]);
  });

  it('uses the custom message', async () => {
    await Promise.all([
      expect(withTimeout(sleep(1000), 100, 'Server too slow')).rejects.toThrow('Server too slow'),
      vi.advanceTimersByTimeAsync(100),
    ]);
  });
});
