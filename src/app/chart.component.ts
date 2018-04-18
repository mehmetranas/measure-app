import {Component, Input, OnInit} from '@angular/core';
import {ReportModel} from "./models/report.model";
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  template: `
    <div>
      <div *ngIf="!this.reports" class="alert alert-light text-center" role="alert">
        Veri Yok
      </div>
      <canvas id="canvas" height="280"></canvas>
    </div>
  `,
  styles: []
})
export class ChartComponent implements OnInit {
  @Input() reports: ReportModel[];
  @Input() title = "Grafik";
  @Input() labelType:string = "day";
  @Input() titleDisplay:boolean = true;
  private labelString = "Tarihler";
  public chart: any;

  constructor() { }

  ngOnInit() {
    if(this.reports)
    this.update();
  }

  public update(reports:ReportModel[] = this.reports,title:string = this.title, labelType=this.labelType){
    if(this.chart) this.chart.destroy();
    this.reports = reports;
    this.title = title;
    this.labelType = labelType;
    switch(labelType){
      case "day":
        this.labelString = "Günler";
        break;
      case "month":
        this.labelString = new Date().toLocaleDateString("tr",{year:"numeric"});
        break;
      case "week":
        this.labelString = new Date().toLocaleDateString("tr",{month:"long"});
        break;
      default:
        this.labelString = "Tarihler";
        break;
    }
    this.setChart();
  }

  private setChart(){
    if(!this.reports) return;
    this.chart = new Chart('canvas',{
      type:"bar",
      data: {
        labels:
          this.labelType === "month" ?
            this.reports.map((r:ReportModel) => r.date.toLocaleDateString("tr-TR",{month:"short"})) :
            this.reports.map((r:ReportModel) => r[this.labelType]),
        datasets: [
          {
            label: "Sipariş Tutarı (TL)",
            backgroundColor: "#0096DB",
            borderColor: "#0096DB",
            borderWidth : [10,10],

            data: this.reports.map((r:ReportModel) => r.sum),
            yAxisID:"y-axis-1",
            fill: false
          },
          {
            label: "Sipariş Adedi",
            backgroundColor: "#ff4081",
            borderColor: "#ff4081",
            borderWidth : [10,10],
            data: this.reports.map((r:ReportModel) => r.count),
            yAxisID:"y-axis-2",
            fill: false
          }
        ]
      },
      options:{
        responsive:true,
        maintainAspectRatio:false,
        title:{
          display:this.titleDisplay,
          text: this.title + " Grafik"
        },
        scales: {
          xAxes:[{
            display:true,
            barThickness : 10,
            scaleLabel:{
              display:true,
              labelString:this.labelString
            }
          }],
          yAxes:[
            {
              display:true,
              scaleLabel:{
                display:true,
                labelString:"Tutar - TL"
              },
              ticks:{
                beginAtZero:true,
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
              ticks:{
                beginAtZero:true,
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
