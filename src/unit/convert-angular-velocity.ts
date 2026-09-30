/** An angular velocity unit: revolutions per minute, degrees per second, radians per second. */
export type AngularVelocityUnit = 'deg/s' | 'rad/s' | 'rpm';

const DEGREES_PER_TURN = 360;
const SECONDS_PER_MINUTE = 60;
const DEGREES_PER_RADIAN = DEGREES_PER_TURN / (2 * Math.PI);

/** Degrees per second in one unit of each angular velocity. */
const DEGREES_PER_SECOND: Readonly<Record<AngularVelocityUnit, number>> = {
  'deg/s': 1,
  'rad/s': DEGREES_PER_RADIAN,
  rpm: DEGREES_PER_TURN / SECONDS_PER_MINUTE,
};

/**
 * Converts an angular velocity between units: engine and shaft speeds in rpm, turn rates in °/s, physics
 * in rad/s.
 *
 * @param value - The angular velocity, in `from` units.
 * @param from - Unit of `value`.
 * @param to - Unit of the result.
 * @returns The angular velocity in `to` units.
 * @example
 * convertAngularVelocity(60, 'rpm', 'deg/s'); // 360
 * convertAngularVelocity(Math.PI, 'rad/s', 'deg/s'); // 180
 */
export function convertAngularVelocity(value: number, from: AngularVelocityUnit, to: AngularVelocityUnit): number {
  return from === to ? value : (value * DEGREES_PER_SECOND[from]) / DEGREES_PER_SECOND[to];
}
