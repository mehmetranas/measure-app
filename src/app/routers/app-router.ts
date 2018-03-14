import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from '../auth/main.component';

const ROUTER: Routes = [
  {path: '', component: MainComponent,pathMatch:'full'},
  {path:"home", loadChildren: '../modules/home.module#HomeModule'},
  {path: '**', redirectTo:"/" },
];

export const appRouting = RouterModule.forRoot(ROUTER);
