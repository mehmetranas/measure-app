import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatTableDataSource} from "@angular/material";
import {UserModel} from "../../models/user.model";
import {SettingsService} from "../settings.service";
import {finalize, switchMap, take, takeWhile} from "rxjs/operators";
import {Subscription} from "rxjs/Subscription";
import {ConfirmDialogComponent} from "../../dialogs/confirm-dialog.component";
import {Observable} from "rxjs/Observable";
import {UserAddFormComponent} from "../../dialogs/user/user-add-form.component";

@Component({
  selector: 'app-tenant-users-list',
  templateUrl: './tenant-users-list.component.html',
  styleUrls: ['./tenant-users-list.component.css']
})
export class TenantUsersListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns = ['Name', 'Phone', 'email','State','Role','Actions'];
  public dataSource = new MatTableDataSource<UserModel>();
  public isPending = false;
  private sub: Subscription;


  constructor(private userService:SettingsService,private dialog:MatDialog) { }

  ngOnInit() {
    this.sub = this.userService.users$
      .subscribe((users:UserModel[]) => {
        if(users === null) this.fetchUsers();
        else
        this.dataSource.data = users;
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = "Sayfa başı kayıt";
      this.paginator._intl.previousPageLabel= "Önceki";
      this.paginator._intl.nextPageLabel= "Sonraki";
      this.paginator._intl.getRangeLabel =
        (page:number,pageSize:number,length:number) => `${length} kayıt için ${page*pageSize + 1} ile ${(page*pageSize)+pageSize} arası`;
  }

  ngOnDestroy(){
    if(this.sub) this.sub.unsubscribe();
  }

  public addUser(){
    const dialogRef = this.dialog.open(UserAddFormComponent, {
      data: {
        user: new UserModel(),
        isEdit: false,
      },
      autoFocus: true
    });
    dialogRef.afterClosed()
      .takeWhile(data => data)
      .switchMap((data: any) => {
        const user = {...data.user};
        this.isPending = true;
        return this.userService.registerUser(user)
          .pipe(
            take(1),
            finalize(() => this.isPending = false)
          )
      })
      .subscribe()

  }

  public deleteUser(user:UserModel){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data:{
        message:`${user.nameSurname} adlı kullanıcıyı silmek istediğinizden emin misiniz?`
      }
    });
    dialogRef.afterClosed()
      .pipe(
        takeWhile(data => data && data.answer),
        switchMap((data:any) => {
            this.isPending = true;
            return this.userService.deleteUser(user.id);
        }),
        take(1),
        finalize(() => this.isPending = false)
      )
      .subscribe()
  }

  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  private fetchUsers() {
    this.isPending = true;
   this.userService.getTenantUsers()
     .pipe(
       finalize(() => this.isPending = false)
     )
     .subscribe();
  }
}
