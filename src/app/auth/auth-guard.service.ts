import { Injectable } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../user/services/login.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuardService implements CanLoad{

  constructor(private authService: AuthService, private router: Router) { }

  canLoad(route: Route):
    Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.checkSession()
      .map((isValid:boolean) => {
        if(isValid === true) return true;
        this.router.navigateByUrl("login");
        return false;
    });
  }
}
