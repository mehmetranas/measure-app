import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgRedux, NgReduxModule} from '@angular-redux/store';


import { AppComponent } from './app.component';
import {MaterialModule} from './material.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FooterComponent } from './footer/footer.component';
import {IAppState, ISidenavState, rootReducer, sideNavReducer} from './sidenav.state';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SidenavComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    NgReduxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRduxSideNav: NgRedux<ISidenavState>) {
      ngRduxSideNav.configureStore(sideNavReducer, {isDisplay: false});
  }
}
