/** Number of colors in the 24-bit RGB space. */
const COLOR_COUNT = 0x1_00_00_00;
/** Digits of a `#rrggbb` color. */
const HEX_DIGITS = 6;
/** Radix of hexadecimal notation. */
const HEX_RADIX = 16;

/**
 * Draws an opaque color, to tell series or items apart in tests and mock-ups.
 *
 * @param random - Source of numbers in [0, 1), such as a seeded generator for reproducible runs.
 * @returns A lowercase `#rrggbb` color.
 * @example
 * randomHexColor(Math.random); // '#3fa2c8'
 */
export function randomHexColor(random: () => number): string {
  return `#${Math.floor(random() * COLOR_COUNT)
    .toString(HEX_RADIX)
    .padStart(HEX_DIGITS, '0')}`;
}
