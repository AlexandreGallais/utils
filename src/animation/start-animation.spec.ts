import { easeInQuad } from './ease-in-quad';
import { startAnimation } from './start-animation';
import { FakeTickSource } from './testing';

describe(startAnimation, () => {
  let clock: FakeTickSource;

  beforeEach(() => {
    clock = new FakeTickSource();
  });

  it('reports the progress at each tick and completes', () => {
    const frames: number[] = [];
    const onComplete = vi.fn<() => void>();
    startAnimation(clock, {
      durationMs: 100,
      onFrame: (progress) => {
        frames.push(progress);
      },
      onComplete,
    });
    for (const deltaMs of [0, 50, 40, 40, 40]) {
      clock.tick(deltaMs);
    }
    expect(frames).toStrictEqual([0, 0.5, 0.9, 1]);
    expect(onComplete).toHaveBeenCalledOnce();
    expect(clock.listenerCount).toBe(0);
  });

  it('applies the easing and passes the elapsed time', () => {
    const onFrame = vi.fn<(progress: number, elapsedMs: number) => void>();
    startAnimation(clock, { durationMs: 100, easing: easeInQuad, onFrame });
    clock.tick(50);
    expect(onFrame).toHaveBeenLastCalledWith(0.25, 50, expect.objectContaining({ deltaMs: 50 }));
  });

  it('stops without completing', () => {
    const onComplete = vi.fn<() => void>();
    const onFrame = vi.fn<(progress: number) => void>();
    const stop = startAnimation(clock, { durationMs: 100, onFrame, onComplete });
    clock.tick(10);
    stop();
    stop();
    clock.tick(200);
    expect(onFrame).toHaveBeenCalledOnce();
    expect(onComplete).not.toHaveBeenCalled();
  });

  it('runs an endless animation with the elapsed time', () => {
    const onFrame = vi.fn<(progress: number, elapsedMs: number) => void>();
    const stop = startAnimation(clock, { durationMs: Infinity, onFrame });
    clock.tick(1000);
    clock.tick(1000);
    expect(onFrame).toHaveBeenLastCalledWith(0, 2000, expect.anything());
    stop();
  });

  it('completes at once with a zero duration', () => {
    const onFrame = vi.fn<(progress: number) => void>();
    startAnimation(clock, { durationMs: 0, onFrame });
    clock.tick(16);
    expect(onFrame).toHaveBeenCalledExactlyOnceWith(1, 0, expect.anything());
  });
});
