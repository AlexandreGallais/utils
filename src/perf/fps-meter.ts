/** A frame rate measurement, created by `createFpsMeter`. */
export interface FpsMeter {
  /** Frames per second, averaged over the last frames; `0` before two frames. */
  readonly fps: number;

  /**
   * Records a frame.
   *
   * @param timestampMs - Time of the frame, such as the argument of a `requestAnimationFrame` callback.
   * @returns The updated frame rate.
   */
  tick(timestampMs: number): number;

  /** Forgets the recorded frames, after a pause for instance. */
  reset(): void;
}
