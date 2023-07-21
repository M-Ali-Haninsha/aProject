import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../../adminComponents/states/user.state';

export const getUserState = createFeatureSelector<UserState>('user');

export const getUsers = createSelector(
  getUserState,
  (state: UserState) => state.users
);
