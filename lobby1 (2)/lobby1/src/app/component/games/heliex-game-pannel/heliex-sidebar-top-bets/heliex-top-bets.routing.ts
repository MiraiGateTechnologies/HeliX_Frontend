import { Routes } from '@angular/router';

export const helixTopBets: Routes = [
    { path: 'monthly', loadComponent: () => import('./heliex-top-bets-monthly/heliex-top-bets-monthly.component').then(m => m.HeliexTopBetsMonthlyComponent) },
    { path: 'weekly', loadComponent: () => import('./heliex-top-bets-weekly/heliex-top-bets-weekly.component').then(m => m.HeliexTopBetsWeeklyComponent) },
    { path: 'daily', loadComponent: () => import('./heliex-top-bets-daily/heliex-top-bets-daily.component').then(m => m.HeliexTopBetsDailyComponent) }
  ];
  
  