import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {CustomerModel} from '../models/customer.model';
import {Router} from '@angular/router';
import {CustomerAddComponent} from '../dialogs/customer-add.component';
import {CustomerService} from './customer.service';
import {LazyLoadEvent} from 'primeng/api';
import {ConfirmDialogComponent} from '../dialogs/confirm-dialog.component';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/first';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-customer-list',
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <div class="ui-widget-header" style="padding:4px 10px;border-bottom: 0 none">
            <i class="fa fa-search" style="margin:4px 4px 0 0"></i>
            <input [formControl]="searchText" type="text" pInputText size="50"   placeholder="Ara">
            <button *ngIf="isFilter" pButton type="button" (click)="searchText.setValue('')" icon="fa-close" class="ui-button-warning"></button>
            <p-button (onClick)="addNewCustomer()" class="float-right" icon="fa fa-fw fa-plus" label="Yeni"></p-button>
          </div>
          <p-table [columns]="cols"
                   [value]="customers"
                   [lazy]="true"
                   [rows]="5"
                   [rowHover]="true"
                   [paginator]="true"
                   [loading]="isPending"
                   [rowsPerPageOptions]="[5,10,20]"
                   [totalRecords]="isFilter ? filterTotalRecords : totalRecords"
                   [autoLayout]="true"
                   (onLazyLoad)="isFilter  ? null : loadCustomersLazy($event)">
            <ng-template pTemplate="caption">
              Müşteri Listesi
            </ng-template>
            <ng-template pTemplate="header" let-columns>
              <tr>
                <th *ngFor="let col of columns">
                  {{col.header}}
                </th>
                <th class="text-center">Kampanya</th>
                <th style="width: 2em">İşlemler</th>
              </tr>
            </ng-template>
            <ng-template pTemplate="body" let-rowData let-columns="columns">
              <tr>
                <td *ngFor="let col of columns">
                  {{rowData[col.field]}}
                </td>
                <td class="text-center">
                  <ng-container *ngIf="rowData.newsletterAccepted; else notAccepted">
                    <i class="fa fa-check text-success"></i>
                  </ng-container>
                  <ng-template #notAccepted>
                    <i class="fa fa-times text-danger"></i>
                  </ng-template>
                  <!--<mat-icon [color]="rowData.newsletterAccepted ? 'accent':''">-->
                    <!--{{ rowData.newsletterAccepted ? 'check_box' : 'indeterminate_check_box' }}-->
                  <!--</mat-icon>-->
                </td>
                <td>
                  <button mat-icon-button [matMenuTriggerFor]="menu">
                    <mat-icon>more_vert</mat-icon>
                  </button>
                  <mat-menu #menu="matMenu">
                    <button mat-menu-item (click)="viewCustomer(rowData)">
                      <mat-icon>library_books</mat-icon>
                      <span>Detay</span>
                    </button>
                    <button mat-menu-item (click)="editCustomer(rowData)">
                      <mat-icon>mode_edit</mat-icon>
                      <span>Düzenle</span>
                    </button>
                    <button mat-menu-item (click)="addOrder(rowData)">
                      <mat-icon>library_add</mat-icon>
                      <span>Sipariş Ekle</span>
                    </button>
                    <button mat-menu-item (click)="getOrdersByCustomer(rowData)">
                      <mat-icon>assignment</mat-icon>
                      <span>Siparişleri Gör</span>
                    </button>
                    <button mat-menu-item (click)="deleteProcessConfirmation(rowData.id)">
                      <mat-icon>clear</mat-icon>
                      <span>Sil</span>
                    </button>
                  </mat-menu>
                </td>
              </tr>
            </ng-template>
            <ng-template pTemplate="summary">
              <div *ngIf="!isPending" class="alert alert-light" role="alert">
                <ng-container *ngIf="!isFilter; else filterMesagge">
                  {{ totalRecords > 0 ? 'Toplam kayıtlı müşteri: ' + totalRecords : 'Kayıtlı müşteriniz bulunmuyor' }}
                </ng-container>
                <ng-template #filterMesagge>
                  {{ filterTotalRecords > 0 ? 'Eşleşen kayıt: ' + filterTotalRecords : 'Eşleşen kayıt bulunamadı' }}
                </ng-template>
              </div>
            </ng-template>
          </p-table>
        </div>
      </div>
    </div>
  `,
  styles: [`

    table{
      table-layout: auto;
    }
    .mat-form-field {
      font-size: 14px;
      width: 100%;
    }
    .app-header {
      min-height: 64px;
      padding: 8px 24px 0;
    }
    mat-icon{
      font-size: 30px;
    }
  `]
})
export class CustomerListComponent implements OnInit, OnDestroy{
  public customers: CustomerModel[] = [];
  public searchText: FormControl;
  public cols: any[] = [];
  public isPending = false;
  public customerInProcess: CustomerModel;
  public isRateLimitReached = false;
  public totalRecords: any;
  public filterTotalRecords: any;
  private newCustomer: boolean;
  private subscribe: Subscription = new Subscription();
  public filterCustomers: CustomerModel[] = [];
  public isFilter: boolean = false;

  constructor(private router:Router,
              private customerService: CustomerService,
              private changeDetector: ChangeDetectorRef,
              private snackBar: MatSnackBar,
              private dialog:MatDialog) {
    this.searchText = new FormControl();
    this.subscribe = this.searchText.valueChanges
      .debounceTime(1500)
      .switchMap((text: string) => {
        this.isPending = true;
        this.isFilter = true;
        text = text.trim();
        if(!text) {
          this.isPending = false;
          this.isFilter = false;
          this.reloadComponent();
          return Observable.of({result:{customers:[]}})
        }
        return customerService.search(text)
          .finally(() => this.isPending = false)
          .takeWhile((res: any) => res.customers)
      })
      .subscribe((result: any) => {
        // if(result.customers.length === 0)
        if(!result.customers) return;
        this.customers = result.customers;
        this.filterTotalRecords = result.customers.length;
      })
  }

  ngOnInit() {
        this.cols = [
          {field:"nameSurname",header :"İsim"},
          {field:"mobilePhone",header:"Tel 1"},
          {field:"fixedPhone",header:"Tel 2"}
        ];
  }

  ngOnDestroy(){
    this.subscribe.unsubscribe();
  }

  ngAfterViewInit(){
    this.changeDetector.detectChanges();
  }

  private reloadComponent(){
    this.router.navigateByUrl('dashboard/orders', {skipLocationChange:true})
      .then(() =>  this.router.navigate(["dashboard/customers"]))
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

  public deleteProcessConfirmation(customerId: number) {
    const message = "Bu müşteriyi silmek istediğinizden emin misiniz?";
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {data:
          {message: message},
        width:"250"});
    dialogRef.afterClosed()
      .take(1)
      .subscribe((data:any) => {
        if(!data) return;
        if(data.answer) {
          this.delete(customerId);
        }
      });

  }

  public viewCustomer(customer: CustomerModel){
    const dialogRef = this.dialog.open(CustomerAddComponent, {
      data: {customer: customer, isView:true},
      width: "30em",
      maxWidth: "40em"
    });
    dialogRef.afterClosed()
      .take(1)
      .subscribe((data:any) => {
        if(data && data.customer)
          this.editCustomer(customer);
      })
  }

  public editCustomer(customer){
    this.newCustomer = false;
    this.customerInProcess = {...customer};
    const dialogRef = this.dialog.open(CustomerAddComponent, {
      data: {customer: customer},
      width: "30em",
      maxWidth: "40em"
    });
    dialogRef.afterClosed()
      .take(1)
      .subscribe((data:any) =>{
      if(!data.answer) return;
      this.update(data.customer)
    })
  }

  private update(customer: CustomerModel) {
    this.isPending = true;
    this.customerService.update(customer)
      .finally(() => this.isPending = false)
      .take(1)
      .subscribe((res) => {
        this.customers[this.findSelectedCustomerIndex()] = customer;
      })
  }

  private findSelectedCustomerIndex() {
    return this.customers.indexOf(this.customerInProcess);
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

  public addOrder(customer) {
    this.isPending = true;
    this.customerService.add(customer,null)
      .finally(() => this.isPending = false)
      .take(1)
      .subscribe((response:any) => {
      if(response.id)
        this.router.navigateByUrl("dashboard/order-form/"+response.id);
    })
  }

  public getOrdersByCustomer(rowData) {

  }

  private delete(customerId: number) {
    this.isPending = true;
    this.customerService.deleteById(customerId)
      .finally(() => this.isPending = false)
      .subscribe(() => {
        const index = this.customers.findIndex((o) => o.id === customerId);
        if(index > -1) this.customers.splice(index,1);
        this.totalRecords--;
        if(this.customers.length <=0 ) {
          this.reloadComponent();
        }
      });
  }
}
