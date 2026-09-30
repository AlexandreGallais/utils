import { listenSimple } from './listen-simple';

describe(listenSimple, () => {
  it('listens until the cleanup runs', () => {
    const target = new EventTarget();
    const listener = vi.fn<(event: Event) => void>();
    const stop = listenSimple(target, 'ping', listener);
    target.dispatchEvent(new Event('ping'));
    stop();
    target.dispatchEvent(new Event('ping'));
    expect(listener).toHaveBeenCalledOnce();
  });
});
