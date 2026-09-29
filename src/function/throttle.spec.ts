import { throttle } from './throttle.ts';

describe(throttle, () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('runs the first call immediately, then one trailing call with the latest arguments', () => {
    const callback = vi.fn<(value: number) => void>();
    const throttled = throttle(callback, 100);
    throttled(1);
    throttled(2);
    throttled(3);
    expect(callback).toHaveBeenCalledExactlyOnceWith(1);
    vi.advanceTimersByTime(100);
    expect(callback).toHaveBeenLastCalledWith(3);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('limits a high-frequency source to one call per interval', () => {
    const callback = vi.fn<(value: number) => void>();
    const throttled = throttle(callback, 100);
    for (let tick = 0; tick < 1000; tick++) {
      throttled(tick);
      vi.advanceTimersByTime(1);
    }
    // 1 000 calls over 1 000 ms: runs at 0, 100, …, 1 000 ms.
    expect(callback).toHaveBeenCalledTimes(11);
  });

  it('runs immediately again after a quiet interval', () => {
    const callback = vi.fn<(value: number) => void>();
    const throttled = throttle(callback, 100);
    throttled(1);
    vi.advanceTimersByTime(150);
    throttled(2);
    expect(callback).toHaveBeenLastCalledWith(2);
  });

  it('drops the pending call on cancel and resets the interval', () => {
    const callback = vi.fn<(value: number) => void>();
    const throttled = throttle(callback, 100);
    throttled(1);
    throttled(2);
    throttled.cancel();
    vi.advanceTimersByTime(100);
    expect(callback).toHaveBeenCalledOnce();
    throttled(3);
    expect(callback).toHaveBeenLastCalledWith(3);
  });

  it('runs the pending call on flush', () => {
    const callback = vi.fn<(value: number) => void>();
    const throttled = throttle(callback, 100);
    throttled(1);
    throttled(2);
    throttled.flush();
    expect(callback).toHaveBeenLastCalledWith(2);
    throttled.flush();
    expect(callback).toHaveBeenCalledTimes(2);
  });
});
