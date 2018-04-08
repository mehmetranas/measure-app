import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Chart } from 'chart.js';
import {ReportService} from "../report.service";
import {ReportModel} from "../models/report.model";
import {OrderModel} from "../models/order.model";
import {MatTableDataSource} from "@angular/material";
import "rxjs/add/operator/take";
import "rxjs/add/observable/of";

import {orderStatus} from "../helpers";

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div>
            <canvas id="canvas"></canvas>
          </div>
        </div>
        <div class="col-md-6">
          <table class="table table-sm">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th *ngFor="let report of reports" scope="col">{{ report.day }} &nbsp; {{ report.month | date: "MMM":"":"tr"}} </th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th scope="row">Adet</th>
              <td *ngFor="let report of reports">{{ report.count }}</td>
            </tr>
            <tr>
              <th scope="row">Tutar</th>
              <td *ngFor="let report of reports">{{ report.sum | currency: 'TRY':'2.2-2' }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <div class="app-container mat-elevation-z8">
            <span>Yaklaşan Teslimatlar</span>
            <br>
            <mat-table #table [dataSource]="dataSourceOncomingDelivery">

              <!--- Note that these columns can be defined in any order.
                    The actual rendered columns are set as a property on the row definition" -->

              <!-- Position Column -->
              <ng-container matColumnDef="Müşteri İsmi">
                <mat-header-cell *matHeaderCellDef> Müşteri İsmi</mat-header-cell>
                <mat-cell *matCellDef="let order"> {{order.customer.nameSurname}}</mat-cell>
              </ng-container>

              <!-- Name Column -->
              <ng-container matColumnDef="Ölçü Alan">
                <mat-header-cell *matHeaderCellDef> Ölçü Alan</mat-header-cell>
                <mat-cell *matCellDef="let order"> {{order.userUsername}}</mat-cell>
              </ng-container>

              <!-- Weight Column -->
              <ng-container matColumnDef="Teslim Tarihi">
                <mat-header-cell *matHeaderCellDef> Teslim Tarihi</mat-header-cell>
                <mat-cell *matCellDef="let order"> {{order.deliveryDate | date: 'dd/MM/yyyy'}}</mat-cell>
              </ng-container>

              <!-- Symbol Column -->
              <ng-container matColumnDef="Durumu">
                <mat-header-cell *matHeaderCellDef> Durumu</mat-header-cell>
                <mat-cell *matCellDef="let order" [style.color]="(order.orderStatus === 4 || orderStatus === 5) ? 'green':'red'"> {{orderStatus[order.orderStatus].viewValue}}</mat-cell>
              </ng-container>

              <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
              <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
            </mat-table>
          </div>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <div class="app-container mat-elevation-z8">
            <span>Yaklaşan Ölçüler</span>
            <br>
            <mat-table #table [dataSource]="dataSourceOncomingMeasure">

              <!--- Note that these columns can be defined in any order.
                    The actual rendered columns are set as a property on the row definition" -->

              <!-- Position Column -->
              <ng-container matColumnDef="Müşteri İsmi">
                <mat-header-cell *matHeaderCellDef> Müşteri İsmi</mat-header-cell>
                <mat-cell *matCellDef="let order"> {{order.customer.nameSurname}}</mat-cell>
              </ng-container>

              <!-- Name Column -->
              <ng-container matColumnDef="Ölçü Alan">
                <mat-header-cell *matHeaderCellDef> Ölçü Alan</mat-header-cell>
                <mat-cell *matCellDef="let order"> {{order.userUsername}}</mat-cell>
              </ng-container>

              <!-- Weight Column -->
              <ng-container matColumnDef="Teslim Tarihi">
                <mat-header-cell *matHeaderCellDef> Teslim Tarihi</mat-header-cell>
                <mat-cell *matCellDef="let order"> {{order.deliveryDate | date: 'dd/MM/yyyy'}}</mat-cell>
              </ng-container>

              <!-- Symbol Column -->
              <ng-container matColumnDef="Durumu">
                <mat-header-cell *matHeaderCellDef> Durumu</mat-header-cell>
                <mat-cell *matCellDef="let order"> {{orderStatus[order.orderStatus].viewValue}}</mat-cell>
              </ng-container>

              <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
              <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
            </mat-table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      max-height: 500px;
      min-width: 300px;
    }

    .mat-table {
      overflow: auto;
      max-height: 500px;
    }

  `],
  providers: [ReportService]
})
export class DashboardComponent implements OnInit {
  displayedColumns = ['Müşteri İsmi', 'Ölçü Alan', 'Teslim Tarihi', 'Durumu'];
  public chartLastOrders: any;
  public reports: ReportModel[];
  public oncomingOrders: any[] = [];
  public dataSourceOncomingDelivery;
  public dataSourceOncomingMeasure;
  public orderStatus;
  constructor(private reportService:ReportService) {  }

  ngOnInit() {
    this.orderStatus = orderStatus;
    this.reportService.getLastSevenDays()
      .take(1)
      .subscribe((response:ReportModel[]) => {
        this.reports = this.setAllDateToData(response);
        this.setChart(this.reports);
        console.log("reports",this.reports);
      });

    this.reportService.getOncomingDelivery()
      .subscribe((data: any) => {
        this.dataSourceOncomingDelivery = new MatTableDataSource<OrderModel>(data);
      });
    this.reportService.getOncomingMeasures()
      .take(1)
      .subscribe((data: any) => {
        this.dataSourceOncomingMeasure = new MatTableDataSource<OrderModel>(data);
      });

  }

  private setAllDateToData(response: ReportModel[]) {
    const templates = this.getLast7DateReportTemplate();
    let reports: ReportModel[] = [];
    templates.forEach((report:ReportModel) => {
      const responseReport = response.find((detail:ReportModel) => detail.day === report.day);
      if (responseReport)
        reports.push(responseReport);
      else{
        report.count = 0;
        report.sum = 0;
        reports.push(report);
      }

      // report.month =
      // report.count = response.find((detail:ReportModel) => detail.day === day) ?
      //   response.find((detail:ReportModel) => detail.day === day).count : 0;
      // report.sum = response.find((detail:ReportModel) => detail.day === day) ?
      //   response.find((detail:ReportModel) => detail.day === day).sum : 0;
    });
    return reports;
  }

  private getLast7DateReportTemplate(){
    let last7DateReportTemplate: ReportModel[] = [];
    for(let i = 0; i<7; i++){
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

  private setChart(reports: ReportModel[]){
    this.chartLastOrders = new Chart('canvas',{
      type:"bar",
      data: {

        labels: reports.map((r:ReportModel) => r.day),
        datasets: [
          {
            label: "Sipariş Tutarı (TL)",
            backgroundColor: "#0096DB",
            borderColor: "#0096DB",
            data: reports.map((r:ReportModel) => r.sum),
            yAxisID:"y-axis-1",
            fill: false
          },
          {
            label: "Sipariş Adedi",
            backgroundColor: "#ff4081",
            borderColor: "#ff4081",
            data: reports.map((r:ReportModel) => r.count),
            yAxisID:"y-axis-2",
            fill: true
          }
        ]
      },
      options:{
        responsive:true,
        title:{
          display:true,
          text:"Haftalık Sipariş Özeti"
        },
        scales: {
          xAxes:[{
            display:true,
            scaleLabel:{
              display:true,
              labelString:"Tarihler"
            }
          }],
          yAxes:[
            {
            display:true,
            scaleLabel:{
              display:true,
              labelString:"Tutar - TL"
            },
            position:"left",
            id:"y-axis-1"
          },
            {
              display:true,
              scaleLabel:{
                display:true,
                labelString:"Adet"
              },
              position:"right",
              id:"y-axis-2"
            }
          ]
        }
      }
    })
  }

}
