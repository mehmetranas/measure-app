import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from '../auth/main.component';
import {TailorGuard} from "../auth/tailor.guard";
import {UserGuardActivateGuard} from "../auth/auth-guard-activate.guard";
import {TailorActivateGuard} from "../auth/tailor-activate.guard";
import {UserGuardService} from "../auth/user-guard.service";

const ROUTER: Routes = [
  {path: 'auth', component: MainComponent,pathMatch:'full'},
  {path:'user',
    loadChildren: 'app/modules/home.module#HomeModule',
    canLoad:[UserGuardService],
    canActivate:[UserGuardActivateGuard]
  },
  {path:'tailor',
    loadChildren: 'app/modules/tailor.module#TailorModule',
    canLoad:[TailorGuard],
    canActivate:[TailorActivateGuard]
  },
  {path: '**', redirectTo:"auth" },
];

export const appRouting = RouterModule.forRoot(ROUTER);
