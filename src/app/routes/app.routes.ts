import { Routes } from '@angular/router';
import { AppRute } from './app-rute';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppRute.Autorizacija,
  },
  {
    path: AppRute.Autorizacija,
    loadChildren: () =>
      import('../autorizacija/routes/autorizacija.routes').then(
        (r) => r.autorizacijaRoutes
      ),
  },
  {
    path: AppRute.Projekt,
    loadChildren: () =>
      import('../projekt/routes/projekt.routes').then((r) => r.projektRoutes),
  },
  {
    path: AppRute.Statistika,
    loadChildren: () =>
      import('../statistika/routes/statistika.routes').then(
        (r) => r.statistikaRoutes
      ),
  },
  {
    path: AppRute.Admin,
    loadChildren: () =>
      import('../admin/routes/admin.routes').then((r) => r.adminRoutes),
  },
];
