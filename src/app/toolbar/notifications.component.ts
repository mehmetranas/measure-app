import {Component, Input, OnInit} from '@angular/core';
import {MessageModel} from "../models/message.model";

@Component({
  selector: 'app-notifications',
  template: `
    <mat-card *ngFor="let message of messages">
      <mat-card-header>
        <div mat-card-avatar>
          <mat-icon>account_circle</mat-icon>
        </div>
        <mat-card-title>
          {{ message.title }}
        </mat-card-title>
        <mat-card-subtitle>{{ message.createdDate |  calculateTime}}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
          {{ message.message }}
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .mat-nav-list{
      padding:5px;
    }
    .mat-card{
      font-size: 0.85rem;
      margin: 0 10px 14px 10px;
      line-height: 1;
      border: #6c757d solid 0.3px;
      border-radius: 5px;
    }
    .mat-card:hover{
      cursor: pointer;
    }
    .mat-card-content{
    }
    .mat-card-header{
    }
  `]
})
export class NotificationsComponent implements OnInit {
  @Input() messages:MessageModel[];
  @Input() messages2: MessageModel[] = [
    {message:"Test message",title:"",createdDate:null,data:null,id:null,readNotification:null,sentNotification:null,tailorNotification:null}
  ];
  constructor() { }
  ngOnInit() {
  }

}
