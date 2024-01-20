import { createAction, props } from '@ngrx/store';
import { CurrentRoute } from '../shared/api';

export const isMobile = createAction(
  '[App] Changed Viewport',
  props<{ isMobile: boolean }>()
);

export const currentRoute = createAction(
  '[App] Changed Route',
  props<{ currentRoute: CurrentRoute }>()
);

const appActions = {
  isMobile,
  currentRoute,
};

export default appActions;
