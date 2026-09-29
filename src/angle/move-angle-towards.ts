import { moveTowards } from '../math/move-towards.ts';
import { angleDifference } from './angle-difference.ts';
import { normalizeAngle } from './normalize-angle.ts';

/**
 * Turns an angle towards a target at a limited angular speed, along the shortest way around the circle: a
 * rudder, a turret or a radar antenna with a maximum rate of turn.
 *
 * @param current - The current angle, in degrees.
 * @param target - The angle to reach, in degrees.
 * @param maxDegreesPerSecond - The maximum rate of turn.
 * @param deltaMs - Time since the previous update.
 * @returns The new angle, in [0, 360[; exactly the target once reached.
 * @example
 * turret = moveAngleTowards(turret, bearing, 30, tick.deltaMs); // 30°/s at most
 * moveAngleTowards(350, 10, 10, 1000); // 0 (10° of the 20° gap)
 */
export function moveAngleTowards(
  current: number,
  target: number,
  maxDegreesPerSecond: number,
  deltaMs: number,
): number {
  return normalizeAngle(current + moveTowards(0, angleDifference(current, target), maxDegreesPerSecond, deltaMs));
}
