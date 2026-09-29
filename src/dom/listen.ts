/**
 * The events a target can emit, by name, for the common DOM targets; any `Event` for the others.
 *
 * @template T - The event target.
 */
type EventMapOf<T extends EventTarget> = T extends Window
  ? WindowEventMap
  : T extends Document
    ? DocumentEventMap
    : T extends HTMLElement
      ? HTMLElementEventMap
      : T extends SVGElement
        ? SVGElementEventMap
        : T extends MediaQueryList
          ? MediaQueryListEventMap
          : Record<string, Event>;

/**
 * Adds an event listener and returns the function that removes it, with the event type inferred from the
 * target and the event name: the building block to feed signals from the DOM without RxJS `fromEvent`.
 * Pass the cleanup to `DestroyRef.onDestroy` or to the `onCleanup` of an effect.
 *
 * @template T - The target type, which selects the event map.
 * @template K - The event name.
 * @param target - The element, `window`, `document` or any `EventTarget`.
 * @param type - The event name, such as `'pointermove'`.
 * @param listener - Called with each event, typed from the name (`PointerEvent` for `'pointermove'`).
 * @param options - Standard listener options; `passive: true` for scroll and touch events.
 * @returns A function that removes the listener; calling it again does nothing.
 * @example
 * const width = signal(window.innerWidth);
 * destroyRef.onDestroy(listen(window, 'resize', () => width.set(window.innerWidth), { passive: true }));
 */
export function listen<T extends EventTarget, K extends keyof EventMapOf<T> & string>(
  target: T,
  type: K,
  listener: (event: EventMapOf<T>[K]) => void,
  options?: AddEventListenerOptions,
): () => void {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- the event map of `T` gives the type of `K` events.
  const handler = listener as EventListener;
  target.addEventListener(type, handler, options);
  return (): void => {
    target.removeEventListener(type, handler, options);
  };
}
