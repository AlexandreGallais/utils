/**
 * A mapping from data values to screen coordinates, returned by `createLinearScale` and `createLogScale`:
 * call it to project a value, use `invert` to read the value under the mouse.
 */
export type Scale = ((value: number) => number) & {
  /** The data interval `[start, end]`. */
  readonly domain: readonly [start: number, end: number];
  /** The screen interval `[start, end]` the domain maps to. */
  readonly range: readonly [start: number, end: number];

  /**
   * Maps a screen coordinate back to a data value.
   *
   * @param coordinate - A screen coordinate.
   * @returns The data value at that coordinate.
   */
  invert(coordinate: number): number;
};
