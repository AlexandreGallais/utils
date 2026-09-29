/**
 * Turns a wheel scroll into a zoom factor for `zoomBounds`, exponential so that scrolling up then down by
 * the same amount comes back to the same zoom, and a trackpad (many small deltas) zooms as smoothly as a
 * mouse (few large ones).
 *
 * @param deltaPx - The scroll in pixels, such as the result of `normalizeWheelDelta`; negative (upwards)
 * zooms in.
 * @param sensitivity - Zoom per pixel: larger values zoom faster.
 * @returns The factor: above 1 to zoom in, below 1 to zoom out, 1 for no scroll.
 * @example
 * bounds = zoomBounds(bounds, getWheelZoomFactor(normalizeWheelDelta(event), 0.002), mouseDataPoint);
 */
export function getWheelZoomFactor(deltaPx: number, sensitivity: number): number {
  return Math.exp(-deltaPx * sensitivity);
}
