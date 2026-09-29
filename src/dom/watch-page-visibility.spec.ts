import { watchPageVisibility } from './watch-page-visibility.ts';

describe(watchPageVisibility, () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('reports the current state, then each change until stopped', () => {
    const fakeDocument = Object.assign(new EventTarget(), { visibilityState: 'visible' });
    vi.stubGlobal('document', fakeDocument);
    const onChange = vi.fn<(isVisible: boolean) => void>();
    const stop = watchPageVisibility(onChange);
    fakeDocument.visibilityState = 'hidden';
    fakeDocument.dispatchEvent(new Event('visibilitychange'));
    stop();
    fakeDocument.visibilityState = 'visible';
    fakeDocument.dispatchEvent(new Event('visibilitychange'));
    expect(onChange.mock.calls).toStrictEqual([[true], [false]]);
  });
});
