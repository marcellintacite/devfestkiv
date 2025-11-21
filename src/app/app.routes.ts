import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./site/site'),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./pages/home/home'),
      },
      {
        path: 'agenda',
        loadComponent: () => import('./pages/agenda/agenda'),
      },
      {
        path: 'speakers',
        loadComponent: () => import('./pages/speakers/speakers'),
      },
      {
        path: 'sponsor',
        loadComponent: () => import('./pages/sponsor/sponsor'),
      },
      {
        path: 'qa',
        loadComponent: () => import('./pages/qa/qa'),
      },
      {
        path: 'dp-generator',
        loadComponent: () => import('./pages/dp-generator/dp-generator'),
      },
    ],
  },
  {
    path: 'live_q',
    loadComponent: () => import('./live-question/live-question'),
    children: [
      {
        path: '',
        loadComponent: () => import('./live-question/components/home/home'),
      },
    ],
  },
  {
    path: 'live_q',
    loadComponent: () => import('./live-question/live-question'),
    children: [
      {
        path: '',
        loadComponent: () => import('./live-question/components/home/home'),
      },
      {
        path: 'admin',
        loadComponent: () => import('./live-question/components/admin/admin'),
      },
    ],
  },
  {
    path: 'question-space',
    loadComponent: () => import('./live-question/components/question-space/question-space'),
  },
  {
    path: 'presenter',
    loadComponent: () => import('./live-question/components/presentation/presentation'),
  },
  { path: '**', redirectTo: '/' },
];
