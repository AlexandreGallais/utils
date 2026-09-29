import { observeResize } from './observe-resize.ts';
import { createFake } from './testing/create-fake.ts';
import { FakeObserver } from './testing/fake-observer.ts';

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
});
