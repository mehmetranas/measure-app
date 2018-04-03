import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-notifications',
  template: `
    <ul class="list-group list-group-flush">
      <li *ngFor="let message of messages" class="list-group-item">{{ message.message }}
        <button mat-icon-button matSuffix>
          <mat-icon>clear</mat-icon>
        </button>
      </li>
    </ul>
  `,
  styles: []
})
export class NotificationsComponent implements OnInit {
  @Input() messages: any[] = [];
  constructor() { }

  ngOnInit() {
  }

}
