import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaAuthRoutingModule } from './ma-auth-routing.module';
import { MaLoginComponent } from './ma-login/ma-login.component';
import { MaRegisterComponent } from './ma-register/ma-register.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MaLoginComponent, MaRegisterComponent],
  imports: [CommonModule, MaAuthRoutingModule, SharedModule],
})
export class MaAuthModule {}
