import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {MessageModel} from "../models/message.model";

@Component({
  selector: 'app-notifications',
  template: `
    <div class="table-container mat-elevation-z8">
      <mat-table #table [dataSource]="dataSource">

        <ng-container matColumnDef="Mesaj">
          <mat-header-cell *matHeaderCellDef> Mesaj </mat-header-cell>
          <mat-cell *matCellDef="let message"> {{message.message}} </mat-cell>
        </ng-container>

        <ng-container matColumnDef="Sil">
          <mat-header-cell *matHeaderCellDef> Sil </mat-header-cell>
          <mat-cell> <mat-icon>clear</mat-icon> </mat-cell>
        </ng-container>

        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
      </mat-table>

      <mat-paginator #paginator
                     [pageSize]="10"
                     [pageSizeOptions]="[5, 10, 20]">
      </mat-paginator>
    </div>

  `,
  styles: [`
  
  `]
})
export class NotificationsComponent implements OnInit {
  @Input() messages: MessageModel[] = [];
  public dataSource = new MatTableDataSource<MessageModel>(this.messages);
  public displayedColumns = ['Mesaj','Sil'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor() { }

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
  }

}
