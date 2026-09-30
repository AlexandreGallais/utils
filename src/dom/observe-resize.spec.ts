import { observeResize } from './observe-resize';
import { createFake, FakeObserver } from './testing';

describe(observeResize, () => {
  beforeEach(() => {
    FakeObserver.reset();
    vi.stubGlobal('ResizeObserver', FakeObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('calls back with each entry until stopped', () => {
    const element = createFake<Element>();
    const onResize = vi.fn<(entry: ResizeObserverEntry) => void>();
    const stop = observeResize(element, onResize, { box: 'border-box' });
    const [observer] = FakeObserver.instances;
    expect(observer?.observed).toStrictEqual([{ target: element, options: { box: 'border-box' } }]);
    const first = createFake<ResizeObserverEntry>({ target: element });
    const second = createFake<ResizeObserverEntry>({ target: element });
    observer?.emit([first, second]);
    expect(onResize.mock.calls).toStrictEqual([[first], [second]]);
    stop();
    expect(observer?.isDisconnected).toBe(true);
  });

  it('takes empty options for null or undefined', () => {
    const element = createFake<Element>();
    observeResize(element, () => undefined);
    observeResize(element, () => undefined, null);
    expect(FakeObserver.instances.map((observer) => observer.observed[0]?.options)).toStrictEqual([{}, {}]);
  });
});
