/**
 * Updates an on/off state with hysteresis: it switches on at or above `highThreshold`, off at or below
 * `lowThreshold`, and keeps its previous value in between. An alarm fed by a noisy value hovering around its
 * threshold no longer flickers.
 *
 * @param value - The latest measured value.
 * @param isOn - The current state.
 * @param lowThreshold - Value at or below which the state switches off.
 * @param highThreshold - Value at or above which the state switches on; greater than `lowThreshold`.
 * @returns The new state.
 * @throws {RangeError} When `highThreshold` is not greater than `lowThreshold`.
 * @example
 * // high temperature alarm: on at 90 °C, off only back under 85 °C
 * isAlarmOn = applyHysteresis(temperature, isAlarmOn, 85, 90);
 */
export function applyHysteresis(value: number, isOn: boolean, lowThreshold: number, highThreshold: number): boolean {
  if (Number.isNaN(highThreshold - lowThreshold) || highThreshold <= lowThreshold) {
    throw new RangeError(`highThreshold (${highThreshold}) must be greater than lowThreshold (${lowThreshold})`);
  }
  return value >= highThreshold || (value > lowThreshold && isOn);
}
