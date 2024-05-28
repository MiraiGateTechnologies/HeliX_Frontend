import {Routes} from "@angular/router";
import { AuthGuard } from "../../guard/auth.guard";


export const GamesRouter: Routes = [
  {
    path: 'helix',canActivate:[AuthGuard],
    loadComponent: () => import('./heliex-game-pannel/heliex-game-pannel.component').then(mod => mod.HeliexGamePannelComponent)
  },
  {
    path: 'catFish',
    loadComponent: () => import ('./catfish/catfish/catfish.component').then(mod => mod.CatfishComponent)
  }
]
