import { listen } from './listen';

describe(listen, () => {
  it('calls the listener until the cleanup runs', () => {
    const target = new EventTarget();
    const listener = vi.fn<(event: Event) => void>();
    const stop = listen(target, 'ping', listener, {});
    const event = new Event('ping');
    target.dispatchEvent(event);
    stop();
    stop();
    target.dispatchEvent(new Event('ping'));
    expect(listener).toHaveBeenCalledExactlyOnceWith(event);
  });

  it('passes the options', () => {
    const target = new EventTarget();
    const listener = vi.fn<(event: Event) => void>();
    listen(target, 'ping', listener, { once: true });
    target.dispatchEvent(new Event('ping'));
    target.dispatchEvent(new Event('ping'));
    expect(listener).toHaveBeenCalledOnce();
  });

  it('removes a capture listener', () => {
    const target = new EventTarget();
    const listener = vi.fn<(event: Event) => void>();
    listen(target, 'ping', listener, { capture: true })();
    target.dispatchEvent(new Event('ping'));
    expect(listener).not.toHaveBeenCalled();
  });

  it('infers the event type from the target', () => {
    expectTypeOf(listen<Window, 'keydown'>)
      .parameter(2)
      .parameter(0)
      .toEqualTypeOf<KeyboardEvent>();
    expectTypeOf(listen<HTMLElement, 'pointermove'>)
      .parameter(2)
      .parameter(0)
      .toEqualTypeOf<PointerEvent>();
    expectTypeOf(listen<EventTarget, 'custom'>)
      .parameter(2)
      .parameter(0)
      .toEqualTypeOf<Event>();
  });
});
