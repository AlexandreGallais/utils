import { watchMediaQuery } from './watch-media-query.ts';

describe(watchMediaQuery, () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('reports the current state, then each change until stopped', () => {
    const list = Object.assign(new EventTarget(), { matches: true });
    const matchMedia = vi.fn<(query: string) => typeof list>(() => list);
    vi.stubGlobal('matchMedia', matchMedia);
    const onChange = vi.fn<(isMatching: boolean) => void>();
    const stop = watchMediaQuery('(max-width: 600px)', onChange);
    list.dispatchEvent(Object.assign(new Event('change'), { matches: false }));
    stop();
    list.dispatchEvent(Object.assign(new Event('change'), { matches: true }));
    expect(matchMedia).toHaveBeenCalledExactlyOnceWith('(max-width: 600px)');
    expect(onChange.mock.calls).toStrictEqual([[true], [false]]);
  });
});
