export class MessageModel {
  isRead:boolean = false;
  constructor(public messageText, public messageDetail, public title){}
}
