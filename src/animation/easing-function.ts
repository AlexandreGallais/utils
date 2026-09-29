/**
 * An easing curve: maps the linear progress of an animation, in [0, 1], to the progress of the animated
 * value (starting at 0, ending at 1, possibly overshooting in between).
 */
export type EasingFunction = (progress: number) => number;
