/**
 * The state of an alarm, after the ISA-18.2 model without shelving and suppression:
 * - `'normal'`: the condition is off and nothing is pending;
 * - `'active-unacknowledged'`: the condition is on and nobody has seen it yet (blinks);
 * - `'active-acknowledged'`: the condition is on and an operator has acknowledged it (steady);
 * - `'cleared-unacknowledged'`: the condition went off before anyone acknowledged it (blinks, dimmed).
 */
export type AlarmState = 'active-acknowledged' | 'active-unacknowledged' | 'cleared-unacknowledged' | 'normal';
