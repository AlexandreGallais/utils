import type { Emitter } from './emitter.ts';

/**
 * Creates a small typed event emitter: event names and payload types are checked by TypeScript. A listener
 * added or removed during an emission takes effect from the next emission.
 *
 * @template Events - Map of event names to payload types.
 * @returns An emitter with `on`, `once`, `emit` and `clear`.
 * @example
 * const events = createEmitter<{ alarm: { id: string }; reset: undefined }>();
 * const off = events.on('alarm', ({ id }) => highlight(id));
 * events.emit('alarm', { id: 'P-12' });
 * off();
 */
export function createEmitter<Events extends Record<string, unknown>>(): Emitter<Events> {
  const listeners: { [K in keyof Events]?: Set<(payload: Events[K]) => void> } = {};

  function listenersOf<K extends keyof Events>(event: K): Set<(payload: Events[K]) => void> | undefined {
    // `hasOwn`: an event named like an `Object.prototype` member is not mistaken for a listener set.
    return Object.hasOwn(listeners, event) ? listeners[event] : undefined;
  }

  function on<K extends keyof Events>(event: K, listener: (payload: Events[K]) => void): () => void {
    const eventListeners = listenersOf(event) ?? new Set();
    listeners[event] = eventListeners;
    eventListeners.add(listener);
    return (): void => {
      eventListeners.delete(listener);
    };
  }

  return {
    on,
    once<K extends keyof Events>(event: K, listener: (payload: Events[K]) => void): () => void {
      const off = on(event, (payload) => {
        off();
        listener(payload);
      });
      return off;
    },
    emit<K extends keyof Events>(event: K, payload: Events[K]): void {
      const eventListeners = listenersOf(event);
      if (!eventListeners) {
        return;
      }
      for (const listener of eventListeners) {
        listener(payload);
      }
    },
    clear(event?: keyof Events): void {
      const events = event === undefined ? Object.keys(listeners) : [event];
      for (const name of events) {
        listenersOf(name)?.clear();
      }
    },
  };
}
