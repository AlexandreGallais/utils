/**
 * A 2D affine transform, in the SVG / `DOMMatrix` layout `matrix(a b c d e f)`: a point `(x, y)` becomes
 * `(a·x + c·y + e, b·x + d·y + f)`. `a b c d` hold rotation, scale, skew and flips; `e f` the translation.
 */
export interface Matrix2D {
  /** Horizontal scale component (cos of the rotation times the x scale). */
  readonly a: number;
  /** Vertical shear component (sin of the rotation times the x scale). */
  readonly b: number;
  /** Horizontal shear component (minus sin of the rotation times the y scale). */
  readonly c: number;
  /** Vertical scale component (cos of the rotation times the y scale). */
  readonly d: number;
  /** Horizontal translation. */
  readonly e: number;
  /** Vertical translation. */
  readonly f: number;
}
