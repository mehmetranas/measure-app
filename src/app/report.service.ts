import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

const urlLastSevenDaysSummary = "https://measure-notebook-api.herokuapp.com/report/orders/lastSeven";
const urlOncomingMeasure = "https://measure-notebook-api.herokuapp.com/report/next/measure";
const urlOncomingDelivery = "https://measure-notebook-api.herokuapp.com/report/next/delivery";
@Injectable()
export class ReportService {

  constructor(private http: HttpClient) { }

  public getLastSevenDays(){
    return this.http.get(urlLastSevenDaysSummary);
  }

  public getOncomingMeasures(){
    return this.http.get(urlOncomingMeasure)
      .map((data:any) => data.orders);
  }

  public getOncomingDelivery(){
    return this.http.get(urlOncomingDelivery)
      .map((data:any) => data.orders);
  }

}
