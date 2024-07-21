import { Routes } from '@angular/router';
import { ProjektRute } from './projekt-rute';

export const projektRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ProjektRute.Lista,
  },
  {
    path: ProjektRute.Lista,
    loadComponent: () =>
      import('../components/projekt-lista/projekt-lista.component').then(
        (c) => c.ProjektListaComponent
      ),
  },
  {
    path: ProjektRute.Novi,
    loadComponent: () =>
      import('../components/projekt-novi/projekt-novi.component').then(
        (c) => c.ProjektNoviComponent
      ),
  },
];
