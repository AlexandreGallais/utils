import { Component, computed, inject } from '@angular/core';
import { UserListComponent } from '../../organisms/user-list/user-list.component';
import { UsersStore } from '../../stores/users/users.store';
import { formatCount } from '../../utils/text/format-count';
import type { User } from '../../models/users/user';

/** Page: connects the organisms to the stores. */
@Component({
  selector: 'ds-users-page',
  imports: [UserListComponent],
  templateUrl: './users-page.component.html',
})
export class UsersPageComponent {
  protected readonly store = inject(UsersStore);

  /** Title of the page, with the number of users. */
  protected readonly title = computed(() => formatCount(this.store.users().length, 'user'));

  /**
   * Starts a search.
   *
   * @param text - The text to look for.
   */
  protected async onSearched(text: string): Promise<void> {
    await this.store.search(text);
  }

  /**
   * Removes a user from the screen.
   *
   * @param user - The user to remove.
   */
  protected onRemoved(user: User): void {
    this.store.remove(user);
  }
}
