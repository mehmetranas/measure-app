import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from '../user/login/login.component';

const ROUTER: Routes = [
  {path: 'login', component: LoginComponent }
];

export const toolbarRouting = RouterModule.forRoot(ROUTER);
