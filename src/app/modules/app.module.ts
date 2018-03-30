import { NgModule, isDevMode} from '@angular/core';
import {DevToolsExtension, NgRedux, NgReduxModule} from '@angular-redux/store';
import { AppComponent } from '../app.component';
import {IAppState, Initial_States, rootReducer} from '../redux/stores/app.store';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthService} from '../user/services/login.service';
import {AppInterceptor} from '../app.interceptor';
import {RouterModule} from '@angular/router';
import {MainComponent} from '../auth/main.component';
import { LoginComponent } from '../auth/login.component';
import {appRouting} from '../routers/app-router';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './material.module';
import {PrimengModule} from './primeng.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToolbarComponent} from '../toolbar/toolbar.component';
import {SidenavComponent} from '../sidenav/sidenav.component';
import {AuthGuardService} from '../auth/auth-guard.service';
import {TailorGuard} from "../auth/tailor.guard";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    SidenavComponent,
    ToolbarComponent
  ],
  imports: [
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    PrimengModule,
    NgReduxModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    appRouting
  ],
  providers: [
    AuthService,
    AuthGuardService,
    TailorGuard,
    { provide:HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>, devTools: DevToolsExtension) {
    const enhancer = isDevMode() ? [devTools.enhancer()] : [];
      ngRedux.configureStore(rootReducer, Initial_States, [], enhancer);
    //   ngRedux.configureStore(rootReducer, Initial_States);
  }
}
