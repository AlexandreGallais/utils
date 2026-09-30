import { createFpsMeter } from './create-fps-meter';
import type { FpsMeter } from './fps-meter';

/** Frames averaged: one second at 60 Hz. */
const WINDOW_SIZE = 60;

/**
 * Creates a frame rate counter like `createFpsMeter`, averaged over the last second at 60 Hz.
 *
 * @returns A meter to feed with frame timestamps.
 * @simple A window of 60 frames.
 * @example
 * const meter = createFpsMeterSimple();
 */
export function createFpsMeterSimple(): FpsMeter {
  return createFpsMeter(WINDOW_SIZE);
}
