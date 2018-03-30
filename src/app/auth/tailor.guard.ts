import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {of} from "rxjs/observable/of";

@Injectable()
export class TailorGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.checkSession()
      .map((response:any) => {
        if(response.body.token && response.body.role){
          if(response.body.role === 'r3') return true;
        }
        else {
          this.router.navigateByUrl("/login");
          return false;
        }
      })
      .catch(() => {
        this.router.navigateByUrl("/login");
        return of(false)});
  }
}
