import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from "../../models/user.model";
import {MatTableDataSource} from "@angular/material";
import {finalize, take} from "rxjs/operators";
import {TenantService} from "../services/tenant.service";

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
            <mat-header-cell *matHeaderCellDef> Ad - Soyad</mat-header-cell>
            <mat-cell *matCellDef="let user"> {{user.nameSurname}} </mat-cell>
          </ng-container>

          <ng-container matColumnDef="Phone">
            <mat-header-cell *matHeaderCellDef> Telefon</mat-header-cell>
            <mat-cell *matCellDef="let user"> {{user.phone}} </mat-cell>
          </ng-container>

          <ng-container matColumnDef="email">
            <mat-header-cell *matHeaderCellDef> Mail </mat-header-cell>
            <mat-cell *matCellDef="let user"> {{user.email}} </mat-cell>
          </ng-container>

          <ng-container matColumnDef="State">
            <mat-header-cell *matHeaderCellDef> Durum </mat-header-cell>
            <mat-cell *matCellDef="let user" [style.color]="user.enabled?'green':'red'"> {{user.enabled ? 'Aktif' : 'Silindi'}} </mat-cell>
          </ng-container>

          <ng-container matColumnDef="Actions">
            <mat-header-cell *matHeaderCellDef> İşlem </mat-header-cell>
            <mat-cell *matCellDef="let user">
              <button *ngIf="user.enabled" mat-icon-button [matMenuTriggerFor]="menu">
                <mat-icon>more_vert</mat-icon>
              </button>
              <mat-menu #menu="matMenu">
                <button mat-menu-item (click)="deleteUser(user)">Sil</button>
              </mat-menu>
            </mat-cell>
          </ng-container>

          <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
          <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
        </mat-table>
      </div>

    </div>
  `,
  styles: []
})
export class UserListComponent implements OnInit {
  @Input() users:UserModel[];
  public isPending = false;
  public displayedColumns = ['Id', 'Name', 'Phone', 'email','State','Actions'];
  public dataSource = new MatTableDataSource<UserModel>();

  constructor(private tenantService:TenantService) { }

  ngOnInit() {
    if(this.users){
      this.dataSource.data = this.users;
    }
  }

  public deleteUser(id:number){
    if(id === null) return;
    this.isPending = true;
    this.tenantService.deleteUser(id)
      .pipe(
        take(1),
        finalize(() => this.isPending = false)
      )
      .subscribe(() => {
        const index = this.users.findIndex((user:UserModel) => user.id === id);
        this.users[index].enabled = false;
      })
    }
  }
