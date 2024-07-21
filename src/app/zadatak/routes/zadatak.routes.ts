import { Routes } from '@angular/router';
import { ZadatakRute } from './zadatak-rute';

export const zadatakRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ZadatakRute.Lista,
  },
  {
    path: ZadatakRute.Lista,
    loadComponent: () =>
      import('../components/zadatak-lista/zadatak-lista.component').then(
        (c) => c.ZadatakListaComponent
      ),
  },
];
