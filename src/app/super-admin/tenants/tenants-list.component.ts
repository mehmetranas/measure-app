import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatTableDataSource} from "@angular/material";
import {TenantModel} from "../models/tenant.model";
import {TenantService} from "../services/tenant.service";
import "rxjs/add/operator/take";
import {UserModel} from "../../models/user.model";
import {UserAddComponent} from "../../settings/user-add.component";
import {UserAddFormComponent} from "../../dialogs/user/user-add-form.component";

@Component({
  selector: 'app-tenants-list',
  templateUrl: './tenants-list.component.html',
  styleUrls: ['./tenants-list.component.css'],
  providers:[TenantService]
})
export class TenantsListComponent implements OnInit, AfterViewInit {
  public displayedColumns = ['Id', 'Name', 'Phone', 'email','User Count','State','Actions'];
  public dataSource = new MatTableDataSource<TenantModel>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private tenantService:TenantService,private dialog:MatDialog) { }

  ngOnInit() {
    this.fetchTenants();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = "Sayfa başı kayıt";
    this.paginator._intl.previousPageLabel= "Önceki";
    this.paginator._intl.nextPageLabel= "Sonraki";
    this.paginator._intl.getRangeLabel =
      (page:number,pageSize:number,length:number) => `${length} kayıt için ${page*pageSize + 1} ile ${(page*pageSize)+pageSize} arası`;
  }

  private fetchTenants() {
    this.tenantService.tenants()
      .take(1)
      .subscribe((data:any) => {
        this.dataSource.data = data
      })
  }

  public addAdmin(id: any) {
    const user = new UserModel();
    user.companyDetailModel.id = id;
    this.dialog.open(UserAddFormComponent,{
      data:user
    })

  }
}
