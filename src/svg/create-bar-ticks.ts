import type { BarTick } from './bar-tick.ts';
import type { BarTicksOptions } from './bar-ticks-options.ts';
import { generateScaleValues } from './internal/generate-scale-values.ts';
import { valueToBarPosition } from './value-to-bar-position.ts';

/**
 * Computes the graduations of a bar gauge: major ticks every `majorStep`, shorter minor ticks every
 * `minorStep`, a minor tick falling on a major one dropped. Ticks are drawn across the bar from one of its
 * edges; draw them all at once with `createTicksPath`.
 *
 * @param options - Value range, drawing area, direction, steps, tick lengths and aligned edge.
 * @returns The graduations, in increasing value order.
 * @throws {RangeError} When a step is not a positive finite number, or `max` is not greater than `min`.
 * @example
 * const ticks = createBarTicks({
 *   min: 0, max: 10, rect: { x: 0, y: 0, width: 20, height: 200 }, direction: 'up',
 *   majorStep: 5, minorStep: 1, majorLength: 12, minorLength: 6, align: 'end',
 * });
 * scale.setAttribute('d', createTicksPath(ticks));
 */
export function createBarTicks(options: BarTicksOptions): BarTick[] {
  const { rect, direction, align = 'start' } = options;
  const isVertical = direction === 'up' || direction === 'down';
  const thickness = isVertical ? rect.width : rect.height;
  const majorLength = options.majorLength ?? thickness;
  const minorLength = options.minorLength ?? majorLength / 2;
  const edge = isVertical ? rect.x : rect.y;
  const origin = align === 'start' ? edge : edge + thickness;
  const inward = align === 'start' ? 1 : -1;
  return generateScaleValues(options.min, options.max, options.majorStep, options.minorStep).map(
    ({ value, isMajor }) => {
      const position = valueToBarPosition(value, options);
      const tip = origin + inward * (isMajor ? majorLength : minorLength);
      return {
        value,
        position,
        start: isVertical ? { x: origin, y: position } : { x: position, y: origin },
        end: isVertical ? { x: tip, y: position } : { x: position, y: tip },
        isMajor,
      };
    },
  );
}
