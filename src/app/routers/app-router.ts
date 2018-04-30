import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from '../auth/main.component';
import {TailorGuard} from '../auth/tailor.guard';
import {UserGuardActivateGuard} from '../auth/auth-guard-activate.guard';
import {TailorActivateGuard} from '../auth/tailor-activate.guard';
import {UserGuardService} from '../auth/user-guard.service';
import {SuperLoginComponent} from "../super-admin/super-login.component";
import {SuperAuthGuardGuard} from "../super-admin/services/super-auth-guard.guard";

const ROUTER: Routes = [
  {path: 'auth', component: MainComponent, pathMatch: 'full'},
  {path: 'super/auth', component: SuperLoginComponent , pathMatch: 'full'},
  {path: 'user',
    loadChildren: 'app/modules/home.module#HomeModule',
    canLoad: [UserGuardService],
    canActivate: [UserGuardActivateGuard]
  },
  {path: 'tailor',
    loadChildren: 'app/modules/tailor.module#TailorModule',
    canLoad: [TailorGuard],
    canActivate: [TailorActivateGuard]
  },
  {path: 'super/tenants',
    loadChildren: 'app/super-admin/home.module#HomeModule',
    canLoad:[SuperAuthGuardGuard],
    canActivate:[SuperAuthGuardGuard]
  },
  {path: '**', redirectTo: 'auth' },
];

export const appRouting = RouterModule.forRoot(ROUTER);
