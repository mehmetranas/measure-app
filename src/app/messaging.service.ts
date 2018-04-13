import {EventEmitter, Injectable, OnDestroy} from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth }     from 'angularfire2/auth';
import * as firebase from "firebase";

import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import {HttpClient} from "@angular/common/http";
import {MessageModel} from "./models/message.model";
import {Observable} from "rxjs/Observable";
import {AuthService} from "./auth/services/login.service";
import {MatSnackBar} from "@angular/material";
import "rxjs/add/operator/mergeMap";

const getAdminMessagesUrl = "https://measure-notebook-api.herokuapp.com/notification/list";
const getTailorMessagesUrl = "https://measure-notebook-api.herokuapp.com/notification/list/tailor";
const deleteMessageByIdUrl = "https://measure-notebook-api.herokuapp.com/notification/";
const deleteMessagesUrl = "https://measure-notebook-api.herokuapp.com/notification/list";
const readMessageUrl = "https://measure-notebook-api.herokuapp.com/notification/";

@Injectable()
export class MessagingService{

  public messaging = firebase.messaging();
  public currentMessage = new BehaviorSubject(null);
  public messages: MessageModel[] = [];
  public messages$: EventEmitter<MessageModel[]> = new EventEmitter<MessageModel[]>();
  constructor(private db: AngularFireDatabase,
              private afAuth: AngularFireAuth,
              private http: HttpClient,
              private snackBar:MatSnackBar,
              private authService:AuthService) {
    if(authService.user.role == 'r1' || authService.user.role == 'r3')
    this.startFirebaseMessages();
  }

  public getMessages(){
    if(this.authService.user.role === 'r1') {
      this.getAdminMessages()
        .take(1)
        .subscribe((messages: MessageModel[]) => {
          this.messages = messages;
          this.messages$.emit(this.messages);
        });
    }else if(this.authService.user.role === 'r3'){
      this.getTailorMessages()
        .take(1)
        .subscribe((messages: MessageModel[]) => {
          this.messages = messages;
          this.messages$.emit(this.messages);
        });
    }
  }

  public startFirebaseMessages(){
    const permission = Notification["permission"];
    if (permission == "default") {
      const snackBarRef = this.snackBar.open("Bildirimleriniz kapalı, bildirim alamayacaksınız. Etkinleştirmek ister misiniz?",
        "Etkinleştir",
        {duration:8000, verticalPosition:"bottom",horizontalPosition:"start",panelClass:"app-snackbar"});
      snackBarRef.onAction()
        .take(1)
        .mergeMap(() => this.startFCM())
        .subscribe();
    }else if(permission == "denied"){
      this.snackBar.open(
        "Bildirimleriniz kapalı, bildirim alamayacaksınız. Lütfen browser ayarlarınızı kontrol edin.",
        "Kapat",
        {duration:8000, verticalPosition:"bottom",horizontalPosition:"start",panelClass:"app-snackbar"}
    );
    }else if(permission == "granted"){
      this.startFCM().subscribe();
    };
  }
  updateToken(token) {
    this.afAuth.authState.take(1).subscribe(user => {
      if (!user) return;

      const data = { [user.uid]: token };
      this.db.object('fcmTokens/').update(data)
    })
  }

  getPermission() {
    this.messaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        return this.messaging.getToken()
      })
      .then(token => {
        this.authService.sendRegId(token)
          .take(1)
          .subscribe();
        this.updateToken(token)
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });
  }

  receiveMessage() {
    this.messaging.onMessage((payload:any) => {
      const message = new MessageModel();
      message.message = payload.data.message;
      message.id = payload.data.id;
      message.data = payload.data.data;
      message.createdDate = new Date(payload.data.time);
      this.currentMessage.next(message)
    });
  }

  public getAdminMessages(): Observable<MessageModel[]>{
    return this.http.get(getAdminMessagesUrl)
      .map((data:any) => data.notificationDetailModelList || []);
  }

  public getTailorMessages(){
    return this.http.get(getTailorMessagesUrl)
      .map((data:any) => data.notificationDetailModelList || []);
  }

  public deleteMessageById(id: number){
    return this.http.delete(deleteMessageByIdUrl + id);
  }

  public deleteAllMessages(){
    return this.http.delete(deleteMessagesUrl);
  }

  public startFCM() {
    this.getPermission();
    this.receiveMessage();
    return this.currentMessage
      .map((message: MessageModel) => {
        if (message) {
          if (this.messages.findIndex((m: MessageModel) => m.id === message.id) > -1) return;
          this.messages.push(message);
          this.messages$.emit(this.messages);
        }
      });
  }

  public isRead(id: number) {
    return Observable.of([])
  }
}
