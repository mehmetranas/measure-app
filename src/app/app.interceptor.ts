import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {Router} from '@angular/router';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const messageReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`
      }
    });

    return next.handle(messageReq).do(
      (event: HttpEvent<any>) => {
      });
  }
}
