/**
 * A typed event emitter, created by `createEmitter`: event names and payload types are checked.
 *
 * @template Events - Map of event names to payload types, such as `{ alarm: Alarm; reset: undefined }`.
 */
export interface Emitter<Events extends Record<string, unknown>> {
  /**
   * Calls a listener each time an event is emitted.
   *
   * @param event - Name of the event.
   * @param listener - Called with the payload of each emission.
   * @returns A function that removes the listener.
   */
  on<K extends keyof Events>(event: K, listener: (payload: Events[K]) => void): () => void;

  /**
   * Calls a listener at the next emission of an event only.
   *
   * @param event - Name of the event.
   * @param listener - Called with the payload of the next emission.
   * @returns A function that removes the listener before it runs.
   */
  once<K extends keyof Events>(event: K, listener: (payload: Events[K]) => void): () => void;

  /**
   * Calls the listeners of an event, in subscription order.
   *
   * @param event - Name of the event.
   * @param payload - Value handed to each listener.
   */
  emit<K extends keyof Events>(event: K, payload: Events[K]): void;

  /**
   * Removes every listener of an event, or of every event.
   *
   * @param event - Name of the event; every event when omitted.
   */
  clear(event?: keyof Events): void;
}
