import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from './services/login.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private authService:AuthService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.checkSession()
      .map((response:any) => {console.log("admin guard works");
        if(response.body.role){
          if(response.body.role === 'r1') return true;
        }
        else {
          this.router.navigateByUrl("/dashboard");
          return false;
          }
      })
  }
}
