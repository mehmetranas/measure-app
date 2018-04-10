import {Component, Input, OnInit} from '@angular/core';
import {ReportModel} from "./models/report.model";
import { Chart } from 'chart.js';


@Component({
  selector: 'app-chart',
  template: `
    <div>
      <canvas id="canvas" height="280"></canvas>
    </div>
  `,
  styles: []
})
export class ChartComponent implements OnInit {
  @Input() reports: ReportModel[];
  public chartLastOrders: any;

  constructor() { }

  ngOnInit() {
    if(this.reports)
    this.setChart(this.reports)
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
            borderWidth : [10,10],

            data: reports.map((r:ReportModel) => r.sum),
            yAxisID:"y-axis-1",
            fill: false
          },
          {
            label: "Sipariş Adedi",
            backgroundColor: "#ff4081",
            borderColor: "#ff4081",
            borderWidth : [10,10],
            data: reports.map((r:ReportModel) => r.count),
            yAxisID:"y-axis-2",
            fill: true
          }
        ]
      },
      options:{
        responsive:true,
        maintainAspectRatio:false,
        title:{
          display:true,
          text:"Haftalık Sipariş Özeti"
        },
        scales: {
          xAxes:[{
            display:true,
            barThickness : 10,
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
    });
  }


}
