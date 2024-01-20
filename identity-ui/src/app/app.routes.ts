import { Route } from '@angular/router';
import { MaNotFoundComponent } from './shared/components/ma-not-found/ma-not-found.component';

export const appRoutes: Route[] = [
  {
    path: 'not-found',
    component: MaNotFoundComponent,
  },
  {
    path: '**',
    component: MaNotFoundComponent,
    pathMatch: 'full',
  },
];
