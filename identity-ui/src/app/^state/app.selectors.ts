import { createFeatureSelector, createSelector } from '@ngrx/store';
import { appFeatureKey, AppState } from './app.reducer';

export const selectAppState = createFeatureSelector<AppState>(appFeatureKey);

export const getIsMobile = createSelector(selectAppState, (m) => m.isMobile);

export const getCurrentRoute = createSelector(
  selectAppState,
  (m) => m.currentRoute
);

const appSelectors = {
  getIsMobile,
};

export default appSelectors;
