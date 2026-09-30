import { isBlinkOn } from '../time';
import type { TickSource } from '../time';

/** Rhythm and rest state of `startBlink`. */
export interface BlinkOptions {
  /** Fraction of the period spent on, in [0, 1]; 0.5 by default (on and off for the same time). */
  readonly dutyCycle?: number;
  /** State applied when the blinking stops; `true` (visible) by default, so nothing stays hidden. */
  readonly restState?: boolean;
}

/** Default fraction of the period spent on. */
const HALF_PERIOD = 0.5;

/**
 * Makes something blink on a shared clock: `onChange` receives `true` then `false`, each for half of the
 * period by default, and only when the state changes (no redundant DOM writes). The state is computed from
 * the real time of the ticks, so every blinking element is in phase, whenever it started. Stopping applies an
 * explicit rest state, so an alarm never stays frozen in its "off" look.
 *
 * @param clock - The tick source, such as the application's `Clock`.
 * @param periodMs - Duration of a full on/off cycle, in milliseconds.
 * @param onChange - Called with the new state at the first tick, then at each change, and at the stop.
 * @param options - Duty cycle and rest state.
 * @returns A function that stops the blinking and applies the rest state (once).
 * @throws {RangeError} At the first tick, when `periodMs` is not a positive finite number.
 * @example
 * const stopBlink = startBlink(clock, 1000, (isOn) => alarm.classList.toggle('dimmed', !isOn), {});
 * // on acknowledgement:
 * stopBlink(); // back to visible
 */
export function startBlink(
  clock: TickSource,
  periodMs: number,
  onChange: (isOn: boolean) => void,
  options: BlinkOptions,
): () => void {
  const { dutyCycle = HALF_PERIOD, restState = true } = options;
  let state: boolean | undefined;
  let isRunning = true;
  const unsubscribe = clock.subscribe(({ timestamp }) => {
    const isOn = isBlinkOn(timestamp, periodMs, dutyCycle);
    if (isOn === state) {
      return;
    }

    state = isOn;
    onChange(isOn);
  });
  return (): void => {
    if (!isRunning) {
      return;
    }
    isRunning = false;
    unsubscribe();
    onChange(restState);
  };
}
