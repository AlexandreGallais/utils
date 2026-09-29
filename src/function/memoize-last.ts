/**
 * Memoizes the last call only: called again with the same arguments (compared with `Object.is`), the
 * function returns the previous result without running. Memory stays constant, unlike a full cache: the
 * right tool for a value derived at each refresh from inputs that rarely change.
 *
 * @template TArguments - Parameters of the wrapped function.
 * @template TResult - Return type of the wrapped function.
 * @param callback - A pure function.
 * @returns The memoized function.
 * @example
 * const getTicks = memoizeLast((min: number, max: number, step: number) => range(min, max + step, step));
 * getTicks(0, 100, 10); // computed
 * getTicks(0, 100, 10); // same array, not recomputed
 */
export function memoizeLast<TArguments extends unknown[], TResult>(
  callback: (...callArguments: TArguments) => TResult,
): (...callArguments: TArguments) => TResult {
  let lastArguments: TArguments | undefined;
  let lastResult: TResult;
  return (...callArguments: TArguments): TResult => {
    if (lastArguments && haveSameArguments(lastArguments, callArguments)) {
      return lastResult;
    }
    lastResult = callback(...callArguments);
    lastArguments = callArguments;
    return lastResult;
  };
}

/**
 * Compares two argument lists item by item.
 *
 * @param previous - Arguments of the previous call.
 * @param next - Arguments of the current call.
 * @returns `true` when both lists have the same length and `Object.is`-equal items.
 */
function haveSameArguments(previous: readonly unknown[], next: readonly unknown[]): boolean {
  if (previous.length !== next.length) {
    return false;
  }
  for (const [index, item] of previous.entries()) {
    if (!Object.is(item, next[index])) {
      return false;
    }
  }
  return true;
}
