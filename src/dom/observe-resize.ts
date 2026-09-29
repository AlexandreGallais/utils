/**
 * Watches the size of an element and returns the function that stops watching: the signal-friendly form of
 * `ResizeObserver`, to redraw a chart or a gauge when its container changes.
 *
 * @param element - The element to watch.
 * @param onResize - Called with the entry of each change, and once soon after the start.
 * @param options - Which box to measure, such as `{ box: 'border-box' }`.
 * @returns A function that stops the observer.
 * @example
 * const size = signal({ width: 0, height: 0 });
 * destroyRef.onDestroy(observeResize(host, ({ contentRect }) => size.set(contentRect)));
 */
export function observeResize(
  element: Element,
  onResize: (entry: ResizeObserverEntry) => void,
  options?: ResizeObserverOptions,
): () => void {
  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      onResize(entry);
    }
  });
  observer.observe(element, options);
  return (): void => {
    observer.disconnect();
  };
}
