import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaWelcomeRoutingModule } from './ma-welcome-routing.module';
import { MaWelcomeComponent } from './ma-welcome/ma-welcome.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MaWelcomeComponent],
  imports: [MaWelcomeRoutingModule, SharedModule],
})
export class MaWelcomeModule {}
