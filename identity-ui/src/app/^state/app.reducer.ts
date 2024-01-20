import { AppEntity } from './app.models';
import { createReducer, on } from '@ngrx/store';
import appActions from './app.actions';
import { CurrentRoute } from '../shared/api';

export const appFeatureKey = 'app';

export interface AppState extends AppEntity {
  isMobile: boolean;
  currentRoute?: CurrentRoute;
}

export const initialAppState: AppState = {
  isMobile: false,
  currentRoute: undefined,
};
export const appReducers = createReducer(
  initialAppState,
  on(appActions.isMobile, (state, action) => ({
    ...state,
    isMobile: action.isMobile,
  })),
  on(appActions.currentRoute, (state, action) => ({
    ...state,
    currentRoute: action.currentRoute,
  }))
);
