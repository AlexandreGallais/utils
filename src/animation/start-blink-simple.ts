import type { TickSource } from '../time';
import { startBlink } from './start-blink';

/**
 * Toggles a boolean on a shared clock like `startBlink`, on half of the period, back to on when stopped.
 *
 * @param clock - The tick source, such as a `Clock`.
 * @param periodMs - Duration of one on-off cycle, in milliseconds.
 * @param onChange - Called with the new state at each change.
 * @returns A function that stops the blink.
 * @simple Duty cycle of 50 %, rest state `true`.
 * @example
 * destroyRef.onDestroy(startBlinkSimple(clock, 1000, (isOn) => isVisible.set(isOn)));
 */
export function startBlinkSimple(clock: TickSource, periodMs: number, onChange: (isOn: boolean) => void): () => void {
  return startBlink(clock, periodMs, onChange, {});
}
