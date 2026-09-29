import { startBlink } from './start-blink.ts';
import { FakeTickSource } from './testing/fake-tick-source.ts';

describe(startBlink, () => {
  let clock: FakeTickSource;

  beforeEach(() => {
    clock = new FakeTickSource();
  });

  it('alternates on the shared timeline and reports changes only', () => {
    const states: boolean[] = [];
    startBlink(
      clock,
      1000,
      (isOn) => {
        states.push(isOn);
      },
      {},
    );
    for (const timestamp of [100, 200, 600, 900, 1100, 1200]) {
      clock.tick(0, timestamp);
    }
    expect(states).toStrictEqual([true, false, true]);
  });

  it('is in phase with another blink started later', () => {
    const first = vi.fn<(isOn: boolean) => void>();
    const second = vi.fn<(isOn: boolean) => void>();
    startBlink(clock, 1000, first, {});
    clock.tick(0, 100);
    startBlink(clock, 1000, second, {});
    clock.tick(0, 700);
    expect(first).toHaveBeenLastCalledWith(false);
    expect(second).toHaveBeenLastCalledWith(false);
  });

  it('applies the rest state once when stopped', () => {
    const onChange = vi.fn<(isOn: boolean) => void>();
    const stop = startBlink(clock, 1000, onChange, { restState: false });
    clock.tick(0, 100);
    stop();
    stop();
    clock.tick(0, 700);
    expect(onChange.mock.calls).toStrictEqual([[true], [false]]);
    expect(clock.listenerCount).toBe(0);
  });

  it('applies the duty cycle and the default rest state', () => {
    const onChange = vi.fn<(isOn: boolean) => void>();
    const stop = startBlink(clock, 1000, onChange, { dutyCycle: 0.2 });
    clock.tick(0, 300);
    stop();
    expect(onChange.mock.calls).toStrictEqual([[false], [true]]);
  });
});
