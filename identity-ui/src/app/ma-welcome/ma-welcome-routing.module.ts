import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaWelcomeComponent } from './ma-welcome/ma-welcome.component';

const routes: Routes = [
  {
    path: 'welcome',
    component: MaWelcomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaWelcomeRoutingModule {}
