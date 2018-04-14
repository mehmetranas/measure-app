import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CustomerModel} from '../models/customer.model';

@Component({
  selector: 'app-view-customer',
  template: `
    <div class="container-fluid main">
      <div class="row">
        <div class="col-md-12">
          <mat-card>
            <mat-card-title>
              <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="20px">
                <i class="fa fa-user"></i>  
                <span>Ahmet Şafak</span>
              </div>
            </mat-card-title>
            <mat-card-subtitle>
              <div fxLayout="column" fxLayoutAlign="center stretch" fxLayoutGap="20px">
                <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="25px">
                  <mat-icon class="app-sm-icon">contact_phone</mat-icon>
                  <div><span>546464465</span></div>
                  <div><span>2121544564</span></div>
                </div>
                <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="25px">
                  <mat-icon class="app-sm-icon">location_on</mat-icon>
                  <div>
                    <span>Adresim Adresim Adresim AdresimAdresim Adresim Adresim AdresimAdresim Adresim Adresim Adresim</span>
                  </div>
                </div>
              </div>
            </mat-card-subtitle>
            <hr>
            <mat-card-content>
                  <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="25px">
                    <div><mat-icon class="app-sm-icon">account_balance_wallet</mat-icon></div>
                    <div style="width: 100%" fxLayout="row" fxLayoutAlign="space-evenly center">
                      <div class="detail" fxLayout="column">
                        <div class="app-wallet"><span>Sipariş Adedi</span></div>
                        <div>
                          25 Adet
                        </div>
                      </div>
                      <div class="detail" fxLayout="column">
                        <div class="app-wallet"><span>Tutar</span></div>
                        <div>
                          {{ 2500 | currency:"TRY":"symbol-narrow":"1.0-0":"tr" }}
                        </div>
                      </div>
                      <div class="detail" fxLayout="column">
                        <div class="app-wallet"><span>Ödenen</span></div>
                        <div>
                          {{ 1500 | currency:"TRY":"symbol-narrow":"1.0-0":"tr" }}
                        </div>
                      </div>
                      <div class="detail" fxLayout="column">
                        <div class="app-wallet"><span>Kalan</span></div>
                        <div>
                          {{ 500 | currency:"TRY":"symbol-narrow":"1.0-0":"tr" }}
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
   .mat-icon:not(.app-sm-icon){
     font-size: 48px;
   }
   .mat-card-subtitle{
     color:rgba(0, 0, 0, 0.71);
   }
   .main{
     margin-bottom: 20px;
     color: black;
   }
   .mat-card{
     background: linear-gradient(45deg,#dee2e600,#c0c0c0b8);
     color: black;
   }
   .app-wallet{
     border-bottom: 1px #000000 solid;
     font-weight: bold;
   }
   .detail{
     font-size: 1rem;
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
