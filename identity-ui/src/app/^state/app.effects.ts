import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import appActions from './app.actions';
import { tap } from 'rxjs';
import { IdentityAppEnums } from '../^enums/identity-app-enums';

@Injectable()
export class AppEffects {
  constructor(private readonly actions$: Actions) {}

  currentRoute$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(appActions.currentRoute),
        tap((action) => {
          sessionStorage.setItem(
            //IdentityAppEnums.CurrentRoute,
            'url',
            JSON.stringify(action.currentRoute)
          );
        })
      ),
    { dispatch: false }
  );
}
