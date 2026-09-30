import { whenIdle } from './when-idle';

describe(whenIdle, () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('uses requestIdleCallback when available', () => {
    const callbacks = new Map<number, IdleRequestCallback>();
    const request = vi.fn<(callback: IdleRequestCallback, options?: IdleRequestOptions) => number>((callback) => {
      callbacks.set(callbacks.size + 1, callback);
      return callbacks.size;
    });
    const cancel = vi.fn<(handle: number) => void>();
    vi.stubGlobal('requestIdleCallback', request);
    vi.stubGlobal('cancelIdleCallback', cancel);
    const task = vi.fn<() => void>();

    whenIdle(task, 500);
    expect(request).toHaveBeenLastCalledWith(expect.any(Function), { timeout: 500 });
    callbacks.get(1)?.({ didTimeout: false, timeRemaining: () => 10 });
    expect(task).toHaveBeenCalledOnce();

    whenIdle(task, 1000)();
    expect(request).toHaveBeenLastCalledWith(expect.any(Function), { timeout: 1000 });
    expect(cancel).toHaveBeenCalledExactlyOnceWith(2);
  });

  it('falls back to a timeout', () => {
    vi.useFakeTimers();
    vi.stubGlobal('requestIdleCallback', undefined);
    const task = vi.fn<() => void>();
    whenIdle(task, 1000);
    const cancelled = vi.fn<() => void>();
    whenIdle(cancelled, 1000)();
    vi.runAllTimers();
    expect(task).toHaveBeenCalledOnce();
    expect(cancelled).not.toHaveBeenCalled();
  });
});
