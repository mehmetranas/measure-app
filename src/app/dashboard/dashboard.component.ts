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
        <div class="col-md-8 offset-md-2">
          <div>
            <canvas id="canvas">{{ chartLastOrders }}</canvas>
          </div>
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
  public oncomingOrders: any[] = [];
  public dataSourceOncomingDelivery;
  public dataSourceOncomingMeasure;
  public orderStatus;
  constructor(private reportService:ReportService) {  }

  ngOnInit() {
    this.orderStatus = orderStatus;
    this.reportService.getLastSevenDays()
      .take(1)
      .subscribe((data:any) => {
        const reports = this.setAllDateToData(data);
        this.setChart(reports);
        console.log("reports",reports);
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

  private setAllDateToData(data: any[]) {
    const days = this.getLast7Days();
    let reports: ReportModel[] = [];
    days.forEach((day:number) => {
      let report = new ReportModel();
      report.day = day;
      report.count = data["reportDetailModel"].filter((detail:ReportModel) => detail.day === day)[0].count || 0;
      report.sum = data["reportDetailModel"].filter((detail:ReportModel) => detail.day === day)[0].sum || 0;
      reports.push(report);
    });
    return reports;
  }

  private getLast7Days(){
    let last7Days = [];
    for(let i = 0; i<7; i++){
      const curr = new Date();
      curr.setDate(curr.getDate() - i);
      last7Days.push(curr.getDate());
    }
    return last7Days;
  }

  private setChart(reports: ReportModel[]){
    this.chartLastOrders = new Chart('canvas',{
      type:"bar",
      data: {

        labels: reports.map((r:ReportModel) => r.day),
        datasets: [
          {
            label: "Sipariş Tutarı (TL)",
            backgroundColor: "red",
            borderColor: "red",
            data: reports.map((r:ReportModel) => r.sum),
            yAxisID:"y-axis-1",
            fill: false
          },
          {
            label: "Sipariş Adedi",
            backgroundColor: "yellow",
            borderColor: "yellow",
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
