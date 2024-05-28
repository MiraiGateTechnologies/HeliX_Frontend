import {Routes} from '@angular/router';
import {AuthGuard} from './guard/auth.guard';
import {ValidateComponent} from "./component/validate/validate.component";

export const routes: Routes = [
  {
    path: '',
    component: ValidateComponent
  },
  {
    path: 'validate/:token/:providerId/:gameId',
    pathMatch: 'full',
    component: ValidateComponent
  },
  {
    path: 'game',
    canActivate: [AuthGuard],
    loadChildren: () => import('./component/games/games.routing').then(m => m.GamesRouter)
  },

];
