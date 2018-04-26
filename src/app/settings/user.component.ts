import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from "../models/user.model";

@Component({
  selector: 'app-user',
  template: `
    <table class="table">
      <tbody>
      <tr>
        <th>Ad-Soyad</th>
        <td>{{ user?.nameSurname }}</td>
      </tr>
      <tr>
        <th>Telefen</th>
        <td>{{ user?.phone }}</td>
      </tr>
      <tr>
        <th>Mail</th>
        <td>{{ user?.email }}</td>
      </tr>
      </tbody>
    </table>
`,
  styles: [`

  `]
})
export class UserComponent {
  @Input() user:UserModel;

  constructor() { }

}
