/**
 * Updates an on/off state with hysteresis: on at or above `highThreshold`, off at or below `lowThreshold`,
 * unchanged in between. A noisy value near a threshold no longer makes the state flicker.
 *
 * @param value - The latest value.
 * @param isOn - The current state.
 * @param lowThreshold - The value at or below which the state switches off.
 * @param highThreshold - The value at or above which the state switches on.
 * @returns The new state.
 * @example
 * isAlarmOn = applyHysteresis(temperature, isAlarmOn, 85, 90); // on at 90 °C, off under 85 °C
 */
export function applyHysteresis(value: number, isOn: boolean, lowThreshold: number, highThreshold: number): boolean {
  return value >= highThreshold || (value > lowThreshold && isOn);
}
