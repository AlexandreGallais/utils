/**
 * Wraps a function so it runs on the first call only; later calls return the first result.
 *
 * @template TArguments - Parameters of the wrapped function.
 * @template TResult - Return type of the wrapped function.
 * @param callback - The function to run once.
 * @returns A function returning the result of the first call.
 * @example
 * const loadConfig = once(() => fetchConfig());
 * loadConfig(); // fetches
 * loadConfig(); // same promise, no new fetch
 */
export function once<TArguments extends unknown[], TResult>(
  callback: (...callArguments: TArguments) => TResult,
): (...callArguments: TArguments) => TResult {
  let isCalled = false;
  let result: TResult;
  return (...callArguments: TArguments): TResult => {
    if (!isCalled) {
      isCalled = true;
      result = callback(...callArguments);
    }
    return result;
  };
}
