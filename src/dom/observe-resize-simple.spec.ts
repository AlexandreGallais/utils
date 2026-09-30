import { observeResizeSimple } from './observe-resize-simple';
import { createFake, FakeObserver } from './testing';

describe(observeResizeSimple, () => {
  beforeEach(() => {
    FakeObserver.reset();
    vi.stubGlobal('ResizeObserver', FakeObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('observes without options', () => {
    const element = createFake<Element>();
    observeResizeSimple(element, vi.fn<(entry: ResizeObserverEntry) => void>())();
    const [observer] = FakeObserver.instances;
    expect(observer?.observed).toStrictEqual([{ target: element, options: {} }]);
    expect(observer?.isDisconnected).toBe(true);
  });
});
