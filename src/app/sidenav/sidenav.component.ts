import { Component, OnInit } from '@angular/core';
import {select} from '@angular-redux/store';
import {MatDialog} from '@angular/material';
import {CustomerAddComponent} from '../dialogs/customer-add.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @select((state) => state.sidenav.isDisplay) isDisplay;
  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit() {
  }

  public newCustomer() {
    const dialogRef = this.dialog.open(CustomerAddComponent, {
      data:null,
      width:"30em",
      maxWidth:"40em"
    });
    dialogRef.afterClosed()
      .take(1)
      .subscribe((result:any) => {
        if(result)
        this.router.navigateByUrl("/order-form/"+result.id);
      })
  }
}
