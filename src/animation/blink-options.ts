/** Rhythm and rest state of `startBlink`. */
export interface BlinkOptions {
  /** Fraction of the period spent on, in [0, 1]; 0.5 by default (on and off for the same time). */
  readonly dutyCycle?: number;
  /** State applied when the blinking stops; `true` (visible) by default, so nothing stays hidden. */
  readonly restState?: boolean;
}
