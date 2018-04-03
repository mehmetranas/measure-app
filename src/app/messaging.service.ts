import { Injectable }          from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth }     from 'angularfire2/auth';
import * as firebase from "firebase";

import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import {HttpClient} from "@angular/common/http";
import {MessageModel} from "./models/message.model";
import {Observable} from "rxjs/Observable";

const getAdminMessagesUrl = "https://measure-notebook-api.herokuapp.com/notification/list";
const getTailorMessagesUrl = "https://measure-notebook-api.herokuapp.com/notification/list/tailor";
const deleteMessageByIdUrl = "https://measure-notebook-api.herokuapp.com/notification/";
const deleteMessagesUrl = "https://measure-notebook-api.herokuapp.com/notification/";

@Injectable()
export class MessagingService {

  public messaging = firebase.messaging();
  public currentMessage = new BehaviorSubject(null);

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private http: HttpClient) {  }

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
        console.log(token)
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
      .map((data:any) => data.notificationDetailModelList || []);;
  }

  public deleteMessageById(id: number){
    this.http.delete(deleteMessageByIdUrl + id);
  }

  public startFCM(){
    this.getPermission();
    this.receiveMessage();
    return this.currentMessage;
  }
}
