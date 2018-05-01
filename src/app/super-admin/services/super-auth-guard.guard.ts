import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {SuperAuthService} from "./super-auth.service";
import {finalize, map} from "rxjs/operators";

@Injectable()
export class SuperAuthGuardGuard implements CanLoad, CanActivate {

  constructor(private authService:SuperAuthService,private router:Router){}
  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {console.log("can load guar start")
    this.authService.isLoad.next(true);
    return this.authService.checkSession()
      .pipe(
        map((response:any) => {
          if (response.status === 200 && response.body.role === 'r0') {
            return true;
          }
          this.router.navigateByUrl('super/auth');
          this.authService.isLoad.next(false);
          return false;
        })
      );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log("can activate guard start");
    this.authService.isLoad.next(true);
    return this.authService.checkSession()
      .pipe(
        finalize(() => this.authService.isLoad.next(false)),
        map((response:any) => {
          if (response.status === 200 && response.body.role === 'r0') {
            return true;
          }
          this.router.navigateByUrl('super/auth');
          return false;
        })
      );

  }
}
