import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import * as fromApp from './^state/app.reducer';
import { AppEffects } from './^state/app.effects';
import { SharedModule } from './shared/shared.module';
import { MaWelcomeModule } from './ma-welcome/ma-welcome.module';
import { MaAuthModule } from './ma-auth/ma-auth.module';
import { MaHeaderComponent } from './layout/ma-header/ma-header.component';
import { MaFooterComponent } from './layout/ma-footer/ma-footer.component';
import { MaSidenavComponent } from './layout/ma-sidenav/ma-sidenav.component';

export const API_URL = new InjectionToken('API_URL');

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
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    StoreModule.forRoot(
      {},
      {
        metaReducers: [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forFeature(fromApp.APP_FEATURE_KEY, fromApp.appReducer),
    EffectsModule.forFeature([AppEffects]),
  ],
  providers: [
    {
      provide: API_URL,
      useValue: 'http://localhost:5133',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
