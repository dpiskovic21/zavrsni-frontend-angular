import { Routes } from '@angular/router';

export const statistikaRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('../components/statistika-home/statistika-home.component').then(
        (c) => c.StatistikaHomeComponent
      ),
  },
];
