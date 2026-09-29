import type { EnumObject } from '../enum/enum-object.ts';
import { randomEnumValue } from './random-enum-value.ts';

/**
 * Draws one member of an enum like `randomEnumValue`.
 *
 * @template E - The enum type.
 * @param enumObject - The enum to draw from, such as `Status`.
 * @returns A value of the enum.
 * @throws {RangeError} When the enum has no member.
 * @simple `Math.random` as the source (not replayable: use the full version with `createSeededRandom` for that).
 * @example
 * randomEnumValueSimple(Status); // Status.Running
 */
export function randomEnumValueSimple<E extends EnumObject>(enumObject: E): E[keyof E] {
  return randomEnumValue(enumObject, Math.random);
}
