import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaAuthRoutingModule } from './ma-auth-routing.module';
import { MaLoginComponent } from './ma-login/ma-login.component';
import { MaRegisterComponent } from './ma-register/ma-register.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './^state/auth.effects';
import { authFeatureKey, authReducer } from './^state/auth.reducer';

@NgModule({
  declarations: [MaLoginComponent, MaRegisterComponent],
  imports: [
    MaAuthRoutingModule,
    SharedModule,
    StoreModule.forFeature(authFeatureKey, authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class MaAuthModule {}
