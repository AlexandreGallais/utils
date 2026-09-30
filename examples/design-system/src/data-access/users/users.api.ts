import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import type { User } from '../../models';

/** Access to the users of the back end: the only layer allowed to use HttpClient. */
@Service()
export class UsersApi {
  private readonly http = inject(HttpClient);

  /**
   * Loads the users whose name contains a text.
   *
   * @param search - The text to look for, empty for every user.
   * @returns The matching users.
   */
  public async search(search: string): Promise<readonly User[]> {
    return firstValueFrom(this.http.get<readonly User[]>('/api/users', { params: { search } }), {
      defaultValue: [],
    });
  }
}
