import type { ClockTick } from './clock-tick';

/** A function called at each tick of a `TickSource`. */
type TickListener = (tick: ClockTick) => void;

/** Anything that delivers clock ticks, such as a `Clock`: what the animation helpers need. */
export interface TickSource {
  /**
   * Calls a listener at each tick.
   *
   * @param listener - Called with each tick.
   * @returns A function that unsubscribes the listener.
   */
  subscribe(listener: TickListener): () => void;
}
