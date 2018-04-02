import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  template: `
    <div class="reg-main" fxLayout="column" fxLayoutAlign="center center">
      <div>
        <p class="text-center">
          Yeni kullanıcı ekleme yetkiniz var ise, bu alandan şirketiniz için yeni kullanıcılar tanımlayabilirsiniz.
        </p>
      </div>
      <div>
        <button mat-raised-button color="accent">Yeni Kullanızı Ekle</button>
      </div>
    </div>
  `,
  styles: [`
    .reg-main{
      color:white;
      height: 100%;
      padding: 10%;
    }
  `]
})
export class RegistrationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
