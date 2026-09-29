import type { Anchor } from './anchor.ts';
import type { Point } from './point.ts';

/** Where `placeRect` puts a box relative to a target box. */
export interface PlaceRectOptions {
  /** Point of the target box to attach to, such as `'top-right'`. */
  readonly targetAnchor: Anchor;

  /**
   * Point of the placed box that lands on the target anchor; the same as `targetAnchor` when omitted, which
   * places the box inside the target's corner. `'center'` centers it on the anchor, the opposite corner
   * (`'bottom-left'` for `'top-right'`) puts it outside.
   */
  readonly selfAnchor?: Anchor;
  /** Shift applied last, in screen directions (`y` grows downwards): a padding or a gap. */
  readonly offset?: Point;
}
