import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from '../user/services/login.service';
import {of} from 'rxjs/observable/of';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private authService:AuthService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.checkSession()
      .map((response:any) => {
        if(response.body.token && response.body.role){
          if(response.body.role === 'r1') return true;
        }
        else {
          this.router.navigateByUrl("/dashboard");
          return false;
          }
      })
  }
}
