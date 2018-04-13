import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {ReportModel} from "../models/report.model";
import {ReportService} from "./report.service";
import {ChartComponent} from "../chart.component";
import "rxjs/add/operator/take";
import {OrderModel} from "../models/order.model";
import {MatTableDataSource} from "@angular/material";
import "rxjs/add/operator/finally";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  providers: [ReportService]
})
export class ReportsComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  @Output() reports: ReportModel[];
  @Output() labelType: string;
  @Output() title: string;
  public tab: string;
  public isPending: boolean = false;
  public endOfDay: ReportModel;
  public endOfDayBrief: ReportModel;
  public lastMonth: ReportModel[];
  public lastMonthBrief: ReportModel;
  public last3Months: ReportModel[];
  public last3MonthsBrief: ReportModel;
  public lastYear: ReportModel[];
  public lastYearBrief: ReportModel;
  public selectedCard: string;
  //Data Table
  public displayedColumns = ["name", "username", "deliveryDate", "state", "total", "deposite", "remain"];
  public dataSource: MatTableDataSource<OrderModel>;

  constructor(private reportService: ReportService) {
  }

  ngOnInit() {
    this.reportService.getEndOfDayBrief()
      .take(1)
      .subscribe((data: any) => {
        this.endOfDay = data;
        this.endOfDayBrief = this.mergeReports(data);
      });
    this.reportService.getLastMonthBrief()
      .take(1)
      .subscribe((data) => {
        this.lastMonth = data;
        this.lastMonthBrief = this.mergeReports(data);
      });
    this.reportService.getLast3MonthsBrief()
      .take(1)
      .subscribe((data) => {
        this.last3Months = data;
        this.last3MonthsBrief = this.mergeReports(data);
      });
    this.reportService.getLastYear()
      .take(1)
      .subscribe((data) => {
        this.lastYear = data;
        this.lastYearBrief = this.mergeReports(data);
      });
  }

  public getEndOfDayOrders() {
    this.tab = "endOfDay";
    this.selectedCard = "endOfDay";
    if (!this.dataSource) {
      this.isPending = true;
      this.reportService.getEndOfDayOrders()
        .finally(() => this.isPending = false)
        .take(1)
        .subscribe((orders: OrderModel[]) => {
          this.dataSource = new MatTableDataSource<OrderModel>(orders);
        });
    }
  }

  private mergeReports(reports: ReportModel[]) {
    let brief: ReportModel = new ReportModel();
    const sums = reports.map((r: ReportModel) => r.sum);
    const counts = reports.map((r: ReportModel) => r.count);
    brief.sum = sums.reduce((a, b) => a + b, 0) || 0;
    brief.count = counts.reduce((a, b) => a + b, 0) || 0;
    return brief;
  }

  public getDetail(value: string) {console.log("click detail")
    switch (value) {
      case "lastMonth":
        this.title = "Son Ay";
        this.reports = this.lastMonth;
        this.labelType = "week";
        this.tab = "report";
        this.selectedCard = "lastMonth";
        if (this.chart) this.chart.update(this.lastMonth, this.title, this.labelType);
        break;
      case "last3Months":
        this.title = "3 Aylık";
        this.reports = this.last3Months;
        this.labelType = "month";
        this.tab = "report";
        this.selectedCard = "last3Months";
        if (this.chart) this.chart.update(this.last3Months, this.title, this.labelType);
        break;
      case "lastYear":
        this.title = "Yıllık";
        this.reports = this.lastYear;
        this.labelType = "month";
        this.tab = "report";
        this.selectedCard = "lastYear";
        if (this.chart) this.chart.update(this.lastYear, this.title, this.labelType);
        break;
      default:
        break;
    }
  }
}
