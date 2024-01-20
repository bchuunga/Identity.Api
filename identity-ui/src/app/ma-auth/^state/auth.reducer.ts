import authActions from './auth.actions';
import { User, UserDto } from '../../shared/api';
import { createReducer, on } from '@ngrx/store';
import AuthActions from './auth.actions';
import { AuthEntity } from './auth.models';

export const authFeatureKey = 'auth';

export interface AuthState extends AuthEntity {
  user?: UserDto;
}

export const initialAuthState: AuthState = {
  user: undefined,
};

export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.login, (state, action) => {
    return {
      user: action.user,
    };
  }),

  on(authActions.logout, (state, action) => {
    return {
      user: undefined,
    };
  })
);
