// Trackers for live values: staleness, rate of change, peak hold.

export { createPeakHold } from './create-peak-hold.ts';
export { createRateEstimator } from './create-rate-estimator.ts';
export { createStaleDetector } from './create-stale-detector.ts';
export type { PeakHold } from './peak-hold.ts';
export type { RateEstimator } from './rate-estimator.ts';
export type { StaleDetector } from './stale-detector.ts';
export { createStaleDetectorSimple } from './create-stale-detector-simple.ts';
export { createPeakHoldSimple } from './create-peak-hold-simple.ts';
