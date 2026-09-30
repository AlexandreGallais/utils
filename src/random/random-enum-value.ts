import type { EnumObject } from '../enum';
import { getEnumValues } from '../enum';

/**
 * Draws one member of an enum, for test data covering every state.
 *
 * @template E - The enum type.
 * @param enumObject - The enum to draw from, such as `Status`.
 * @param random - Source of numbers in [0, 1), such as a seeded generator for reproducible runs. Defaults to
 * `Math.random`.
 * @returns A value of the enum.
 * @throws {RangeError} When the enum has no member.
 * @example
 * randomEnumValue(Status, Math.random); // Status.Running
 */
export function randomEnumValue<E extends EnumObject>(enumObject: E, random?: (() => number) | null): E[keyof E] {
  const resolvedRandom = random ?? Math.random;
  const values = getEnumValues(enumObject);
  const index = Math.floor(resolvedRandom() * values.length);
  const [value] = values.slice(index, index + 1);
  if (value === undefined) {
    throw new RangeError('enumObject must have at least one member');
  }
  return value;
}
