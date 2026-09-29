import { clamp } from '../math/clamp.ts';
import { inverseLerp } from '../math/inverse-lerp.ts';
import type { BarScale } from './bar-scale.ts';

/**
 * Converts a value to a coordinate along a bar gauge: a `y` for an `'up'` or `'down'` bar, an `x` for a
 * `'left'` or `'right'` bar. Out-of-range values stop at the ends of the bar by default.
 *
 * @param value - The value to place.
 * @param scale - Value range, drawing area and direction of the bar.
 * @param shouldClamp - Whether to stop at the ends of the bar instead of extrapolating.
 * @returns The coordinate, in SVG user units.
 * @example
 * const scale = { min: 0, max: 10, rect: { x: 0, y: 0, width: 20, height: 200 }, direction: 'up' } as const;
 * valueToBarPosition(2.5, scale); // 150 (a quarter of the way up from the bottom)
 */
export function valueToBarPosition(value: number, scale: BarScale, shouldClamp = true): number {
  const { rect, direction } = scale;
  const ratio = inverseLerp(scale.min, scale.max, value);
  const t = shouldClamp ? clamp(ratio, 0, 1) : ratio;
  switch (direction) {
    case 'up': {
      return rect.y + rect.height - rect.height * t;
    }
    case 'down': {
      return rect.y + rect.height * t;
    }
    case 'right': {
      return rect.x + rect.width * t;
    }
    case 'left': {
      return rect.x + rect.width - rect.width * t;
    }
  }
}
