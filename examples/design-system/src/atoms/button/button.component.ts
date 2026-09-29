import { Component, input, output } from '@angular/core';

/** Visual role of a button. */
export type ButtonVariant = 'danger' | 'primary' | 'secondary';

/** Atom: a button of the design system, styled only with its tokens. */
@Component({
  selector: 'ds-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  /** Visual role of the button. */
  public readonly variant = input.required<ButtonVariant>();

  /** Emitted when the button is pressed (mouse, touch or keyboard). */
  public readonly pressed = output();
}
