import type { FittedRect } from './fitted-rect.ts';
import type { Rect } from './rect.ts';
import type { Size } from './size.ts';

/**
 * Scales and places a content in a container while keeping its aspect ratio, like SVG `preserveAspectRatio`
 * or CSS `object-fit`: `'contain'` shows the whole content (`meet`), `'cover'` fills the container and crops
 * the overflow (`slice`).
 *
 * @param content - Natural size of the content, such as the `viewBox` of a symbol.
 * @param container - Area to fill.
 * @param mode - `'contain'` or `'cover'`.
 * @param alignX - Horizontal position of the content in the free space: 0 left, 0.5 centered, 1 right.
 * @param alignY - Vertical position of the content in the free space: 0 top, 0.5 centered, 1 bottom.
 * @returns Where to draw the content, with its scale factor.
 * @example
 * fitRect({ width: 200, height: 100 }, { x: 0, y: 0, width: 100, height: 100 }, 'contain', 0.5, 0.5);
 * // { x: 0, y: 25, width: 100, height: 50, scale: 0.5 }
 */
export function fitRect(
  content: Size,
  container: Rect,
  mode: 'contain' | 'cover',
  alignX: number,
  alignY: number,
): FittedRect {
  const scaleX = content.width === 0 ? 0 : container.width / content.width;
  const scaleY = content.height === 0 ? 0 : container.height / content.height;
  const scale = mode === 'contain' ? Math.min(scaleX, scaleY) : Math.max(scaleX, scaleY);
  const width = content.width * scale;
  const height = content.height * scale;
  return {
    x: container.x + (container.width - width) * alignX,
    y: container.y + (container.height - height) * alignY,
    width,
    height,
    scale,
  };
}
