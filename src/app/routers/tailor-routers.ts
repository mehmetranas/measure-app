import {RouterModule, Routes} from '@angular/router';
import {TailorViewComponent} from "../tailor-view/tailor-view.component";


const ROUTER: Routes = [
  {path: '', component: TailorViewComponent, pathMatch:'full'},
];

export const tailorRoute = RouterModule.forChild(ROUTER);
