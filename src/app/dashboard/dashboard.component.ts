import {Component, OnInit} from '@angular/core';
import {ReportService} from "../reports/report.service";
import {ReportModel} from "../models/report.model";
import {OrderModel} from "../models/order.model";
import "rxjs/add/operator/take";
import "rxjs/add/observable/of";
import {orderStatus} from "../helpers";
import {MatTableDataSource} from "@angular/material";
import "rxjs/add/operator/finally";

@Component({
  selector: 'app-dashboard',
  templateUrl:'./dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[ReportService]
})
export class DashboardComponent implements OnInit {
  public reports: ReportModel[];
  public orderStatus;
  //Data Table
  public dataSourceMeasure: MatTableDataSource<OrderModel>;
  public dataSourceDelivery: MatTableDataSource<OrderModel>;
  public displayedColumnsMeasure = ["name","username","measureDate","status"];
  public displayedColumnsDelivery = ["name","username","deliveryDate","status"];
  public isPendingMeasure:boolean = false;
  public isPendingDelivery:boolean = false;

  constructor(private reportService:ReportService) {  }

  ngOnInit() {
    this.orderStatus = orderStatus;
    this.lastSevenDays
      .subscribe((response:ReportModel[]) => this.reports = response);
    this.oncomingDelivery
      .subscribe((orders: OrderModel[]) => {
        if(orders.length>0) {
          this.dataSourceDelivery = new MatTableDataSource<OrderModel>();
          this.dataSourceDelivery.data = orders;
        }
      });
    this.oncomingMeasures
      .subscribe((orders: OrderModel[]) => {
        if(orders.length > 0){
          this.dataSourceMeasure = new MatTableDataSource<OrderModel>();
          this.dataSourceMeasure.data = orders;
        }
      });
  }

  private get lastSevenDays(){
    return this.reportService.getLastSevenDays()
      .take(1)
  }

  private get oncomingDelivery(){
    this.isPendingDelivery = true;
    return this.reportService.getOncomingDelivery()
      .take(1)
      .finally(() => this.isPendingDelivery = false)
  }

  private get oncomingMeasures(){
    this.isPendingMeasure = true;
    return this.reportService.getOncomingMeasures()
      .take(1)
      .finally(() => this.isPendingMeasure = false);
  }
}
