import {Component, Input, OnInit} from '@angular/core';
import {ReportModel} from "../models/report.model";

@Component({
  selector: 'app-brief-table',
  template: `
    <table class="table table-sm">
      <tbody>
      <tr>
        <th scope="row">Sipariş Adedi:</th>
        <td>{{ report.count }}</td>
      </tr>
      <tr>
        <th scope="row">Sipariş Tutarı:</th>
        <td>{{ report.sum | currency:'TRY':'symbol-narrow':'1.0-0' }}</td>
      </tr>
      </tbody>
    </table>
  `,
  styles: []
})
export class BriefTableComponent implements OnInit {
  @Input() report: ReportModel;

  constructor() { }

  ngOnInit() {}

}
