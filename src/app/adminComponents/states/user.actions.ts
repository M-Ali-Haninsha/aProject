import { createAction, props } from '@ngrx/store';
import  UserModel  from '../../models/userModel';

export const deleteUser = createAction(
    '[User] Delete User',
    props<{ userId: any }>()
  );
  
  export const deleteUserSuccess = createAction(
    '[User] Delete User Success',
    props<{ user: any }>()
  );

  export const fetchUsers = createAction('[User] Fetch Users');

  export const fetchUsersSuccess = createAction(
    '[User] Fetch Users Success',
    props<{ users: UserModel[] }>()
  );