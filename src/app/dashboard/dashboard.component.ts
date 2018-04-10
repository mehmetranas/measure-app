import {Component, OnInit} from '@angular/core';
import {ReportService} from "../reports/report.service";
import {ReportModel} from "../models/report.model";
import {OrderModel} from "../models/order.model";
import "rxjs/add/operator/take";
import "rxjs/add/observable/of";

import {orderStatus} from "../helpers";

@Component({
  selector: 'app-dashboard',
  templateUrl:'./dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[ReportService]
})
export class DashboardComponent implements OnInit {
  public reports: ReportModel[];
  public oncomingDeliveryOrders: OrderModel[] = [];
  public oncomingMeasureOrders: OrderModel[] = [];
  public orderStatus;
  constructor(private reportService:ReportService) {  }

  ngOnInit() {
    this.orderStatus = orderStatus;
    this.reportService.getLastSevenDays()
      .take(1)
      .subscribe((response:ReportModel[]) => {
        this.reports = response; console.log(this.reports)
      });

    this.reportService.getOncomingDelivery()
      .take(1)
      .subscribe((orders: OrderModel[]) => {
        this.oncomingDeliveryOrders = orders;
      });
    this.reportService.getOncomingMeasures()
      .take(1)
      .subscribe((orders: OrderModel[]) => {
        this.oncomingMeasureOrders = orders;
      });

  }
}
