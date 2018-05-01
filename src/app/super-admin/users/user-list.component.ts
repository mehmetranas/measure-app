import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserModel} from "../../models/user.model";
import {MatTableDataSource} from "@angular/material";
import {TenantModel} from "../models/models";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-user-list',
  template: `
    <div class="container-fluid">
      <div class="example-container mat-elevation-z8">
        <mat-table #table [dataSource]="dataSource">
          
          <ng-container matColumnDef="Id">
            <mat-header-cell *matHeaderCellDef> Id </mat-header-cell>
            <mat-cell *matCellDef="let user"> {{user.id}} </mat-cell>
          </ng-container>

          <ng-container matColumnDef="Name">
            <mat-header-cell *matHeaderCellDef>Ad - Soyad</mat-header-cell>
            <mat-cell *matCellDef="let user" class="text-capitalize">
              <div fxLayout="row" fxLayoutGap="3px">
                <mat-icon *ngIf="user.role === 'r1'" class="app-sm-icon" color="accent">star_rate</mat-icon>
                <span>{{user.nameSurname}}</span>
              </div>
            </mat-cell>
          </ng-container>

          <ng-container matColumnDef="Phone">
            <mat-header-cell *matHeaderCellDef> Telefon</mat-header-cell>
            <mat-cell *matCellDef="let user"> {{user.phone}} </mat-cell>
          </ng-container>

          <ng-container matColumnDef="email">
            <mat-header-cell *matHeaderCellDef> Mail </mat-header-cell>
            <mat-cell *matCellDef="let user"> {{user.email}} </mat-cell>
          </ng-container>

          <ng-container matColumnDef="Role">
            <mat-header-cell *matHeaderCellDef> Rol </mat-header-cell>
            <mat-cell *matCellDef="let user"> {{user.role | role}} </mat-cell>
          </ng-container>

          <ng-container matColumnDef="State">
            <mat-header-cell *matHeaderCellDef> Durum </mat-header-cell>
            <mat-cell *matCellDef="let user" [style.color]="user.enabled?'green':'red'"> {{user.enabled ? 'Aktif' : 'Silindi'}} </mat-cell>
          </ng-container>

          <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
          <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
        </mat-table>
      </div>
    </div>
  `,
  styles: []
})
export class UserListComponent implements OnInit, OnDestroy {
  @Input() tenants$:BehaviorSubject<TenantModel[]>;
  public isPending = false;
  public displayedColumns = ['Id', 'Name', 'Phone', 'email','Role','State'];
  public dataSource = new MatTableDataSource<UserModel>();
  private sub: Subscription;

  constructor() { }

  ngOnInit() {
    this.sub = this.tenants$
      .subscribe((tenants:TenantModel[] | null) => {
        if(tenants)
        this.dataSource.data = tenants[0].users;
      })
  }

  ngOnDestroy(){
    if(this.sub) this.sub.unsubscribe();
  }
}
