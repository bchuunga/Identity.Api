import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { SharedModule } from './shared/shared.module';
import { MaWelcomeModule } from './ma-welcome/ma-welcome.module';
import { MaAuthModule } from './ma-auth/ma-auth.module';
import { MaHeaderComponent } from './layout/ma-header/ma-header.component';
import { MaFooterComponent } from './layout/ma-footer/ma-footer.component';
import { MaSidenavComponent } from './layout/ma-sidenav/ma-sidenav.component';
import { API_BASE_URL } from './shared/api';
import { metaReducers, reducers } from './^state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EntityDataModule } from '@ngrx/data';

export type IdentityAppConsts = 'CurrentUser' | 'CurrentRoute';

@NgModule({
  declarations: [
    AppComponent,
    MaHeaderComponent,
    MaFooterComponent,
    MaSidenavComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    MaWelcomeModule,
    MaAuthModule,
    MaAuthModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictActionSerializability: true,
        strictStateSerializability: true,
      },
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot({}),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal,
    }),
  ],
  providers: [
    {
      provide: API_BASE_URL,
      useValue: 'http://localhost:5133',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
