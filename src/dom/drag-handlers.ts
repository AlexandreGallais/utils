/** The callbacks of a pointer drag, for `trackPointerDrag`. */
export interface DragHandlers {
  /**
   * Decides whether a press starts a drag, such as only on a handle or only when not locked.
   *
   * @param event - The `pointerdown` event of the primary button.
   * @returns `false` to ignore this press.
   */
  canStart?(event: PointerEvent): boolean;

  /**
   * Called when a drag starts, to remember the initial position of what is dragged.
   *
   * @param event - The `pointerdown` event.
   */
  onStart?(event: PointerEvent): void;

  /**
   * Called at each move while the button is held, even outside the element (the pointer is captured).
   *
   * @param deltaX - Horizontal distance from the press, in screen pixels (see `screenDeltaToLocal`).
   * @param deltaY - Vertical distance from the press, in screen pixels.
   * @param event - The `pointermove` event.
   */
  onMove(deltaX: number, deltaY: number, event: PointerEvent): void;

  /**
   * Called once when the drag ends: button released (`pointerup`) or gesture interrupted by the browser
   * (`pointercancel`, check `event.type` to revert).
   *
   * @param deltaX - Final horizontal distance from the press.
   * @param deltaY - Final vertical distance from the press.
   * @param event - The `pointerup` or `pointercancel` event.
   */
  onEnd?(deltaX: number, deltaY: number, event: PointerEvent): void;
}
