import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from '../user/services/login.service';
import {of} from 'rxjs/observable/of';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private authService:AuthService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.authService.checkSession()
      .map((token:any) => {
        debugger
        if(token && token.role)
          if(token.role === 'r1') return true;
      })
      .catch(() => of(false));
    return false;
  }
}
