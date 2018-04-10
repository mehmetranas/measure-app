import { Injectable } from '@angular/core';
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

  constructor(private http: HttpClient) { }

  public getLastSevenDays(){
    return this.http.get(urlLastSevenDaysBrief)
      .map((data:any) => data.reportDetailModel);
  }

  public getOncomingMeasures(){
    return this.http.get(urlOncomingMeasure)
      .map((data:any) => data.orders);
  }

  public getOncomingDelivery(){
    return this.http.get(urlOncomingDelivery)
      .map((data:any) => data.orders);
  }

  public getEndOfDayBrief(){
    return this.http.get(urlEndOfDayBrief)
  }

  public getLastMonthBrief(){
    const currDate = new Date();
    return this.http.get(urlWeeksOfMonthBrief + (currDate.getMonth()+1) + "/" + currDate.getFullYear())
      .map((data:any) => {
        if(data && data.reportDetailModel)
          return data.reportDetailModel;
      });
  }

  public getLast3MonthsBrief(){
    return this.http.get(urlLastThreeMonthsBrief)
      .map((data:any) => {
        if(data && data.reportDetailModel)
          return data.reportDetailModel;
      });
  }

  public getLastYear() {
    const currYear = new Date().getFullYear();
    return this.http.get(urlYearBrief + currYear)
      .map((data:any) => {
        if(data && data.reportDetailModel)
          return data.reportDetailModel;
      });
  }
}
