import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, EventEmitter,
  Input,
  OnInit, Output,
  ViewChild
} from '@angular/core';
import {MatDialog, MatPaginator, MatTableDataSource} from "@angular/material";
import {TenantModel} from "../models/tenant.model";
import {TenantService} from "../services/tenant.service";
import "rxjs/add/operator/take";
import {UserModel} from "../../models/user.model";
import {UserAddFormComponent} from "../../dialogs/user/user-add-form.component";
import {Router} from "@angular/router";
import {finalize, take} from "rxjs/operators";
import "rxjs/add/operator/switchMap";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  selector: 'app-tenants-list',
  templateUrl: './tenants-list.component.html',
  styleUrls: ['./tenants-list.component.css']
})
export class TenantsListComponent implements OnInit, AfterViewInit {
  @Output() userAdd:EventEmitter<UserModel>  =new EventEmitter<UserModel>();
  @Input() tenants:TenantModel[];
  @Input() tenant$:BehaviorSubject<TenantModel> = new BehaviorSubject<TenantModel>(null); // to get update for data table
  @Input() isSingleRow = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private tenant:TenantModel;
  public displayedColumns = ['Id', 'Name', 'Phone', 'email','User Count','State','Actions'];
  public dataSource = new MatTableDataSource<TenantModel>();
  public isPending = false;

  constructor(private tenantService:TenantService,private dialog:MatDialog,private router:Router) { }

  ngOnInit() {
    if(this.tenants){
      this.dataSource.data = this.tenants;
    }else if(this.tenant$.getValue()){
      this.tenant$.subscribe((tenant:TenantModel) => {
        this.dataSource.data = [tenant];
        this.tenant = tenant;
      });
    }else{
      this.fetchTenants();
    }
  }

  ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    if(!this.isSingleRow){
      this.paginator._intl.itemsPerPageLabel = "Sayfa başı kayıt";
      this.paginator._intl.previousPageLabel= "Önceki";
      this.paginator._intl.nextPageLabel= "Sonraki";
      this.paginator._intl.getRangeLabel =
        (page:number,pageSize:number,length:number) => `${length} kayıt için ${page*pageSize + 1} ile ${(page*pageSize)+pageSize} arası`;
    }
  }

  private fetchTenants() {
    this.isPending = true;
    this.tenantService.tenants()
      .pipe(
        take(1),
        finalize(() => this.isPending = false)
      )
      .subscribe((data:any) => {
        this.tenants = data;
        this.dataSource.data = this.tenants;
      })
  }

  public addAdmin(id: any) {
    let user = new UserModel();
    user.companyDetailModel.id = id;
    user.enabled = true;
    this.dialog.open(UserAddFormComponent,{
      data:{
        user:user,
        isEdit:false
      }
    })
      .afterClosed()
      .takeWhile(data => data)
      .switchMap((data: any) => {
        user = {...data.user} ;
        this.isPending = true;
        return this.tenantService.registerAdmin(user)
          .pipe(
            take(1),
            finalize(() => this.isPending = false)
          )
      })
      .subscribe((userId:number) => {
        user.id = userId;
        user.role = 'r1';
        if(!this.isSingleRow){
          const index = this.tenants.findIndex((t:TenantModel) => t.id === id);
          if(index > -1){
            this.tenants[index].users.push(user);
            this.tenants[index].tenantUserCount++;
          }
        }else {
          this.tenant.users.push(user);
          this.tenant.tenantUserCount++;
          this.tenant$.next(this.tenant);
        }
      })
  }

  public goDetail(tenant:TenantModel){
    this.tenantService.tenantForDetail = tenant;
    this.router.navigate(['/super/tenant'])
  }

  public toggleBlock(tenant:TenantModel){
    if(tenant.enabled){
      this.block(tenant.id)
    }else{
      this.removeBlock(tenant.id)
    }
  }

  private removeBlock(id:number){
    if(id === null) return;
    this.isPending = true;
    this.tenantService.removeBlock(id)
      .pipe(
        take(1),
        finalize(() => this.isPending = false)
      )
      .subscribe(() => {
        const index = this.tenants.findIndex((tenant:TenantModel) => tenant.id === id);
        this.tenants[index].enabled = true;
      })
  }

  private block(id:number){
    if(id === null) return;
    this.isPending = true;
    this.tenantService.block(id)
      .pipe(
        take(1),
        finalize(() => this.isPending = false)
      )
      .subscribe(() => {
        const index = this.tenants.findIndex((tenant:TenantModel) => tenant.id === id);
        this.tenants[index].enabled = false;
      })
  }

  public hasAdmin(tenant:TenantModel) {console.log(tenant)
    return tenant.users.filter((u:UserModel) => u.role === 'r1').length > 0
  }

  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
