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
        this.reports = this.setAllDateToData(response);
        // this.setChart(this.reports);
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

  private setAllDateToData(response: ReportModel[]) {
    const templates = this.getLast7DateReportTemplate();
    let reports: ReportModel[] = [];
    templates.forEach((report:ReportModel) => {
      const responseReport = response.find((detail:ReportModel) => detail.day === report.day);
      if (responseReport){
        responseReport.date = new Date(responseReport.year,responseReport.month-1,responseReport.day);
        reports.push(responseReport);
      }
      else{
        report.count = 0;
        report.sum = 0;
        report.date = new Date(report.year,report.month,report.day);
        reports.push(report);
      }
    });
    return reports.reverse();
  }

  private getLast7DateReportTemplate(){
    let last7DateReportTemplate: ReportModel[] = [];
    for(let i = 1; i<8; i++){
      const curr = new Date();
      curr.setDate(curr.getDate() - i);
      const report = new ReportModel();
      report.day = curr.getDate();
      report.month= curr.getMonth();
      report.year= curr.getFullYear();
      last7DateReportTemplate.push(report);
    }
    return last7DateReportTemplate;
  }


}
