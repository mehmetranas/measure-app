import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './services/login.service';
import 'rxjs/add/operator/map';

@Injectable()
export class UserGuardService implements CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  canLoad(route: Route):
    Observable<boolean> | Promise<boolean> | boolean {
    this.authService.navigate = Observable.of(true);
    return this.authService.checkSession()
      .map((response: any) => {console.log('can load works');
        if (response.status === 200 && (response.body.role === 'r1' || response.body.role === 'r2')) { return true; }
        this.router.navigateByUrl('auth');
        this.authService.navigate = Observable.of(false);
        return false;
    });
  }
}
