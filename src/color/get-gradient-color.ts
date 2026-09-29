import type { ColorStop } from './color-stop.ts';
import { mixColors } from './mix-colors.ts';
import type { Rgba } from './rgba.ts';

/**
 * Reads the color of a multi-stop gradient at a value: a heat map, a temperature-colored pipe, a gauge
 * whose fill goes from green to amber to red. Out of the stops, the first or last color is held.
 *
 * @param stops - The gradient, sorted by ascending `offset`.
 * @param value - The value to color, in the unit of the offsets.
 * @returns The interpolated color, channels not rounded (`toHex` and `toRgbString` round them); `undefined`
 * without stop.
 * @example
 * const HEAT = [
 *   { offset: 0, color: { r: 0, g: 128, b: 255 } },
 *   { offset: 50, color: { r: 0, g: 200, b: 0 } },
 *   { offset: 100, color: { r: 255, g: 0, b: 0 } },
 * ];
 * getGradientColor(HEAT, 75); // { r: 127.5, g: 100, b: 0, a: 1 }, midway between green and red
 */
export function getGradientColor(stops: readonly ColorStop[], value: number): Rgba | undefined {
  let previous: ColorStop | undefined;
  for (const stop of stops) {
    if (value <= stop.offset) {
      return previous === undefined
        ? mixColors(stop.color, stop.color, 0)
        : mixColors(previous.color, stop.color, (value - previous.offset) / (stop.offset - previous.offset));
    }
    previous = stop;
  }
  return previous === undefined ? undefined : mixColors(previous.color, previous.color, 0);
}
