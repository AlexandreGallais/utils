// Function wrappers: rate limiting for high-frequency sources, run once, memoization.

export { debounce } from './debounce';
export { memoizeLast } from './memoize-last';
export { once } from './once';
export { rafThrottle } from './raf-throttle';
export type { RateLimitedFunction } from './rate-limited-function';
export { throttle } from './throttle';
export { memoize } from './memoize';
export type { MemoizedFunction } from './memoized-function';
export { memoizeSimple } from './memoize-simple';
