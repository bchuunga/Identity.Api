import { Component, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RoutesRecognized,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { filter, map, pairwise } from 'rxjs';
import appActions from './^state/app.actions';
import authActions from './ma-auth/^state/auth.actions';
import { IdentityAppEnums } from './^enums/identity-app-enums';

@Component({
  selector: 'identity-ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    this.loadCurrentUser();

    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(map((b) => b.matches))
      .subscribe((m) => {
        this.store.dispatch(appActions.isMobile({ isMobile: m }));
      });

    this.router.events.subscribe((event: any) => {
      switch (true) {
        case event instanceof NavigationStart: {
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          console.log(event);
          break;
        }
        default: {
          break;
        }
      }
    });

    this.router.events
      .pipe(
        filter((evt: any) => evt instanceof RoutesRecognized),
        pairwise()
      )
      .subscribe((events: RoutesRecognized[]) => {
        console.log(events[0].urlAfterRedirects);
        this.store.dispatch(
          appActions.currentRoute({
            currentRoute: {
              previous: events[0].urlAfterRedirects,
              current: events[1].urlAfterRedirects,
            },
          })
        );
      });
  }

  loadCurrentUser() {
    const user = sessionStorage.getItem(IdentityAppEnums.CurrentUser);
    if (user) {
      this.store.dispatch(authActions.login({ user: JSON.parse(user) }));
    }
  }
}
