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
    children: [
      {
        path: AdminRute.Korisnici,
        loadComponent: () =>
          import(
            '../components/admin-korisnici/admin-korisnici.component'
          ).then((m) => m.AdminKorisniciComponent),
      },
      {
        path: AdminRute.Projekti,
        loadComponent: () =>
          import('../components/admin-projekti/admin-projekti.component').then(
            (m) => m.AdminProjektiComponent
          ),
      },
      {
        path: AdminRute.Zadatci,
        loadComponent: () =>
          import('../components/admin-zadatci/admin-zadatci.component').then(
            (m) => m.AdminZadatciComponent
          ),
      },
      {
        path: AdminRute.Komentari,
        loadComponent: () =>
          import(
            '../components/admin-komentari/admin-komentari.component'
          ).then((m) => m.AdminKomentariComponent),
      },
      {
        path: AdminRute.Privitci,
        loadComponent: () =>
          import('../components/admin-privitci/admin-privitci.component').then(
            (m) => m.AdminPrivitciComponent
          ),
      },
    ],
  },
];
