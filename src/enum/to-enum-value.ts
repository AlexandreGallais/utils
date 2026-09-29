import type { EnumObject } from './enum-object.ts';
import { isEnumValue } from './is-enum-value.ts';

/**
 * Returns a value typed as a member of an enum: the value itself when it belongs to the enum, the fallback
 * otherwise. The result is always a valid member, so untyped data (a JSON field, a stored setting) can be
 * used without a check at every read. Use `parseEnumValue` when the value may be a numeric string (`'1'`).
 *
 * @template E - Type of the enum object.
 * @param enumObject - The enum, such as `Direction`.
 * @param value - The value to check, of any type.
 * @param fallback - Member returned when `value` does not belong to the enum.
 * @returns `value` narrowed to the enum, or `fallback`.
 * @example
 * enum Mode { Day = 'day', Night = 'night' }
 * toEnumValue(Mode, settings.mode, Mode.Day); // Mode.Night for 'night', Mode.Day for 'dusk' or undefined
 */
export function toEnumValue<E extends EnumObject>(enumObject: E, value: unknown, fallback: E[keyof E]): E[keyof E] {
  return isEnumValue(enumObject, value) ? value : fallback;
}
