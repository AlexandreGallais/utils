import type { RateLimitedFunction } from './rate-limited-function';

/**
 * Limits a function to one call per animation frame, with the latest arguments: a value pushed 1 000 times
 * per second is rendered at the screen refresh rate, never more. Browser only (`requestAnimationFrame`).
 *
 * @template TArguments - Parameters of the wrapped function.
 * @param callback - The rendering function.
 * @returns The rate-limited function.
 * @example
 * const draw = rafThrottle((speed: number) => {
 *   needle.style.rotate = `${speed}deg`;
 * });
 * simulation.on('speed', draw);
 */
export function rafThrottle<TArguments extends unknown[]>(
  callback: (...callArguments: TArguments) => void,
): RateLimitedFunction<TArguments> {
  let pendingArguments: TArguments | undefined;
  let frame: number | undefined;

  function onFrame(): void {
    frame = undefined;
    if (!pendingArguments) {
      return;
    }
    const callArguments = pendingArguments;
    pendingArguments = undefined;
    callback(...callArguments);
  }
  function cancel(): void {
    if (frame !== undefined) {
      cancelAnimationFrame(frame);
      frame = undefined;
    }
    pendingArguments = undefined;
  }
  function flush(): void {
    if (frame !== undefined) {
      cancelAnimationFrame(frame);
    }
    onFrame();
  }

  return Object.assign(
    (...callArguments: TArguments): void => {
      pendingArguments = callArguments;
      frame ??= requestAnimationFrame(onFrame);
    },
    { cancel, flush },
  );
}
