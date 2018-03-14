import { NgModule } from '@angular/core';
import {SharedModule} from './shared.module';
import {sidenavRouting} from '../routers/sidenav.router';
import {DevToolsExtension, NgRedux} from '@angular-redux/store';
import {IAppState, Initial_States, rootReducer} from '../redux/stores/app.store';

@NgModule({
  imports: [
    SharedModule,
    sidenavRouting
  ],
  declarations: []
})
export class HomeModule {
  constructor(ngRedux: NgRedux<IAppState>, devTools: DevToolsExtension) {
    // const enhancer = isDevMode() ? [devTools.enhancer()] : [];
    //   ngRedux.configureStore(rootReducer, Initial_States, [], enhancer);
    // ngRedux.configureStore(rootReducer, Initial_States);
  }
}
