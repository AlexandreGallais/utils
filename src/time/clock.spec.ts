import { Clock } from './clock.ts';
import type { ClockTick } from './clock-tick.ts';

describe(Clock, () => {
  let time: number;
  let frameCallbacks: Map<number, FrameRequestCallback>;
  let nextFrameId: number;

  function now(): number {
    return time;
  }

  function runFrame(elapsedMs = 16): void {
    time += elapsedMs;
    const callbacks = [...frameCallbacks.values()];
    frameCallbacks.clear();
    for (const callback of callbacks) {
      callback(time);
    }
  }

  beforeEach(() => {
    time = 1000;
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
    vi.useRealTimers();
  });

  it('starts with the first subscriber and stops with the last one', () => {
    const clock = new Clock({ now });
    expect(clock.isRunning).toBe(false);
    const unsubscribe = clock.subscribe(vi.fn<(tick: ClockTick) => void>());
    expect(clock.isRunning).toBe(true);
    unsubscribe();
    unsubscribe();
    expect(clock.isRunning).toBe(false);
    expect(frameCallbacks.size).toBe(0);
  });

  it('shares one timer and one tick between subscribers', () => {
    const clock = new Clock({ now });
    const first = vi.fn<(tick: ClockTick) => void>();
    const second = vi.fn<(tick: ClockTick) => void>();
    clock.subscribe(first);
    clock.subscribe(second);
    runFrame();
    expect(frameCallbacks.size).toBe(1);
    expect(first.mock.calls[0]?.[0]).toBe(second.mock.calls[0]?.[0]);
  });

  it('measures simulated time with the time scale', () => {
    const clock = new Clock({ now });
    const ticks: ClockTick[] = [];
    clock.subscribe((tick) => {
      ticks.push(tick);
    });
    runFrame(10);
    runFrame(20);
    clock.timeScale = 2;
    expect(clock.timeScale).toBe(2);
    runFrame(10);
    expect(ticks.map((tick) => tick.deltaMs)).toStrictEqual([0, 20, 20]);
    expect(ticks.at(-1)).toStrictEqual({ timestamp: 1040, deltaMs: 20, elapsedMs: 40, frame: 3 });
  });

  it('freezes simulated time while paused', () => {
    const clock = new Clock({ now });
    const ticks: ClockTick[] = [];
    clock.subscribe((tick) => {
      ticks.push(tick);
    });
    runFrame();
    clock.pause();
    runFrame(50);
    expect(clock.isPaused).toBe(true);
    clock.resume();
    runFrame(50);
    expect(ticks.map((tick) => tick.deltaMs)).toStrictEqual([0, 0, 50]);
  });

  it('calls a cadenced listener once per slot of the timeline', () => {
    const clock = new Clock({ now });
    const listener = vi.fn<(tick: ClockTick) => void>();
    clock.subscribe(listener, 100);
    for (let frame = 0; frame < 20; frame++) {
      runFrame(16);
    }
    // 320 ms from 1016 to 1320: slots 10, 11, 12 and 13.
    expect(listener).toHaveBeenCalledTimes(4);
  });

  it('restarts without counting the stopped time', () => {
    const clock = new Clock({ now });
    const ticks: ClockTick[] = [];
    clock.subscribe(vi.fn<(tick: ClockTick) => void>())();
    time += 5000;
    clock.subscribe((tick) => {
      ticks.push(tick);
    });
    runFrame(10);
    expect(ticks[0]?.deltaMs).toBe(0);
  });

  it('ticks on an interval in interval mode', () => {
    vi.useFakeTimers();
    const clock = new Clock({ mode: 'interval', intervalMs: 50, now: (): number => Date.now() });
    const listener = vi.fn<(tick: ClockTick) => void>();
    const unsubscribe = clock.subscribe(listener);
    vi.advanceTimersByTime(200);
    unsubscribe();
    vi.advanceTimersByTime(200);
    expect(listener).toHaveBeenCalledTimes(4);
    expect(listener.mock.calls[1]?.[0].deltaMs).toBe(50);
  });

  it('uses performance.now() by default', () => {
    vi.spyOn(performance, 'now').mockReturnValue(42);
    const clock = new Clock();
    const listener = vi.fn<(tick: ClockTick) => void>();
    clock.subscribe(listener);
    runFrame();
    expect(listener.mock.calls[0]?.[0].timestamp).toBe(42);
    vi.restoreAllMocks();
  });

  it.for([-1, NaN, Infinity])('rejects the time scale %s', (timeScale) => {
    const clock = new Clock({ now });
    expect(() => {
      clock.timeScale = timeScale;
    }).toThrow(RangeError);
  });

  it.for([0, -1, NaN])('throws a RangeError for interval %s', (intervalMs) => {
    expect(() => new Clock({ mode: 'interval', intervalMs })).toThrow(RangeError);
  });
});
