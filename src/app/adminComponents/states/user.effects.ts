import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, mergeMap, map } from 'rxjs/operators';
import { ServiceService } from '../../services/service.service';
import { deleteUser, deleteUserSuccess, fetchUsers, fetchUsersSuccess } from './user.actions';

 

@Injectable()
export class UserEffects {
  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      mergeMap(({ userId }) =>
        this.serviceService.deleteUser(userId).pipe(
          mergeMap(() => [deleteUserSuccess({ user: { _id: userId } })])
        )
      )
    )
  );

  fetchUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchUsers),
      mergeMap(() =>
        this.serviceService.getUsers().pipe(
          tap(response => console.log(response.user)),
        map(response => fetchUsersSuccess({ users: response.user })),
        )
      )
    )
  );



  constructor(
    private actions$: Actions,
    private serviceService: ServiceService,
  ) {}
}
