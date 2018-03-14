import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './auth/main.component';
import {HomeComponent} from './home.component';

const ROUTER: Routes = [
  {path: '', component: MainComponent},
  {path:"home", component: HomeComponent},
  {path: '**', redirectTo:"/" },
];

export const appRouting = RouterModule.forRoot(ROUTER);
