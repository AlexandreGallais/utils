import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { UsersApi } from '../../data-access';
import type { User } from '../../models';

/** State of the users screen. */
interface UsersState {
  /** Users matching the search. */
  readonly users: readonly User[];
  /** Whether a search is running. */
  readonly isLoading: boolean;
}

const INITIAL_STATE: UsersState = { users: [], isLoading: false };

/** Users of the screen, loaded through the UsersApi; the state is changed only by its methods. */
export const UsersStore = signalStore(
  { providedIn: 'root' },
  withState(INITIAL_STATE),
  withMethods((store, api = inject(UsersApi)) => ({
    async search(text: string): Promise<void> {
      patchState(store, { isLoading: true });
      const users = await api.search(text);
      patchState(store, { users, isLoading: false });
    },
    remove(user: User): void {
      patchState(store, { users: store.users().filter(({ id }) => id !== user.id) });
    },
  })),
);
