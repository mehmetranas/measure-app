import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from './material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PrimengModule} from './primeng.module';
import {NgReduxModule} from '@angular-redux/store';
import {HttpClientModule} from '@angular/common/http';
import {ToolbarComponent} from '../toolbar/toolbar.component';
import {RouterModule} from '@angular/router';
import {SidenavComponent} from '../sidenav/sidenav.component';
import {OrderlineComponent} from '../orderline/orderline.component';
import {OrderlineViewComponent} from '../orderline/orderline-view/orderline-view.component';
import {CustomerFormComponent} from '../customer/customer-form.component';
import {DialogModule} from './dialog.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgReduxModule,
    MaterialModule,
    HttpClientModule,
    PrimengModule
  ],
  declarations: [
    OrderlineComponent,
    OrderlineViewComponent,
    CustomerFormComponent
  ],
  exports: [
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    NgReduxModule,
    HttpClientModule,
    PrimengModule,
    OrderlineComponent,
    OrderlineViewComponent,
    CustomerFormComponent
  ]
})
export class SharedModule { }
