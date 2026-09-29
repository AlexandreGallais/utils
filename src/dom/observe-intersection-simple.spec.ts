import { observeIntersectionSimple } from './observe-intersection-simple.ts';
import { createFake } from './testing/create-fake.ts';
import { FakeObserver } from './testing/fake-observer.ts';

describe(observeIntersectionSimple, () => {
  beforeEach(() => {
    FakeObserver.reset();
    vi.stubGlobal('IntersectionObserver', FakeObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('observes against the viewport', () => {
    observeIntersectionSimple(createFake<Element>(), vi.fn<(isIntersecting: boolean) => void>())();
    const [observer] = FakeObserver.instances;
    expect(observer?.options).toStrictEqual({});
    expect(observer?.isDisconnected).toBe(true);
  });
});
