import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode} from '@angular/core';
import {DevToolsExtension, NgRedux, NgReduxModule} from '@angular-redux/store';


import { AppComponent } from './app.component';
import {MaterialModule} from './material.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FooterComponent } from './footer/footer.component';
import {IAppState, Initial_States, rootReducer} from './app.store';
import { OrderComponent } from './order/order.component';
import {sidenavRouting} from './sidenav/sidenav.router';
import { WalletComponent } from './wallet/wallet.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { CampaignComponent } from './campaign/campaign.component';
import { ReportsComponent } from './reports/reports.component';
import { CustomerComponent } from './customer/customer.component';
import {FormsModule} from '@angular/forms';
import { CustomerCardComponent } from './customer-card/customer-card.component';
import {CustomerService} from './customer/customer.service';
import { OrderFormComponent } from './order-form/order-form.component';
import {HttpClientModule} from '@angular/common/http';


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
    CustomerCardComponent,
    OrderFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    NgReduxModule,
    sidenavRouting,
    HttpClientModule
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>, devTools: DevToolsExtension) {
    const enhancer = isDevMode() ? [devTools.enhancer()] : [];
      ngRedux.configureStore(rootReducer, Initial_States, [], enhancer);
  }
}
