import type { FpsMeter } from './fps-meter.ts';

/** Milliseconds per second. */
const MS_PER_SECOND = 1000;

/**
 * Creates a frame rate counter averaged over a sliding window of frames, in constant time per frame: show it
 * in a debug overlay, or lower the refresh rate of a simulation view when the browser cannot keep up.
 *
 * @param windowSize - Number of frame intervals averaged.
 * @returns A meter to feed with frame timestamps.
 * @throws {RangeError} When `windowSize` is not a positive integer.
 * @example
 * const meter = createFpsMeter(60);
 * const loop = (timestamp: number): void => {
 *   fps.set(Math.round(meter.tick(timestamp)));
 *   requestAnimationFrame(loop);
 * };
 */
export function createFpsMeter(windowSize: number): FpsMeter {
  if (!Number.isSafeInteger(windowSize) || windowSize < 1) {
    throw new RangeError(`windowSize must be a positive integer, got ${windowSize}`);
  }
  // Ring buffer of the timestamps of the last frames.
  const timestamps = new Float64Array(windowSize + 1);
  let count = 0;
  let next = 0;
  let fps = 0;
  return {
    get fps(): number {
      return fps;
    },
    tick(timestampMs: number): number {
      timestamps[next] = timestampMs;
      next = (next + 1) % timestamps.length;
      count = Math.min(count + 1, timestamps.length);
      // Once the buffer is full, the oldest timestamp is the one the next frame will overwrite.
      const oldestIndex = count === timestamps.length ? next : 0;
      /* v8 ignore next -- `oldestIndex` is always within the buffer; `??` only satisfies noUncheckedIndexedAccess. */
      const elapsed = timestampMs - (timestamps[oldestIndex] ?? timestampMs);
      fps = elapsed > 0 ? ((count - 1) * MS_PER_SECOND) / elapsed : 0;
      return fps;
    },
    reset(): void {
      count = 0;
      next = 0;
      fps = 0;
    },
  };
}
