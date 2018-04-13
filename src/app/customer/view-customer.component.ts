import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CustomerModel} from '../models/customer.model';

@Component({
  selector: 'app-view-customer',
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <mat-card>
            <mat-card-content>
              <div fxLayout="column" fxLayoutAlign="start none" fxLayoutGap="20px">
                <div fxLayout="column" fxLayoutAlign="center stretch" fxLayoutGap="20px">
                  <div fxLayout="row" fxLayoutAlign="space-between center">
                    <div><span class="text-capitalize font-weight-bold">Ad:&nbsp;</span><span>Ahmet Kaya</span></div>
                    <div><span class="text-capitalize font-weight-bold">Tel 1:&nbsp;</span><span>546464465</span></div>
                    <div><span class="text-capitalize font-weight-bold">Tel 2:&nbsp;</span><span>2121544564</span></div>
                  </div>
                  <div>
                    <span class="text-capitalize font-weight-bold">Adres:&nbsp;</span>
                    <span>Adresim Adresim Adresim AdresimAdresim Adresim Adresim AdresimAdresim Adresim Adresim Adresim</span>
                  </div>
                </div>
                <div fxLayout="column" fxLayoutAlign="none">
                  <div class="title"></div>
                  <div class="detail" fxLayout="row" fxLayoutAlign="space-around none">
                    <div>
                      <div><mat-icon>format_list_numbered</mat-icon></div>
                      <div>
                        25 Adet
                      </div>
                    </div>
                    <div>
                      <div><mat-icon>account_balance_wallet</mat-icon></div>
                      <div>
                        {{ 2500 | currency:"TRY":"symbol-narrow":"1.0-0":"tr" }}
                      </div>
                    </div>
                    <div>
                      <div><mat-icon>assignment</mat-icon></div>
                      <div>
                        {{ 500 | currency:"TRY":"symbol-narrow":"1.0-0":"tr" }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>      
        </div>
      </div>
    </div>
    
    

   

    <!--<div class="row justify-content-center">-->
      <!--<div class="col-md-8">-->
        <!--<mat-card class="customer-card">-->
          <!--<mat-card-content>-->
            <!--<ul class="list-group list-group-flush">-->
              <!--<li class="list-group-item flex-items">-->
                <!--<span><i class="fa fa-user-circle"></i> &nbsp; {{customer.nameSurname | uppercase}} &nbsp;</span>-->
                <!--<span class="fill-remaining-space"></span>-->
                <!--<span><i class="fa fa-mobile"></i> &nbsp; {{ customer.mobilePhone }} &nbsp;</span>-->
                <!--<span><i class="fa fa-phone"></i> &nbsp; {{ customer.fixedPhone }}</span>-->
              <!--</li>-->
              <!--<li class="list-group-item">-->
                <!--<span class="fa fa-map-marker"></span> &nbsp; {{customer.address}}-->
              <!--</li>-->
            <!--</ul>-->
          <!--</mat-card-content>-->
        <!--</mat-card>-->
        <!--<hr>-->
      <!--</div>-->
    <!--</div>-->
  <!--</div>-->
  `,
  styles: [`
   .mat-icon{
     font-size: 48px;
   }
    /*.customer-card {*/
     /*width: 100%;*/
    /*}*/
    /*.flex-items{*/
      /*display: flex;*/
    /*}*/
    /*.fill-remaining-space{*/
      /*flex: 1 1 auto;*/
    /*}*/
  `]
})
export class ViewCustomerComponent implements OnInit {
  @Input() customer: CustomerModel = new CustomerModel(null);

  constructor() { }

  ngOnInit() {
  }
}
