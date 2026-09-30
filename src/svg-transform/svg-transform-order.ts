/**
 * An order of `applySvgTransforms`, created by `svgRotateBy`, `svgRotateTo`, `svgFlipTo`, `svgScaleBy`,
 * `svgTranslateBy` or `svgPlaceOn`: keep it to change its values later with `set`.
 *
 * @template TArguments - The values of the order, the same as the arguments of its function.
 */
export interface SvgTransformOrder<TArguments extends unknown[]> {
  /** Changes the values of the order; once applied, its own transform is updated. */
  set(...args: TArguments): void;
}
