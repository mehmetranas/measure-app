import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../user/services/login.service';
import 'rxjs/add/operator/map';
import {state} from '@angular/animations';

@Injectable()
export class AuthGuardService implements CanLoad{

  constructor(private authService: AuthService, private router: Router) { }

  canLoad(route: Route):
    Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.checkSession()
      .map((isValid:boolean) => {
        if(isValid === true) return true;

        this.authService.redirectUrl = route.path;
        this.router.navigate(["/"]);
        return false;
    });
  }
}
