import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from "../user/services/login.service";

@Injectable()
export class TailorActivateGuard implements CanActivate {

  constructor(private authService:AuthService, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.checkSession()
      .map((response:any) => {
        if(response.status === 200 && response.body.role === "r3") return true;
        this.router.navigateByUrl("login");
        return false;
      });

  }
}
