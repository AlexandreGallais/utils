import { linear } from './linear';
import { startTween } from './start-tween';
import { FakeTickSource } from './testing';

describe(startTween, () => {
  let clock: FakeTickSource;

  beforeEach(() => {
    clock = new FakeTickSource();
  });

  it('moves the value from start to end', () => {
    const values: number[] = [];
    const onComplete = vi.fn<() => void>();
    startTween(clock, {
      from: 10,
      to: 20,
      durationMs: 100,
      easing: linear,
      onUpdate: (value) => {
        values.push(value);
      },
      onComplete,
    });
    for (const deltaMs of [0, 25, 50, 50]) {
      clock.tick(deltaMs);
    }
    expect(values).toStrictEqual([10, 12.5, 17.5, 20]);
    expect(onComplete).toHaveBeenCalledOnce();
  });

  it('eases out by default', () => {
    const onUpdate = vi.fn<(value: number) => void>();
    startTween(clock, { from: 0, to: 100, durationMs: 100, onUpdate });
    clock.tick(50);
    expect(onUpdate).toHaveBeenLastCalledWith(75);
  });

  it('stops where it is', () => {
    const onUpdate = vi.fn<(value: number) => void>();
    const stop = startTween(clock, { from: 0, to: 100, durationMs: 100, onUpdate, easing: linear });
    clock.tick(30);
    stop();
    clock.tick(100);
    expect(onUpdate).toHaveBeenCalledExactlyOnceWith(30);
  });
});
