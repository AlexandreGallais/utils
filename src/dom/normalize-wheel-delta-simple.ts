import { normalizeWheelDelta } from './normalize-wheel-delta.ts';

/** Pixels per page when the browser scrolls by pages: about a screen height. */
const PAGE_HEIGHT_PX = 800;

/**
 * Converts the vertical scroll of a wheel event to pixels like `normalizeWheelDelta`.
 *
 * @param event - The wheel event, or any object with its `deltaY` and `deltaMode`.
 * @returns The scroll in pixels, positive downwards.
 * @simple A page counts 800 pixels.
 * @example
 * const deltaPx = normalizeWheelDeltaSimple(event);
 */
export function normalizeWheelDeltaSimple(event: Readonly<Pick<WheelEvent, 'deltaMode' | 'deltaY'>>): number {
  return normalizeWheelDelta(event, PAGE_HEIGHT_PX);
}
