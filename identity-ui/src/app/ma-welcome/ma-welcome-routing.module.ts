import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaWelcomeComponent } from './ma-welcome/ma-welcome.component';
import { MaAuthGuard } from '../ma-auth/ma-auth.guard';

const routes: Routes = [
  {
    path: 'welcome',
    component: MaWelcomeComponent,
    canActivate: [MaAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaWelcomeRoutingModule {}
