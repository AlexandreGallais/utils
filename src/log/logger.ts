/** A scoped logger, created by `createLogger`. */
export interface Logger {
  /** Scope of the logger, shown with each entry. */
  readonly scope: string;

  /**
   * Logs a detailed entry, for development.
   *
   * @param message - Human-readable text of the entry.
   * @param data - Extra values (objects, errors).
   */
  debug(message: string, ...data: readonly unknown[]): void;

  /**
   * Logs a normal event.
   *
   * @param message - Human-readable text of the entry.
   * @param data - Extra values (objects, errors).
   */
  info(message: string, ...data: readonly unknown[]): void;

  /**
   * Logs an unexpected but handled situation.
   *
   * @param message - Human-readable text of the entry.
   * @param data - Extra values (objects, errors).
   */
  warn(message: string, ...data: readonly unknown[]): void;

  /**
   * Logs a failure.
   *
   * @param message - Human-readable text of the entry.
   * @param data - Extra values, typically the caught error.
   */
  error(message: string, ...data: readonly unknown[]): void;

  /**
   * Creates a logger for a sub-scope, with the same level and sink: `engine` → `engine:pump`.
   *
   * @param scope - Name of the sub-scope.
   * @returns The child logger.
   */
  child(scope: string): Logger;
}
