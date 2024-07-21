import { Routes } from '@angular/router';
import { AutorizacijaRoute } from './autorizacija-rute';

export const autorizacijaRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AutorizacijaRoute.Prijava,
  },
  {
    path: AutorizacijaRoute.Prijava,
    loadComponent: () =>
      import('../components/prijava/prijava.component').then(
        (c) => c.PrijavaComponent
      ),
  },
];
