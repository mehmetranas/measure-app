import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {CustomerModel} from '../models/customer.model';
import {Router} from '@angular/router';
import {CustomerAddComponent} from '../dialogs/customer-add.component';

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
                    Müşteriler
                  </td>
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
            <div class="app-container mat-elevation-z8">

              <mat-table [dataSource]="dataSource" matSort>

                <!-- Name Column -->
                <ng-container matColumnDef="nameSurname">
                  <mat-header-cell *matHeaderCellDef mat-sort-header> Name </mat-header-cell>
                  <mat-cell *matCellDef="let row"> {{row.nameSurname}} </mat-cell>
                </ng-container>

                <!-- Progress Column -->
                <ng-container matColumnDef="mobilePhone">
                  <mat-header-cell *matHeaderCellDef mat-sort-header> Progress </mat-header-cell>
                  <mat-cell *matCellDef="let row"> {{row.mobilePhone}} </mat-cell>
                </ng-container>

                <!-- Color Column -->
                <ng-container matColumnDef="address">
                  <mat-header-cell *matHeaderCellDef mat-sort-header> Adres </mat-header-cell>
                  <mat-cell *matCellDef="let row"> {{row.address}} </mat-cell>
                </ng-container>

                <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
                <mat-row *matRowDef="let row; columns: displayedColumns;">
                </mat-row>
              </mat-table>

              <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]"></mat-paginator>
            </div>
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
export class CustomerListComponent {
  displayedColumns = ['nameSurname', 'mobilePhone', 'address',];
  dataSource: MatTableDataSource<CustomerModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router:Router,
              private dialog:MatDialog) {
    const customerData = {
      id:1,
      nameSurname:"Said",
      mobilePhone:"546854125",
      fixedPhone:"5461321",
      address:"Adresi adres daspodsad",
      newsletterAccepted: false
    };

    // Create 100 users
    const customers: CustomerModel[] = [customerData];
    this.dataSource = new MatTableDataSource(customers);
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
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
