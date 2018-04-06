import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  template: `
      <div><canvas id="canvas">{{ chartLastOrders }}</canvas></div>
  `,
  styles: []
})
export class DashboardComponent implements OnInit {
  public chartLastOrders: any;
  // @ViewChild('canvas') canvas: ElementRef;
  constructor() { }

  ngOnInit() {
    // let chartLastOrders = this.canvas.nativeElement.getContext('2d');
    this.chartLastOrders = new Chart('canvas',{
      type:"bar",
      data: {

        labels: ["Sarı", "Kırmızı", "Mavi"],
        datasets: [
          {
            label: "Test DataS set 1",
            backgroundColor: "yellow",
            borderColor: "yellow",
            data: [5, 8, 9],
            fill: true
          },
          {
            label: "Test DataS set 2",
            backgroundColor: "red",
            borderColor: "red",
            data: [12, 0, 8],
            fill: false
          },
          {
            label: "Test DataS set 3",
            backgroundColor: "blue",
            borderColor: "blue",
            data: [11, 5, 9],
            fill: false
          }
        ]
      },
      options:{
        responsive:true,
        title:{
          display:true,
          text:"Test Chart"
        },
        scales: {
          xAxes:[{
            display:true,
            scaleLabel:{
              display:true,
              labelString:"x label"
            }
          }],
          yAxes:[{
            display:true,
            scaleLabel:{
              display:true,
              labelString:"y label"
            }
          }]
        }
      }
    })
  }

}
