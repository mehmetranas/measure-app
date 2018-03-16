import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {CustomerModel} from '../models/customer.model';
import {Router} from '@angular/router';
import {CustomerAddComponent} from '../dialogs/customer-add.component';
import {CustomerService} from './customer.service';
import {LazyLoadEvent} from 'primeng/api';

@Component({
  selector: 'app-customer-list',
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <div class="app-header">
            <table style="width: 100%">
              <tr>
                <td>
                  <mat-form-field>
                    <input matInput (keyup)="applyFilter($event.target.value)" placeholder="Ara...">
                    <mat-icon matPrefix>search</mat-icon>
                  </mat-form-field>
                </td>
                <td>
                  <button mat-icon-button matSuffix color="accent" (click)="addNewCustomer()">
                    <mat-icon>add_circle</mat-icon>
                  </button>
                </td>
              </tr>
            </table>
          </div>

          <p-table [columns]="cols"
                   [value]="customers"
                   [lazy]="true"
                   [rows]="10"
                   [rowHover]="true"
                   [(selection)]="customerInProcess"
                   [paginator]="true"
                   [loading]="isPending"
                   [rowsPerPageOptions]="[5,10,20]"
                   [totalRecords]="totalRecords"
                   [autoLayout]="true"
                   (onLazyLoad)="loadCustomersLazy($event)">>
            <ng-template pTemplate="header" let-columns>
              <tr>
                <th *ngFor="let col of columns">
                  {{col.header}}
                </th>
                <th>Kampanya</th>
              </tr>
            </ng-template>
            <ng-template pTemplate="body" let-rowData let-columns="columns">
              <tr>
                <td *ngFor="let col of columns">
                  {{rowData[col.field]}}
                </td>
                <td class="text-center">
                  <mat-icon [color]="rowData.newsletterAccepted ? 'accent':''">
                    {{ rowData.newsletterAccepted ? 'check_box' : 'indeterminate_check_box' }}
                  </mat-icon>
                </td>
              </tr>
            </ng-template>
            <ng-template pTemplate="summary">
              <div *ngIf="!isPending" class="alert alert-light" role="alert">
                {{ totalRecords >0 ? 'Toplam kayıtlı müşteri adedi: '+ totalRecords:'Kayıtlı müşteriniz bulunmuyor' }}
              </div>
            </ng-template>
          </p-table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      min-width: 300px;
    }

    .app-header {
      min-height: 64px;
      padding: 8px 24px 0;
    }

    .mat-form-field {
      font-size: 14px;
      width: 100%;
    }
    
    mat-icon{
      font-size: 30px;
    }
    .mat-table {
      overflow: auto;
      max-height: 500px;
    }
  `]
})
export class CustomerListComponent implements OnInit{
  public customers: CustomerModel[] = [];
  public cols: any[] = [];
  public isPending = false;
  public customerInProcess: CustomerModel;
  public isRateLimitReached = false;
  public totalRecords: any;

  constructor(private router:Router,
              private customerService: CustomerService,
              private changeDetector: ChangeDetectorRef,
              private dialog:MatDialog) {
  }

  ngOnInit() {
        this.cols = [
          {field:"nameSurname",header :"İsim"},
          {field:"mobilePhone",header:"Tel 1"},
          {field:"fixedPhone",header:"Tel 2"},
          {field:"address",header:"Adres"}
        ];
  }

  ngAfterViewInit(){
    this.changeDetector.detectChanges();
  }

  public loadCustomersLazy(event: LazyLoadEvent) {
    this.isPending = true;
    this.customerService.getAll(event)
      .finally(() => this.isPending = false)
      .take(1)
      .subscribe((response:any) => {
        this.customers = response.customerDetailPage.content;
        this.totalRecords = response.customerDetailPage.totalElements;
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    // this.customers.filter = filterValue;
  }

  public addNewCustomer(){
    const dialogRef = this.dialog.open(CustomerAddComponent, {
      data:null,
      width:"30em",
      maxWidth:"40em"
    });
    dialogRef.afterClosed()
      .take(1)
      .subscribe((result:any) => {
        if(result)
        this.router.navigateByUrl("dashboard/order-form/"+result.id);
      })
  }

}
