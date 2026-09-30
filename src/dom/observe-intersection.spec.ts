import { observeIntersection } from './observe-intersection';
import { createFake, FakeObserver } from './testing';

describe(observeIntersection, () => {
  beforeEach(() => {
    FakeObserver.reset();
    vi.stubGlobal('IntersectionObserver', FakeObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('calls back with the visibility until stopped', () => {
    const element = createFake<Element>();
    const onChange = vi.fn<(isIntersecting: boolean, entry: IntersectionObserverEntry) => void>();
    const stop = observeIntersection(element, onChange, { threshold: 0.5 });
    const [observer] = FakeObserver.instances;
    expect(observer?.options).toStrictEqual({ threshold: 0.5 });
    expect(observer?.observed).toStrictEqual([{ target: element, options: undefined }]);
    const entry = createFake<IntersectionObserverEntry>({ isIntersecting: true });
    observer?.emit([entry]);
    expect(onChange).toHaveBeenCalledExactlyOnceWith(true, entry);
    stop();
    expect(observer?.isDisconnected).toBe(true);
  });

  it('takes empty options for null or undefined', () => {
    const element = createFake<Element>();
    observeIntersection(element, () => undefined);
    observeIntersection(element, () => undefined, null);
    expect(FakeObserver.instances.map((observer) => observer.options)).toStrictEqual([{}, {}]);
  });
});
