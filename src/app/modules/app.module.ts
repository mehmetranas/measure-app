import { NgModule, isDevMode} from '@angular/core';
import {DevToolsExtension, NgRedux, NgReduxModule} from '@angular-redux/store';
import { AppComponent } from '../app.component';
import {IAppState, Initial_States, rootReducer} from '../redux/stores/app.store';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthService} from '../auth/services/login.service';
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
import {AuthGuardActivateGuard} from "../auth/auth-guard-activate.guard";
import {TailorActivateGuard} from "../auth/tailor-activate.guard";
import {AngularFireModule} from "angularfire2";
import {environment} from "../../environments/environment";
import {AngularFireAuthModule} from "angularfire2/auth";
import {MessagingService} from "../messaging.service";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {FlexLayoutModule} from "@angular/flex-layout";
import { RegistrationComponent } from '../auth/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    SidenavComponent,
    ToolbarComponent,
    RegistrationComponent
  ],
  imports: [
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    PrimengModule,
    NgReduxModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    appRouting
  ],
  providers: [
    MessagingService,
    AuthService,
    AuthGuardService,
    AuthGuardActivateGuard,
    TailorGuard,
    TailorActivateGuard,
    { provide:HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>, devTools: DevToolsExtension) {
    // const enhancer = isDevMode() ? [devTools.enhancer()] : [];
    //   ngRedux.configureStore(rootReducer, Initial_States, [], enhancer);
      ngRedux.configureStore(rootReducer, Initial_States);
  }
}
