import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrderlineComponent} from '../orderline/orderline.component';
import {MaterialModule} from './material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DialogModule} from './dialog.module';
import {PrimengModule} from './primeng.module';
import {NgReduxModule} from '@angular-redux/store';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {ViewCustomerComponent} from '../customer/view-customer.component';
import { CustomerFormComponent } from '../customer/customer-form.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgReduxModule,
    MaterialModule,
    HttpClientModule,
    PrimengModule,
  ],
  declarations: [
    OrderlineComponent,
    ViewCustomerComponent,
    CustomerFormComponent
  ],
  exports: [
    CommonModule,
    OrderlineComponent,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgReduxModule,
    HttpClientModule,
    PrimengModule,
    ViewCustomerComponent,
    CustomerFormComponent,
  ]
})
export class SharedModule { }
