import { startBlinkSimple } from './start-blink-simple.ts';
import { FakeTickSource } from './testing/fake-tick-source.ts';

describe(startBlinkSimple, () => {
  it('blinks and rests on', () => {
    const clock = new FakeTickSource();
    const states: boolean[] = [];
    const stop = startBlinkSimple(clock, 1000, (isOn) => {
      states.push(isOn);
    });
    clock.tick(0, 600);
    stop();
    expect(states).toStrictEqual([false, true]);
  });
});
