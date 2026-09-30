import { sleep } from './sleep';
import { TimeoutError } from './timeout-error';
import { withTimeout } from './with-timeout';

describe(withTimeout, () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('resolves with the promise value when in time', async () => {
    await expect(withTimeout(Promise.resolve(42), 100, 'Timed out')).resolves.toBe(42);
    expect(vi.getTimerCount()).toBe(0);
  });

  it('rejects with the promise error when in time', async () => {
    await expect(withTimeout(Promise.reject(new Error('Failed')), 100, 'Timed out')).rejects.toThrow('Failed');
  });

  it('rejects with a TimeoutError when too slow', async () => {
    await Promise.all([
      expect(withTimeout(sleep(1000, undefined), 100, 'Timed out')).rejects.toThrow(TimeoutError),
      vi.advanceTimersByTimeAsync(100),
    ]);
  });

  it('uses the custom message', async () => {
    await Promise.all([
      expect(withTimeout(sleep(1000, undefined), 100, 'Server too slow')).rejects.toThrow('Server too slow'),
      vi.advanceTimersByTimeAsync(100),
    ]);
  });
});
