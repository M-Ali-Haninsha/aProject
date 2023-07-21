import { createReducer, on, Action } from '@ngrx/store';
import { deleteUser, deleteUserSuccess, fetchUsersSuccess } from '../../adminComponents/states/user.actions';
import { UserState } from '../../adminComponents/states/user.state';


export const initialState: UserState = {
  users: []
};

  export const userReducer = createReducer(
    initialState,
    on(deleteUserSuccess, (state, { user }) => ({
      ...state,
      users: state.users.filter(u => u._id !== user._id)
    })),
    on(fetchUsersSuccess, (state, { users }) => ({
        ...state,
        users: [...users]
      }))
  );

  

  export function reducer(state: UserState | undefined, action: Action) {
    return userReducer(state, action);
  }