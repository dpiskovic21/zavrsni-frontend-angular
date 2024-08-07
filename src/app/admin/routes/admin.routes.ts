import { Routes } from '@angular/router';
import { AdminRute } from './admin-rute';

export const adminRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AdminRute.AdminHome,
  },
  {
    path: AdminRute.AdminHome,
    loadComponent: () =>
      import('../components/admin-home/admin-home.component').then(
        (m) => m.AdminHomeComponent
      ),
  },
];
