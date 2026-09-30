/**
 * A bar gauge laid on the box of an element, for `createSvgBarRangePath` and `createSvgBarTicksPath`. The bar follows the element in
 * any group, rotated or not.
 */
export interface SvgBar {
  /** The element giving the area of the bar, such as its track `<rect>`. */
  readonly element: SVGGraphicsElement;
  /** Where the values grow, in the element's own axes: `'up'` fills from the bottom. */
  readonly direction: 'down' | 'left' | 'right' | 'up';
}
