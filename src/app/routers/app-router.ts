import {NoPreloading, PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {MainComponent} from '../auth/main.component';
import {SidenavComponent} from '../sidenav/sidenav.component';
import {AuthGuardService} from '../auth/auth-guard.service';
import {AdminGuard} from '../auth/admin.guard';
import {TailorViewComponent} from "../tailor-view/tailor-view.component";
import {TailorGuard} from "../auth/tailor.guard";
import {AuthGuardActivateGuard} from "../auth/auth-guard-activate.guard";
import {TailorActivateGuard} from "../auth/tailor-activate.guard";

const ROUTER: Routes = [
  {path: 'login', component: MainComponent,pathMatch:'full'},
  {path:'dashboard',
    component:SidenavComponent,
    loadChildren: 'app/modules/home.module#HomeModule',
    canLoad:[AuthGuardService],
    canActivate:[AuthGuardActivateGuard]
  },
  {path:'tailor',
    loadChildren: 'app/modules/tailor.module#TailorModule',
    canLoad:[TailorGuard],
    canActivate:[TailorActivateGuard]
  },
  {path: '**', redirectTo:"login" },
];

export const appRouting = RouterModule.forRoot(ROUTER);
