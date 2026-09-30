import { rafThrottle } from './raf-throttle';

describe(rafThrottle, () => {
  let frameCallbacks: Map<number, FrameRequestCallback>;
  let nextFrameId: number;

  function runFrame(): void {
    const callbacks = [...frameCallbacks.values()];
    frameCallbacks.clear();
    for (const callback of callbacks) {
      callback(0);
    }
  }

  beforeEach(() => {
    frameCallbacks = new Map();
    nextFrameId = 1;
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback): number => {
      const id = nextFrameId;
      nextFrameId += 1;
      frameCallbacks.set(id, callback);
      return id;
    });
    vi.stubGlobal('cancelAnimationFrame', (id: number): void => {
      frameCallbacks.delete(id);
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('runs once per frame with the latest arguments', () => {
    const callback = vi.fn<(value: number) => void>();
    const throttled = rafThrottle(callback);
    throttled(1);
    throttled(2);
    throttled(3);
    expect(callback).not.toHaveBeenCalled();
    runFrame();
    expect(callback).toHaveBeenCalledExactlyOnceWith(3);
  });

  it('requests a new frame after running', () => {
    const callback = vi.fn<(value: number) => void>();
    const throttled = rafThrottle(callback);
    throttled(1);
    runFrame();
    throttled(2);
    runFrame();
    expect(callback).toHaveBeenCalledTimes(2);
    expect(frameCallbacks.size).toBe(0);
  });

  it('drops the pending call on cancel', () => {
    const callback = vi.fn<(value: number) => void>();
    const throttled = rafThrottle(callback);
    throttled(1);
    throttled.cancel();
    throttled.cancel();
    runFrame();
    expect(callback).not.toHaveBeenCalled();
  });

  it('runs the pending call on flush, once', () => {
    const callback = vi.fn<(value: number) => void>();
    const throttled = rafThrottle(callback);
    throttled(1);
    throttled.flush();
    throttled.flush();
    runFrame();
    expect(callback).toHaveBeenCalledExactlyOnceWith(1);
  });
});
