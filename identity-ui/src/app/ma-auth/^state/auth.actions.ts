import { createAction, props } from '@ngrx/store';
import { User, UserDto } from '../../shared/api';

export const login = createAction(
  '[Login Page] User Login',
  props<{ user: UserDto }>()
);

export const logout = createAction('[Top Menu] Logout');

const authActions = {
  login,
  logout,
};

export default authActions;
