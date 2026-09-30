import type { Rgb } from './rgb';

const RGB_PATTERN = /^rgba?\((?<r>[\d.]+)[,\s]+(?<g>[\d.]+)[,\s]+(?<b>[\d.]+)/v;

/**
 * Reads the fill color of an SVG element as rendered, whatever sets it: attribute, class, inherited style.
 *
 * @param element - A rendered SVG element.
 * @returns The fill color.
 * @throws {TypeError} When the fill is not an sRGB color, such as `none` or a gradient.
 * @example
 * getSvgFillColor(tank); // { r: 0, g: 128, b: 255 }
 */
export function getSvgFillColor(element: SVGGraphicsElement): Rgb {
  const { fill } = getComputedStyle(element);
  const groups = RGB_PATTERN.exec(fill)?.groups;
  if (!groups) {
    throw new TypeError(`The fill is not an sRGB color: '${fill}'`);
  }
  return { r: Number(groups['r']), g: Number(groups['g']), b: Number(groups['b']) };
}
