import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import {NgRedux, NgReduxModule} from '@angular-redux/store';


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
import { AddNewMeasureComponent } from './add-new-measure/add-new-measure.component';
import { CustomerComponent } from './customer/customer.component';
import {FormsModule} from '@angular/forms';


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
    AddNewMeasureComponent,
    CustomerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    NgReduxModule,
    sidenavRouting
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
      ngRedux.configureStore(rootReducer, Initial_States);
  }
}
