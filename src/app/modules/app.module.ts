import { NgModule} from '@angular/core';
import { AppComponent } from '../app.component';
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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TailorGuard} from '../auth/tailor.guard';
import {TailorActivateGuard} from '../auth/tailor-activate.guard';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../../environments/environment';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {FlexLayoutModule} from '@angular/flex-layout';
import localeTr from '@angular/common/locales/tr';
import {registerLocaleData} from '@angular/common';
import {UserGuardActivateGuard} from '../auth/auth-guard-activate.guard';
import {UserGuardService} from '../auth/user-guard.service';
import {SuperLoginComponent} from "../super-admin/super-login.component";
import {SuperAuthService} from "../super-admin/super-auth.service";


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    SuperLoginComponent
  ],
  imports: [
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    appRouting
  ],
  providers: [
    AuthService,
    SuperAuthService,
    UserGuardService,
    UserGuardActivateGuard,
    TailorGuard,
    TailorActivateGuard,
    { provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor() {
    registerLocaleData(localeTr, 'tr');
  }
}
