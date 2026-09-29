import { clamp } from '../math/clamp.ts';

/** Number of distinct 8-bit channel values: the size of the per-channel lookup tables. */
const CHANNEL_VALUES = 256;
/** Highest value of an 8-bit color channel. */
const MAX_CHANNEL = 255;

/** Constants of the sRGB transfer function (IEC 61966-2-1). */
const LINEAR_THRESHOLD = 0.04045;
const LINEAR_SLOPE = 12.92;
const GAMMA_OFFSET = 0.055;
const GAMMA_SCALE = 1.055;
const GAMMA = 2.4;

/**
 * Linear value of every 8-bit channel, so `toLinear` is a lookup instead of a power per call. The
 * `@__PURE__` annotation lets bundlers drop the table when `toLinear` is not used.
 */
const LINEAR_CHANNELS: Float64Array = /* @__PURE__ */ Float64Array.from({ length: CHANNEL_VALUES }, (_, channel) =>
  srgbToLinear(channel / MAX_CHANNEL),
);

/**
 * Converts a gamma-encoded sRGB channel to linear light, as the luminance formulas need. Integer channels
 * are a table lookup.
 *
 * @param channel - A channel in [0, 255], possibly fractional; out-of-range values are clamped.
 * @returns The linear intensity, in [0, 1].
 * @example
 * toLinear(255); // 1
 * toLinear(128); // 0.2158…
 */
export function toLinear(channel: number): number {
  // The lookup doubles as the check: a fractional or out-of-range channel misses the table.
  const linear = LINEAR_CHANNELS[channel];
  return linear ?? srgbToLinear(clamp(channel, 0, MAX_CHANNEL) / MAX_CHANNEL);
}

/**
 * Applies the inverse sRGB transfer function.
 *
 * @param value - A gamma-encoded intensity, in [0, 1].
 * @returns The linear intensity, in [0, 1].
 */
function srgbToLinear(value: number): number {
  return value <= LINEAR_THRESHOLD ? value / LINEAR_SLOPE : ((value + GAMMA_OFFSET) / GAMMA_SCALE) ** GAMMA;
}
