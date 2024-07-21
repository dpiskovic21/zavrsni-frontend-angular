import { Routes } from '@angular/router';
import { zadatakRute } from './zadatak-rute';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: zadatakRute.Lista,
  },
  {
    path: zadatakRute.Lista,
    loadComponent: () =>
      import('../components/zadatak-lista/zadatak-lista.component').then(
        (c) => c.ZadatakListaComponent
      ),
  },
];
