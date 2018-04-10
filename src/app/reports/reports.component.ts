import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ReportModel} from "../models/report.model";
import {ReportService} from "./report.service";
import "rxjs/add/operator/take";
import {ChartComponent} from "../chart.component";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  providers:[ReportService]
})
export class ReportsComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  @Output() tableSource: ReportModel[];
  public endOfDay: ReportModel;
  public endOfDayBrief: ReportModel;
  public lastMonth: ReportModel[];
  public lastMonthBrief: ReportModel;
  public last3Months: ReportModel[];
  public last3MonthsBrief: ReportModel;
  public lastYear: ReportModel[];
  public lastYearBrief: ReportModel;

  constructor(private reportService:ReportService) { }

  ngOnInit() {
    this.reportService.getEndOfDayBrief()
      .take(1)
      .subscribe((data:any) => {
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

  private mergeReports(reports:ReportModel[]){
    let brief:ReportModel = new ReportModel();
    const sums = reports.map((r:ReportModel) => r.sum);
    const counts = reports.map((r:ReportModel) => r.count);
    brief.sum = sums.reduce((a,b) => a + b,0) || 0;
    brief.count = counts.reduce((a,b) => a + b,0) || 0;
    return brief;
  }

  public getDetail(value:string) {
    switch (value){
      case "lastMonth":
        this.chart.update(this.lastMonth,"Aylık Grafik","week");
        break;
      case "last3Months":
        this.chart.update(this.last3Months, "3 Aylık Grafik","month");
        break;
      case "lastYear":
        this.chart.update(this.lastYear, "Yıllık Grafik","month");
        break;
      default:
        break;
    }
  }
}
