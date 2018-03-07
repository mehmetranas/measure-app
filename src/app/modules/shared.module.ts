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

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgReduxModule,
    MaterialModule,
    HttpClientModule,
    PrimengModule
  ],
  declarations: [
    OrderlineComponent
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
    PrimengModule
  ]
})
export class SharedModule { }
