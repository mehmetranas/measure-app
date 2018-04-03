import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from '../auth/main.component';
import {SidenavComponent} from '../sidenav/sidenav.component';
import {AuthGuardService} from '../auth/auth-guard.service';
import {TailorGuard} from "../auth/tailor.guard";
import {AuthGuardActivateGuard} from "../auth/auth-guard-activate.guard";
import {TailorActivateGuard} from "../auth/tailor-activate.guard";

const ROUTER: Routes = [
  {path: 'auth', component: MainComponent,pathMatch:'full'},
  {path:'dashboard',
    loadChildren: 'app/modules/home.module#HomeModule',
    canLoad:[AuthGuardService],
    canActivate:[AuthGuardActivateGuard]
  },
  {path:'tailor',
    loadChildren: 'app/modules/tailor.module#TailorModule',
    canLoad:[TailorGuard],
    canActivate:[TailorActivateGuard]
  },
  {path: '**', redirectTo:"auth" },
];

export const appRouting = RouterModule.forRoot(ROUTER);
