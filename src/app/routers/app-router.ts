import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from '../auth/main.component';
import {SidenavComponent} from '../sidenav/sidenav.component';
import {AuthGuardService} from '../auth/auth-guard.service';

const ROUTER: Routes = [
  {path: '', component: MainComponent,pathMatch:'full'},
  {path:'dashboard',
    component:SidenavComponent,
    loadChildren: 'app/modules/home.module#HomeModule',
    canActivate:[AuthGuardService]},
  {path: '**', redirectTo:"/" },
];

export const appRouting = RouterModule.forRoot(ROUTER);
