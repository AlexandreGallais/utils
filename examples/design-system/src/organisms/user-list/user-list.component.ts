import { Component, input, output } from '@angular/core';
import type { User } from '../../models/users/user';
import { ButtonComponent } from '../../atoms/button/button.component';
import { SearchFieldComponent } from '../../molecules/search-field/search-field.component';

/** Organism: a searchable list of users; it shows data and emits intents, the page talks to the store. */
@Component({
  selector: 'ds-user-list',
  imports: [ButtonComponent, SearchFieldComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  /** Users to show. */
  public readonly users = input.required<readonly User[]>();

  /** Emitted with the text of a search. */
  public readonly searched = output<string>();

  /** Emitted with the user to remove. */
  public readonly removed = output<User>();
}
