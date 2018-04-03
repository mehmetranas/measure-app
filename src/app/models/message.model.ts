export class MessageModel {
  id: number;
  title: string;
  message: string;
  data: number;
  sentNotification: boolean;
  readNotification: boolean;
  tailorNotification: boolean;
  createdDate: Date;
  constructor(){}
}
