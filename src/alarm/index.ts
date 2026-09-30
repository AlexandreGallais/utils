// Alarms: threshold levels (with hysteresis) and the acknowledgement state machine of ISA-18.2, as pure functions.

export { acknowledgeAlarm } from './acknowledge-alarm';
export type { AlarmState } from './alarm-state';
export { getThresholdLevel } from './get-threshold-level';
export { getThresholdLevelWithHysteresis } from './get-threshold-level-with-hysteresis';
export { isAlarmActive } from './is-alarm-active';
export { isAlarmUnacknowledged } from './is-alarm-unacknowledged';
export type { Threshold } from './threshold-scale';
export type { ThresholdScale } from './threshold-scale';
export { updateAlarmState } from './update-alarm-state';
