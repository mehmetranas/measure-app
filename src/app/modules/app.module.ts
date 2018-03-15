import { NgModule, isDevMode} from '@angular/core';
import {DevToolsExtension, NgRedux, NgReduxModule} from '@angular-redux/store';
import { AppComponent } from '../app.component';
import {IAppState, Initial_States, rootReducer} from '../redux/stores/app.store';
import {sidenavRouting} from '../routers/sidenav.router';
import {CustomerService} from '../customer/customer.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {toolbarRouting} from '../toolbar/toolbar.router';
import {AuthService} from '../user/services/login.service';
import {AppInterceptor} from '../app.interceptor';
import {OrderService} from '../order-form/order.service';
import {OrderlineService} from '../order-line-form/orderline.service';
import {StepperService} from '../order-form/stepper.service';
import {OrderlinePropertyService} from '../order-line-form/orderline-property.service';
import {OrderlineFormService} from '../order-line-form/orderline-form.service';
import {SharedModule} from './shared.module';
import {DialogModule} from './dialog.module';
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
import {CustomerAddComponent} from '../dialogs/customer-add.component';

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
