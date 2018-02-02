import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode} from '@angular/core';
import {DevToolsExtension, NgRedux, NgReduxModule} from '@angular-redux/store';


import { AppComponent } from './app.component';
import {MaterialModule} from './material.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FooterComponent } from './footer/footer.component';
import {IAppState, Initial_States, rootReducer} from './redux/stores/app.store';
import { OrderComponent } from './order/order.component';
import {sidenavRouting} from './sidenav/sidenav.router';
import { WalletComponent } from './wallet/wallet.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { CampaignComponent } from './campaign/campaign.component';
import { ReportsComponent } from './reports/reports.component';
import { CustomerComponent } from './customer/customer.component';
import {FormsModule} from '@angular/forms';
import {CustomerService} from './customer/customer.service';
import { OrderFormComponent } from './order-form/order-form.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { MeasureFormComponent } from './measure-form/measure-form.component';
import {LocationService} from './order-form/location.service';
import {ProductService} from './order-form/product.service';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import {toolbarRouting} from './toolbar/toolbar.router';
import {AuthService} from './user/services/login.service';
import {AppInterceptor} from './app.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SidenavComponent,
    FooterComponent,
    OrderComponent,
    WalletComponent,
    CampaignsComponent,
    CampaignComponent,
    ReportsComponent,
    CustomerComponent,
    OrderFormComponent,
    MeasureFormComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    NgReduxModule,
    sidenavRouting,
    toolbarRouting,
    HttpClientModule
  ],
  providers: [
    CustomerService,
    LocationService,
    ProductService,
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
  }
}
