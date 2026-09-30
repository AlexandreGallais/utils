import { toByte } from './internal';
import type { Rgb } from './rgb';
import type { Rgba } from './rgba';

/** Number of distinct 8-bit channel values: the size of the per-channel lookup tables. */
const CHANNEL_VALUES = 256;
/** Highest value of an 8-bit color channel. */
const MAX_CHANNEL = 255;

const HEX_RADIX = 16;
const HEX_BYTE_LENGTH = 2;

/**
 * Two-digit lowercase hex of every byte: concatenating lookups is faster than `toString(16)` per channel.
 * `@__PURE__` lets bundlers drop the table when `toHex` is not used.
 */
const HEX_BYTES: readonly string[] = /* @__PURE__ */ Array.from({ length: CHANNEL_VALUES }, (_, byte) =>
  byte.toString(HEX_RADIX).padStart(HEX_BYTE_LENGTH, '0'),
);

/**
 * Formats a color as a lowercase hex string. Channels are rounded and clamped to [0, 255].
 *
 * @param color - The color; its alpha, if below 1, is appended as a fourth byte.
 * @returns `#rrggbb`, or `#rrggbbaa` for a translucent color.
 * @example
 * toHex({ r: 255, g: 128, b: 0 }); // '#ff8000'
 * toHex({ r: 255, g: 0, b: 0, a: 0.5 }); // '#ff000080'
 */
export function toHex(color: Rgb | Rgba): string {
  const hex = `#${hexOf(color.r)}${hexOf(color.g)}${hexOf(color.b)}`;
  return 'a' in color && color.a < 1 ? hex + hexOf(color.a * MAX_CHANNEL) : hex;
}

/**
 * Formats a channel as two hex digits.
 *
 * @param value - A channel value, possibly fractional or out of range (`NaN` gives `00`).
 * @returns Two lowercase hex digits.
 */
function hexOf(value: number): string {
  return HEX_BYTES[toByte(value)] ?? '00';
}
