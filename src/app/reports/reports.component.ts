import { Component, OnInit } from '@angular/core';
import {ReportModel} from "../models/report.model";
import {ReportService} from "./report.service";
import "rxjs/add/operator/take";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  providers:[ReportService]
})
export class ReportsComponent implements OnInit {
  public detailEndOfDay: ReportModel;
  public detailLastMonth: ReportModel;
  public detailLast3Months: ReportModel;
  public detailLastYear: ReportModel;
  constructor(private reportService:ReportService) { }

  ngOnInit() {
    this.reportService.getEndOfDayBrief()
      .take(1)
      .subscribe((data:any) => this.detailEndOfDay = data);
    this.reportService.getLastMonthBrief()
      .take(1)
      .subscribe((data) => this.detailLastMonth = data);
    this.reportService.getLast3MonthsBrief()
      .take(1)
      .subscribe((data) => this.detailLast3Months = data);
    this.reportService.getLastYear()
      .take(1)
      .subscribe((data) => this.detailLastYear = data);
  }
}
