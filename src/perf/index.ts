// Web performance: frame rate, timing, batched DOM reads and writes. See also `rafThrottle` and `yieldToMain`.

export { createFpsMeter } from './create-fps-meter';
export { createFrameBatcher } from './create-frame-batcher';
export type { FpsMeter } from './fps-meter';
export type { FrameBatcher } from './create-frame-batcher';
export { measureDuration } from './measure-duration';
export { measureDurationSimple } from './measure-duration-simple';
export { createFpsMeterSimple } from './create-fps-meter-simple';
