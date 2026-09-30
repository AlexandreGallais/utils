import { fitRect } from './fit-rect';
import type { FittedRect } from './fitted-rect';
import type { Rect } from './rect';
import type { Size } from './size';

/** Alignment factor of the middle, on both axes. */
const CENTER = 0.5;

/**
 * Fits a content inside a container like `fitRect`, whole and centered.
 *
 * @param content - The size of the content, such as an image or a symbol.
 * @param container - The area to fit into.
 * @returns The placed rectangle and its scale.
 * @simple Contain mode (all of the content visible), centered.
 * @example
 * fitRectSimple({ width: 100, height: 50 }, { x: 0, y: 0, width: 200, height: 200 }); // centered, scale 2
 */
export function fitRectSimple(content: Size, container: Rect): FittedRect {
  return fitRect(content, container, 'contain', CENTER, CENTER);
}
