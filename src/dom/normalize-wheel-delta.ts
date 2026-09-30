/** Height of a page scrolled by the wheel when none is given. */
const DEFAULT_PAGE_HEIGHT_PX = 800;

/** `WheelEvent.DOM_DELTA_LINE`, repeated here because `WheelEvent` does not exist outside browsers. */
const DOM_DELTA_LINE = 1;
/** `WheelEvent.DOM_DELTA_PAGE`. */
const DOM_DELTA_PAGE = 2;
/** Pixels per line when the browser scrolls by lines (Firefox with a mouse wheel). */
const LINE_HEIGHT_PX = 16;

/**
 * Converts the vertical scroll of a wheel event to pixels, whatever its `deltaMode` (pixels in most
 * browsers, lines in Firefox with a mouse wheel, pages with some settings): the same wheel gesture then
 * zooms or scrolls by the same amount everywhere.
 *
 * @param event - The wheel event, or any object with its `deltaY` and `deltaMode`.
 * @param pageHeightPx - Height of a page, for `deltaMode` 2, such as the height of the scrolled element. Defaults to
 * `800`.
 * @returns The scroll in pixels: positive downwards (away from the user).
 * @example
 * listen(chart, 'wheel', (event) => zoomBy(getWheelZoomFactor(normalizeWheelDelta(event), 0.002)), { passive: true });
 */
export function normalizeWheelDelta(
  event: Readonly<Pick<WheelEvent, 'deltaMode' | 'deltaY'>>,
  pageHeightPx?: number | null,
): number {
  const resolvedPageHeightPx = pageHeightPx ?? DEFAULT_PAGE_HEIGHT_PX;
  if (event.deltaMode === DOM_DELTA_LINE) {
    return event.deltaY * LINE_HEIGHT_PX;
  }
  return event.deltaMode === DOM_DELTA_PAGE ? event.deltaY * resolvedPageHeightPx : event.deltaY;
}
