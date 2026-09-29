import type { DurationParts } from './duration-parts.ts';
import { splitDuration } from './split-duration.ts';

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60_000;
const MS_PER_HOUR = 3_600_000;
const MS_PER_DAY = 86_400_000;
const MS_PER_WEEK = 604_800_000;

/** A unit letter and its length, for the date part (before `T`) and the time part (after `T`), in ISO order. */
type Unit = readonly [letter: string, milliseconds: number];
const DATE_UNITS: readonly Unit[] = [
  ['W', MS_PER_WEEK],
  ['D', MS_PER_DAY],
];
const TIME_UNITS: readonly Unit[] = [
  ['H', MS_PER_HOUR],
  ['M', MS_PER_MINUTE],
  ['S', MS_PER_SECOND],
];

/** One component at the current position (sticky): a number (`.` or `,` decimals) and its unit letter. */
const COMPONENT_SOURCE = String.raw`(?<value>\d+(?:[,.]\d+)?)(?<unit>[A-Z])`;
/** The date part, then at most one time part. */
const MAX_PARTS = 2;

/**
 * Parses an ISO 8601 duration, as sent by many APIs and by `Temporal.Duration`: `PT1H30M`, `P2DT3H`, `P1W`,
 * `PT0.5S`. Years and months are rejected, as their length depends on the calendar.
 *
 * @param input - The ISO 8601 duration; surrounding spaces are ignored.
 * @returns The duration parts, or `undefined` when the text is not a supported ISO 8601 duration.
 * @example
 * parseIsoDuration('PT1H30M')?.totalMilliseconds; // 5400000
 * parseIsoDuration('P1Y'); // undefined (a year has no fixed length)
 */
export function parseIsoDuration(input: string): DurationParts | undefined {
  const text = input.trim();
  const isNegative = text.startsWith('-');
  const body = isNegative || text.startsWith('+') ? text.slice(1) : text;
  if (!body.startsWith('P') || body.length === 1) {
    return undefined;
  }
  const parts = body.slice(1).split('T');
  const [datePart = '', timePart] = parts;
  if (timePart === '' || parts.length > MAX_PARTS) {
    return undefined;
  }
  const dateMs = sumComponents(datePart, DATE_UNITS);
  const timeMs = timePart === undefined ? 0 : sumComponents(timePart, TIME_UNITS);
  if (dateMs === undefined || timeMs === undefined) {
    return undefined;
  }
  return splitDuration(isNegative ? -(dateMs + timeMs) : dateMs + timeMs);
}

/**
 * Adds the components of one part of a duration, reading them one after the other from the start, and
 * checking that the part holds nothing else and that the units come in order, each at most once.
 *
 * @param part - The date or time part, such as `'1H30M'`.
 * @param units - The allowed units, in the required order.
 * @returns The part in milliseconds, or `undefined` when it is malformed.
 */
function sumComponents(part: string, units: readonly Unit[]): number | undefined {
  const pattern = new RegExp(COMPONENT_SOURCE, 'vy');
  let total = 0;
  let lastIndex = -1;
  while (pattern.lastIndex < part.length) {
    const [, value = '', letter = ''] = pattern.exec(part) ?? [];
    const index = units.findIndex(([unit]) => unit === letter);
    if (index <= lastIndex) {
      return undefined;
    }
    const [[, milliseconds] = ['', 0]] = units.slice(index, index + 1);
    total += Number(value.replace(',', '.')) * milliseconds;
    lastIndex = index;
  }
  return total;
}
