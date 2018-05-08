import {
  AfterViewInit,
  Component, EventEmitter,
  Input, OnDestroy,
  OnInit, Output,
  ViewChild
} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatTableDataSource} from "@angular/material";
import {TenantModel} from "../models/models";
import {TenantService} from "../services/tenant.service";
import "rxjs/add/operator/take";
import {UserModel} from "../../models/user.model";
import {UserAddFormComponent} from "../../dialogs/user/user-add-form.component";
import {Router} from "@angular/router";
import {finalize, take} from "rxjs/operators";
import "rxjs/add/operator/switchMap";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {TenantAddComponent} from "../../dialog/user/tenant-add.component";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-tenants-list',
  templateUrl: './tenants-list.component.html',
  styleUrls: ['./tenants-list.component.css']
})
export class TenantsListComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() userAdd:EventEmitter<UserModel> = new EventEmitter<UserModel>();
  @Input() tenants$:BehaviorSubject<TenantModel[]>; // to get update for data table
  @Input() tenants:TenantModel[];
  @Input() isSingleRow = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns = ['Id', 'Name', 'Phone', 'email','User Count','State','Actions'];
  public dataSource = new MatTableDataSource<TenantModel>();
  public isPending = false;
  private sub: Subscription;

  constructor(private tenantService:TenantService,private dialog:MatDialog,private router:Router,private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.fetchTenants();
  }

  ngOnDestroy(){
    if(this.sub) this.sub.unsubscribe();
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
    if(!this.tenants$ || this.tenants$.getValue() == null){
    this.isPending = true;
    this.tenantService.tenants()
      .pipe(
        take(1),
        finalize(() => this.isPending = false)
      )
      .subscribe((data:any) => {
        this.tenantService.tenants$.next(data);
        this.tenants$ = this.tenantService.tenants$;
        this.listenService();
      })
    }else this.listenService();
  }

  public addAdmin(id: any) {
    let user = new UserModel();
    user.companyDetailModel.id = id;
    user.enabled = true;
    this.dialog.open(UserAddFormComponent,{
      data:{
        user:user,
        isEdit:false,
        addAdmin:true
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
        const index = this.tenants.findIndex((t:TenantModel) => t.id === id);
        if(index > -1){
          this.tenants[index].users.push(user);
          this.tenants[index].tenantUserCount++;
          this.updateTenantsOnClient(this.tenants[index]);
        }
        this.snackBar.open("Kullanıcı ekleme başarılı","Tamam",{duration:3000});
      });
  }

  public goDetail(tenant:TenantModel){
    this.tenantService.tenantsForDetail$.next([tenant]);
    // this.tenantService.tenantForDetail$.next(tenant);
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
        this.updateTenantsOnClient(this.tenants[index]);
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
        this.updateTenantsOnClient(this.tenants[index]);
      });
  }

  public addOrEditTenant(tenant?:TenantModel){
    const dialogRef = this.dialog.open(TenantAddComponent,{
      data:{
        tenant:tenant || null
      }
    });
    dialogRef.afterClosed()
      .takeWhile(data => data)
      .subscribe((data:any) => {
        const index = this.tenants.findIndex((t:TenantModel) => t.id === data.tenant.id);
        if(index>-1) this.updateTenantsOnClient(data.tenant);
        else this.tenants.push(data.tenant);
        this.tenantService.tenants$.next(this.tenants)
      })
  }

  public hasAdmin(tenant:TenantModel) {
    return tenant.users.filter((u:UserModel) => u.role === 'r1').length > 0;
  }

  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  private listenService() {
   this.sub = this.tenants$
      .subscribe((tenants:TenantModel[] | null) => {
        this.dataSource.data = tenants;
        this.tenants = tenants;
      })
  }

  private updateTenantsOnClient(tenant:TenantModel){
      const tenants = this.tenantService.tenants$.getValue();
      const index = tenants.findIndex((t:TenantModel) => t.id === tenant.id);
      if(index > -1) tenants[index] = tenant;
      this.tenantService.tenants$.next(tenants);
      if(this.tenantService.tenantsForDetail$.getValue() != null) this.tenantService.tenantsForDetail$.next([tenant]);
  }
}
