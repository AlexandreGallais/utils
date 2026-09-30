import type { EventMapOf } from './event-map-of';
import { listen } from './listen';

/**
 * Adds an event listener and returns the function that removes it, like `listen`, with the event type
 * inferred from the target and the event name.
 *
 * @template T - The target type, which selects the event map.
 * @template K - The event name.
 * @param target - The element, `window`, `document` or any `EventTarget`.
 * @param type - The event name, such as `'click'`.
 * @param listener - Called with each event, typed from the name.
 * @returns A function that removes the listener.
 * @simple No listener options (not passive, not once, bubbling phase).
 * @example
 * destroyRef.onDestroy(listenSimple(window, 'keydown', (event) => onKey(event.key)));
 */
export function listenSimple<T extends EventTarget, K extends keyof EventMapOf<T> & string>(
  target: T,
  type: K,
  listener: (event: EventMapOf<T>[K]) => void,
): () => void {
  return listen(target, type, listener, {});
}
