import { Routes } from '@angular/router';
import { ProjektRute } from './projekt-rute';

export const projektRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ProjektRute.List,
  },
  {
    path: ProjektRute.List,
    loadComponent: () =>
      import('../components/projekt-lista/projekt-lista.component').then(
        (c) => c.ProjektListaComponent
      ),
  },
];
