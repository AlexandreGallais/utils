import { sleep } from './sleep.ts';

describe(sleep, () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('resolves after the delay', async () => {
    const onResolved = vi.fn<() => void>();
    async function sleepThenNotify(): Promise<void> {
      await sleep(100);
      onResolved();
    }
    const promise = sleepThenNotify();
    await vi.advanceTimersByTimeAsync(99);
    expect(onResolved).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    await promise;
    expect(onResolved).toHaveBeenCalledOnce();
  });

  it('rejects when the signal is aborted, and clears the timer', async () => {
    const controller = new AbortController();
    const promise = sleep(100, controller.signal);
    controller.abort();
    await expect(promise).rejects.toThrow(expect.objectContaining({ name: 'AbortError' }));
    expect(vi.getTimerCount()).toBe(0);
  });

  it('rejects at once when the signal is already aborted', async () => {
    await expect(sleep(100, AbortSignal.abort(new Error('Stopped')))).rejects.toThrow('Stopped');
    expect(vi.getTimerCount()).toBe(0);
  });

  it('wraps a non-error abort reason', async () => {
    const controller = new AbortController();
    const promise = sleep(100, controller.signal);
    controller.abort('cancelled');
    await expect(promise).rejects.toThrow('cancelled');
  });

  it('removes its abort listener once resolved', async () => {
    const controller = new AbortController();
    const removeListener = vi.spyOn(controller.signal, 'removeEventListener');
    const promise = sleep(10, controller.signal);
    await vi.advanceTimersByTimeAsync(10);
    await promise;
    expect(removeListener).toHaveBeenCalledOnce();
  });
});
