import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
public sideNavVisibility = true;
  constructor() { }

  ngOnInit() {
  }

  sidenavToggle(sidenav) {
    sidenav.toggle();
    this.sideNavVisibility = !this.sideNavVisibility;
  }
}
