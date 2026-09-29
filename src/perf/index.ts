// Web performance: frame rate, timing, batched DOM reads and writes. See also `rafThrottle` and `yieldToMain`.

export { createFpsMeter } from './create-fps-meter.ts';
export { createFrameBatcher } from './create-frame-batcher.ts';
export type { FpsMeter } from './fps-meter.ts';
export type { FrameBatcher } from './frame-batcher.ts';
export { measureDuration } from './measure-duration.ts';
export { measureDurationSimple } from './measure-duration-simple.ts';
export { createFpsMeterSimple } from './create-fps-meter-simple.ts';
