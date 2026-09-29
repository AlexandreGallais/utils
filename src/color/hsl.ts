/** A color as hue, saturation and lightness (CSS `hsl()`), handy to derive lighter or darker shades. */
export interface Hsl {
  /** Hue, in degrees in [0, 360[: 0 red, 120 green, 240 blue. */
  readonly h: number;
  /** Saturation, in [0, 1]: 0 is gray. */
  readonly s: number;
  /** Lightness, in [0, 1]: 0 is black, 1 is white. */
  readonly l: number;
  /** Opacity, in [0, 1]. */
  readonly a: number;
}
