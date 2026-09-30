import type { Rgb } from './rgb';

/** An sRGB color with an opacity channel. */
export interface Rgba extends Rgb {
  /** Opacity, in [0, 1]: `0` is fully transparent, `1` fully opaque. */
  readonly a: number;
}
