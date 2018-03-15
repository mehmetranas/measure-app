import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../user/services/login.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuardService implements CanActivate{
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.checkSession()
      .map((isValid:boolean) => {
        if(isValid === true) return true;

        this.authService.redirectUrl = state.url;
        this.router.navigate(["/"]);
        return false;
    });
  }
}
