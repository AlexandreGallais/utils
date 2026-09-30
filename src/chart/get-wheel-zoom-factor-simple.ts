import { getWheelZoomFactor } from './get-wheel-zoom-factor';

/** Zoom per pixel of scroll: a usual mouse notch (~100 px) zooms by about 20 %. */
const SENSITIVITY = 0.002;

/**
 * Turns a wheel scroll into a zoom factor like `getWheelZoomFactor`: a usual mouse notch zooms by about 20 %.
 *
 * @param deltaPx - The scroll in pixels, such as the result of `normalizeWheelDeltaSimple`; negative zooms in.
 * @returns Above 1 to zoom in, below 1 to zoom out.
 * @simple Sensitivity of 0.002 per pixel.
 * @example
 * bounds = zoomBounds(bounds, getWheelZoomFactorSimple(normalizeWheelDeltaSimple(event)), mouseDataPoint);
 */
export function getWheelZoomFactorSimple(deltaPx: number): number {
  return getWheelZoomFactor(deltaPx, SENSITIVITY);
}
