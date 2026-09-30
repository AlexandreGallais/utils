import type { Rgba } from './rgba';

/** Highest value of an 8-bit color channel. */
const MAX_CHANNEL = 255;

/** Digits of the short (`#rgb`, `#rgba`) and long (`#rrggbb`, `#rrggbbaa`) forms. */
const SHORT_OPAQUE = 3;
const SHORT_WITH_ALPHA = 4;
const LONG_OPAQUE = 6;
const LONG_WITH_ALPHA = 8;
/** A short-form digit `x` stands for the byte `xx`, that is `x * 17`. */
const SHORT_DIGIT_TO_BYTE = 17;
const MAX_DIGIT = 15;
const HEX_RADIX = 16;
/** Character codes of `0`, `9`, `a` and `f`; `| LOWERCASE_BIT` lowercases an ASCII letter. */
const CODE_0 = 48;
const CODE_9 = 57;
const CODE_A = 97;
const CODE_F = 102;
const LETTER_DIGIT_OFFSET = 87;
const LOWERCASE_BIT = 0x20;

/**
 * Parses a hex color, with or without `#`, in any case. Digits are decoded from their character codes:
 * no regular expression, no `parseInt`.
 *
 * @param input - A hex color: `#rgb`, `#rgba`, `#rrggbb` or `#rrggbbaa`; surrounding spaces are ignored.
 * @returns The color, or `undefined` when the string is not a hex color.
 * @example
 * parseHex('#FFF'); // { r: 255, g: 255, b: 255, a: 1 }
 * parseHex('ff000080'); // { r: 255, g: 0, b: 0, a: 0.50196… }
 */
export function parseHex(input: string): Rgba | undefined {
  const text = input.trim();
  const start = text.startsWith('#') ? 1 : 0;
  const digits = text.length - start;

  if (digits === SHORT_OPAQUE || digits === SHORT_WITH_ALPHA) {
    const alpha = digits === SHORT_WITH_ALPHA ? hexDigit(text, start + SHORT_OPAQUE) : MAX_DIGIT;
    return toRgbaOrUndefined(
      hexDigit(text, start) * SHORT_DIGIT_TO_BYTE,
      hexDigit(text, start + 1) * SHORT_DIGIT_TO_BYTE,
      hexDigit(text, start + 2) * SHORT_DIGIT_TO_BYTE,
      alpha * SHORT_DIGIT_TO_BYTE,
    );
  }
  if (digits === LONG_OPAQUE || digits === LONG_WITH_ALPHA) {
    return toRgbaOrUndefined(
      hexByte(text, start),
      hexByte(text, start + 2),
      hexByte(text, start + SHORT_WITH_ALPHA),
      digits === LONG_WITH_ALPHA ? hexByte(text, start + LONG_OPAQUE) : MAX_CHANNEL,
    );
  }
  return undefined;
}

/**
 * Decodes one hex digit.
 *
 * @param text - The string holding the digit.
 * @param index - Position of the digit.
 * @returns The digit's value in [0, 15], or `-1` when it is not a hex digit.
 */
function hexDigit(text: string, index: number): number {
  const code = text.charCodeAt(index);
  if (code >= CODE_0 && code <= CODE_9) {
    return code - CODE_0;
  }
  const lower = code | LOWERCASE_BIT;
  return lower >= CODE_A && lower <= CODE_F ? lower - LETTER_DIGIT_OFFSET : -1;
}

/**
 * Decodes two hex digits.
 *
 * @param text - The string holding the digits.
 * @param index - Position of the first digit.
 * @returns The byte in [0, 255], or `-1` when a digit is invalid.
 */
function hexByte(text: string, index: number): number {
  const high = hexDigit(text, index);
  const low = hexDigit(text, index + 1);
  return high < 0 || low < 0 ? -1 : high * HEX_RADIX + low;
}

/**
 * Assembles a color from decoded bytes.
 *
 * @param r - Red byte, `-1` when invalid.
 * @param g - Green byte, `-1` when invalid.
 * @param b - Blue byte, `-1` when invalid.
 * @param alphaByte - Alpha byte, `-1` when invalid.
 * @returns The color, or `undefined` when a byte is invalid.
 */
function toRgbaOrUndefined(r: number, g: number, b: number, alphaByte: number): Rgba | undefined {
  return Math.min(r, g, b, alphaByte) < 0 ? undefined : { r, g, b, a: alphaByte / MAX_CHANNEL };
}
