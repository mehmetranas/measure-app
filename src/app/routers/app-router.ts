import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from '../auth/main.component';
import {SidenavComponent} from '../sidenav/sidenav.component';
import {AuthGuardService} from '../auth/auth-guard.service';
import {AdminGuard} from '../auth/admin.guard';
import {TailorViewComponent} from "../tailor-view/tailor-view.component";

const ROUTER: Routes = [
  {path: 'login', component: MainComponent,pathMatch:'full'},
  {path:'dashboard',
    component:SidenavComponent,
    loadChildren: 'app/modules/home.module#HomeModule',
    canLoad:[AuthGuardService]
  },
  {path:'tailor',
    loadChildren: 'app/modules/tailor.module#TailorModule'
  },
  {path: '**', redirectTo:"/login" },
];

export const appRouting = RouterModule.forRoot(ROUTER);
