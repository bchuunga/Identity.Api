import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AppEntity } from './app.models';
import { routerReducer } from '@ngrx/router-store';
import { isDevMode } from '@angular/core';
import { appReducers } from './app.reducer';

export const reducers: ActionReducerMap<AppEntity> = {
  router: routerReducer,
  app: appReducers,
};

export const metaReducers: MetaReducer<AppEntity>[] = isDevMode() ? [] : [];
