import { Component, model, output } from '@angular/core';
import { ButtonComponent } from '../../atoms/button/button.component';

/** Molecule: a labelled text field and its search button. */
@Component({
  selector: 'ds-search-field',
  imports: [ButtonComponent],
  templateUrl: './search-field.component.html',
  styleUrl: './search-field.component.scss',
})
export class SearchFieldComponent {
  /** Text typed by the user, two-way bound. */
  public readonly text = model('');

  /** Emitted with the text when the user asks for a search. */
  public readonly searched = output<string>();
}
