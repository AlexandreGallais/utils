/** An sRGB color. Channels are in [0, 255]; they may be fractional (the result of an interpolation). */
export interface Rgb {
  /** Red channel, in [0, 255]. */
  readonly r: number;
  /** Green channel, in [0, 255]. */
  readonly g: number;
  /** Blue channel, in [0, 255]. */
  readonly b: number;
}
