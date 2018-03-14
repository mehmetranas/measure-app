import { NgModule } from '@angular/core';
import {SharedModule} from './shared.module';
import {sidenavRouting} from '../routers/sidenav.router';
import {DevToolsExtension, NgRedux} from '@angular-redux/store';
import {IAppState} from '../redux/stores/app.store';
import {RouterModule} from '@angular/router';
import {SidenavComponent} from '../sidenav/sidenav.component';
import {HomeComponent} from '../home.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    sidenavRouting
  ],
  declarations: [
    SidenavComponent,HomeComponent
  ]
})
export class HomeModule {
  constructor(ngRedux: NgRedux<IAppState>, devTools: DevToolsExtension) {
    // const enhancer = isDevMode() ? [devTools.enhancer()] : [];
    //   ngRedux.configureStore(rootReducer, Initial_States, [], enhancer);
    // ngRedux.configureStore(rootReducer, Initial_States);
  }
}
