import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home')
  },
  { 
    path: 'agenda', 
    loadComponent: () => import('./pages/agenda/agenda')
  },
  { 
    path: 'speakers', 
    loadComponent: () => import('./pages/speakers/speakers')
  },
  { 
    path: 'sponsor', 
    loadComponent: () => import('./pages/sponsor/sponsor')
  },
  { 
    path: 'qa', 
    loadComponent: () => import('./pages/qa/qa')
  },
  { 
    path: 'dp-generator', 
    loadComponent: () => import('./pages/dp-generator/dp-generator')
  },
  { path: '**', redirectTo: '/' }
];
