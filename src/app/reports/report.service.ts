import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ReportModel} from "../models/report.model";

const urlLastSevenDaysBrief = "https://measure-notebook-api.herokuapp.com/report/orders/lastSeven";
const urlOncomingMeasure = "https://measure-notebook-api.herokuapp.com/report/next/measure";
const urlOncomingDelivery = "https://measure-notebook-api.herokuapp.com/report/next/delivery";
const urlEndOfDayBrief = "https://measure-notebook-api.herokuapp.com/report/endOfDay";
const urlWeeksOfMonthBrief = "https://measure-notebook-api.herokuapp.com/report/weeksOfMonth/";
const urlLastThreeMonthsBrief = "https://measure-notebook-api.herokuapp.com/report/lastThreeMonth";
const urlYearBrief = "https://measure-notebook-api.herokuapp.com/report/";

@Injectable()
export class ReportService {
  constructor(private http: HttpClient) {
  }

  public getLastSevenDays() {
    return this.http.get(urlLastSevenDaysBrief)
      .map((data: any) => {
        if (data && data.reportDetailModel){
          const templates = this.createTemplateOfDate("day");
          return this.setAllDateToData(data.reportDetailModel,templates,"day")
        }
      });
  }

  public getOncomingMeasures() {
    return this.http.get(urlOncomingMeasure)
      .map((data: any) => data.orders);
  }

  public getOncomingDelivery() {
    return this.http.get(urlOncomingDelivery)
      .map((data: any) => data.orders);
  }

  public getEndOfDayBrief() {
    return this.http.get(urlEndOfDayBrief)
  }

  public getLastMonthBrief() {
    const currDate = new Date();
    return this.http.get(urlWeeksOfMonthBrief + (currDate.getMonth() + 1) + "/" + currDate.getFullYear())
      .map((data: any) => {
        if (data && data.reportDetailModel)
          return data.reportDetailModel;
      });
  }

  public getLast3MonthsBrief() {
    return this.http.get(urlLastThreeMonthsBrief)
      .map((data: any) => {
        if (data && data.reportDetailModel){
          const templates = this.createTemplateOfDate("month");
          return this.setAllDateToData(data.reportDetailModel,templates,"month")
        }
      });
  }

  public getLastYear() {
    const currYear = new Date().getFullYear();
    return this.http.get(urlYearBrief + currYear)
      .map((data: any) => {
        if (data && data.reportDetailModel){
          const templates = this.createTemplateOfDate("month");
          return this.setAllDateToData(data.reportDetailModel,templates,"month")
        }
      });
  }

  private setAllDateToData(response: ReportModel[], templates: ReportModel[], type: string) {
    let reports: ReportModel[] = [];
    templates.forEach((report: ReportModel) => {
      const responseReport = response.find((detail: ReportModel) => detail[type] === report[type]);
      if (responseReport) {
        responseReport.date = new Date(responseReport.year, responseReport.month - 1, responseReport.day);
        reports.push(responseReport);
      }
      else {
        report.count = 0;
        report.sum = 0;
        report.date = new Date(report.year, report.month, report.day);
        reports.push(report);
      }
    });
    return reports.reverse();
  }

  private createTemplateOfDate(type: string) {
    let reportTemplate: ReportModel[] = [];
    if (type === "day") {
      for (let i = 1; i < 8; i++) {
        const curr = new Date();
        curr.setDate(curr.getDate() - i);
        const report = new ReportModel();
        report.day = curr.getDate();
        report.month = curr.getMonth();
        report.year = curr.getFullYear();
        reportTemplate.push(report);
      }
    } else if (type === "month") {
      for (let i = 0; i < 12; i++) {
        const curr = new Date();
        curr.setDate(curr.getMonth() - i);
        const report = new ReportModel();
        report.day = curr.getDate();
        report.month = curr.getMonth();
        report.year = curr.getFullYear();
        reportTemplate.push(report);
      }
    }
    return reportTemplate;
  }
}
