import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from "./services/login.service";

@Injectable()
export class AuthGuardActivateGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.authService.navigate = Observable.of(true);
    return this.authService.checkSession()
      .finally(() => this.authService.navigate = Observable.of(false))
      .map((response:any) => {console.log("auth guard activated works")
        if(response.status === 200 && (response.body.role === "r1" || response.body.role === 'r2')) return true;
        this.router.navigateByUrl("login");
        return false;
      });

  }
}
