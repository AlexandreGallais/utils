import type { EnumObject } from './enum-object';
import { isEnumValue } from './is-enum-value';

/**
 * Returns a value typed as an enum member: the value itself when it belongs to the enum, the fallback
 * otherwise. For a stored setting that may be outdated.
 *
 * @template E - The type of the enum object.
 * @param enumObject - The enum, such as `Mode`.
 * @param value - The value to check.
 * @param fallback - The member returned when `value` does not belong to the enum.
 * @returns `value` narrowed to the enum, or `fallback`.
 * @example
 * enum Mode { Day = 'day', Night = 'night' }
 * toEnumValue(Mode, 'night', Mode.Day); // Mode.Night
 * toEnumValue(Mode, 'dusk', Mode.Day); // Mode.Day
 */
export function toEnumValue<E extends EnumObject>(enumObject: E, value: unknown, fallback: E[keyof E]): E[keyof E] {
  return isEnumValue(enumObject, value) ? value : fallback;
}
