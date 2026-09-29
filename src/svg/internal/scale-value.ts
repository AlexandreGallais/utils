/** A graduation value of a scale. */
export interface ScaleValue {
  /** The value. */
  readonly value: number;
  /** Whether it is on a major step (labelled, longer tick). */
  readonly isMajor: boolean;
}
