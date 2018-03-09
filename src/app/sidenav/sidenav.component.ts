import { Component, OnInit } from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {MatDialog} from '@angular/material';
import {CustomerAddComponent} from '../dialogs/customer-add.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @select((state) => state.sidenav.isDisplay) isDisplay;
  constructor(private dialog: MatDialog) {}

  ngOnInit() {
  }

  public newCustoemr() {
    this.dialog.open(CustomerAddComponent);
  }
}
