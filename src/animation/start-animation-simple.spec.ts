import { startAnimationSimple } from './start-animation-simple.ts';
import { FakeTickSource } from './testing/fake-tick-source.ts';

describe(startAnimationSimple, () => {
  it('reports a linear progress', () => {
    const clock = new FakeTickSource();
    const progresses: number[] = [];
    startAnimationSimple(clock, 100, (progress) => {
      progresses.push(progress);
    });
    clock.tick(50, 50);
    clock.tick(50, 100);
    expect(progresses).toStrictEqual([0.5, 1]);
  });
});
