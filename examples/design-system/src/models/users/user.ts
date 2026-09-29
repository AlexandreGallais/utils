/** A user, as returned by the back end. */
export interface User {
  /** Unique identifier. */
  readonly id: number;
  /** Display name. */
  readonly name: string;
}
