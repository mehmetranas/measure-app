import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {MessageModel} from "../models/message.model";
import {MessagingService} from "../messaging.service";
import {AuthService} from "../auth/services/login.service";
import {Router} from "@angular/router";
import "rxjs/add/operator/takeWhile";

@Component({
  selector: 'app-notifications',
  template: `
    <div class="notify-header">
     <button mat-icon-button (click)="setCounter(-1)">
       <mat-icon>navigate_before</mat-icon>
     </button>
     <span class="text-muted">{{start}} - {{end}}</span>
     <button mat-icon-button (click)="setCounter(1)">
       <mat-icon>navigate_next</mat-icon>
     </button>
     <button mat-button class="app-delete-all" color="warn" (click)="deleteAllMessages()">Hepsini Sil</button>
   </div>
   <hr>
      <mat-card *ngFor="let message of filteredMessages">
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
        <mat-card-actions>
          <button mat-button color="accent" (click)="deleteMessage(message)">Sil</button>
          <button mat-button color="primary" (click)="goDetail(message)">Detay</button>
        </mat-card-actions>
      </mat-card>
  `,
  styles: [`
    .notify-header > span{
      font-size: 0.85rem;
    }
    .app-delete-all{
      margin-left: 4rem;
    }
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
      box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12);
    }
    a{
      color:white;
      text-decoration: none;
    }
  `]
})
export class NotificationsComponent implements OnInit {
   @Output() closeSidenav: EventEmitter<any> = new EventEmitter<any>();
  public messages:MessageModel[] = [];
  public filteredMessages: MessageModel[];
  public counter: number = 0;
  public pageSize: number = 0;
  public start: number = 0;
  public end: number = 15;
  constructor(private messageService:MessagingService, private authService:AuthService, private router:Router) { }

  ngOnInit() {
    this.messageService.getMessages();
    this.messageService.messages$
      .takeWhile((message) => message instanceof Array)
      .subscribe((messages:MessageModel[]) => {console.log("messages in notifcation component",messages)
        console.log(messages[messages.length-1]);
        this.messages = messages;
        this.pageSize = Math.floor(messages.length/15);
        this.setFilteredMessages();
      })
  }

  public setCounter(value: number) {
    this.counter += value;
    if(this.counter < 0)
      this.counter = 0;
    if(this.counter > this.pageSize)
      this.counter = this.pageSize;
    this.start = this.counter * 15;
    this.end = this.start + 15;
    this.setFilteredMessages();
  }

  private setFilteredMessages() {
    this.filteredMessages = this.messages.slice(this.start,this.end) || [];
  }

  public goDetail(message:MessageModel){
    if(!message.data) return;
    const orderId = +message.data;
    this.deleteMessage(message);
    this.closeSidenav.emit();
    if(this.authService.user.role == 'r1')
      this.router.navigate(["/dashboard/order",orderId])
    else if(this.authService.user.role == 'r3')
      this.router.navigate(["/tailor/order",orderId])
  }

  public deleteAllMessages() {
    this.messageService.deleteAllMessages()
      .take(1)
      .subscribe(() => {
        this.messageService.messages = [];
        this.messageService.messages$.emit(this.messageService.messages);
      })
  }

  public deleteMessage(message:MessageModel){
    if(this.authService.user.role == 'r1' && message.tailorNotification)
      this.isRead(message);
    this.messageService.deleteMessageById(message.id)
      .take(1)
      .subscribe((res:any) => this.deleteMesageFromClient(message.id))
  }

  private isRead(message: MessageModel) {
    this.messageService.isRead(message.id)
      .take(1)
      .subscribe(() => this.deleteMesageFromClient(message.id))
  }

  private deleteMesageFromClient(id: number) {
    const index = this.messages.findIndex((m:MessageModel) => m.id === id);
    if(index > -1) {
      this.messageService.messages.splice(index,1);
      this.messageService.messages$.emit(this.messageService.messages);
    }
  }
}
