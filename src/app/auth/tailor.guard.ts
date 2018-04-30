import { Injectable } from '@angular/core';
import {Router, CanLoad, Route} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from './services/login.service';
import {finalize, map} from "rxjs/operators";

@Injectable()
export class TailorGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(route: Route):
    Observable<boolean> | Promise<boolean> | boolean {
    this.authService.navigate = Observable.of(true);
    return this.authService.checkSession()
      .pipe(
        finalize(() => this.authService.navigate = Observable.of(false)),
        map((response: any) => {
          if (response.status === 200 && response.body.role === 'r3') { return true; }
          this.router.navigateByUrl('auth');
          return false;
        })
      )
  }
}
