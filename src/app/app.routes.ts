import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home').then((m) => m.default),
  },
  {
    path: 'agenda',
    loadComponent: () => import('./pages/agenda/agenda').then((m) => m.default),
  },
  {
    path: 'speakers',
    loadComponent: () => import('./pages/speakers/speakers').then((m) => m.default),
  },
  {
    path: 'sponsor',
    loadComponent: () => import('./pages/sponsor/sponsor').then((m) => m.default),
  },
  {
    path: 'qa',
    loadComponent: () => import('./pages/qa/qa').then((m) => m.default),
  },
  {
    path: 'dp-generator',
    loadComponent: () => import('./pages/dp-generator/dp-generator').then((m) => m.default),
  },
  
];
