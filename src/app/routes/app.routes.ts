import { Routes } from '@angular/router';
import { AppRute } from './app-rute';

export const routes: Routes = [
  {
    path: AppRute.Projekt,
    loadChildren: () =>
      import('../projekt/routes/projekt.routes').then((r) => r.projektRoutes),
  },
];
