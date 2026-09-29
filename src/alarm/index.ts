// Alarms: threshold levels (with hysteresis) and the acknowledgement state machine of ISA-18.2, as pure functions.

export { acknowledgeAlarm } from './acknowledge-alarm.ts';
export type { AlarmState } from './alarm-state.ts';
export { getThresholdLevel } from './get-threshold-level.ts';
export { getThresholdLevelWithHysteresis } from './get-threshold-level-with-hysteresis.ts';
export { isAlarmActive } from './is-alarm-active.ts';
export { isAlarmUnacknowledged } from './is-alarm-unacknowledged.ts';
export type { Threshold } from './threshold.ts';
export type { ThresholdScale } from './threshold-scale.ts';
export { updateAlarmState } from './update-alarm-state.ts';
