import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaLoginComponent } from './ma-login/ma-login.component';
import { MaRegisterComponent } from './ma-register/ma-register.component';

const routes: Routes = [
  {
    path: 'login',
    component: MaLoginComponent,
  },
  {
    path: 'register',
    component: MaRegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaAuthRoutingModule {}
