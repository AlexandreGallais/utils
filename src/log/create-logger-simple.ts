import { createLogger } from './create-logger';
import type { Logger } from './logger';

/**
 * Creates a logger like `createLogger`, writing everything to the console.
 *
 * @param scope - Name shown before each message, such as `'chart'`.
 * @returns A logger with `debug`, `info`, `warn` and `error`.
 * @simple Every level, console output.
 * @example
 * const log = createLoggerSimple('chart');
 */
export function createLoggerSimple(scope: string): Logger {
  return createLogger(scope, {});
}
