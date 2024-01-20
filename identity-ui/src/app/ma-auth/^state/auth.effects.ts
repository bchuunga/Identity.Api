import { Injectable } from '@angular/core';
import authActions from './auth.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { IdentityAppEnums } from '../../^enums/identity-app-enums';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private router: Router) {}

  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.login),
        tap((action) =>
          sessionStorage.setItem(
            IdentityAppEnums.CurrentUser,
            JSON.stringify(action.user)
          )
        )
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.logout),
        tap((action) => {
          sessionStorage.removeItem('user');
          this.router.navigateByUrl('/login');
        })
      ),
    { dispatch: false }
  );
}
