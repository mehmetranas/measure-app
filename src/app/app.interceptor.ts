import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {Router} from '@angular/router';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const request = req.clone({
      setHeaders: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });

    return next.handle(request).do(
      (event: HttpEvent<any>) => {
      },
      (err) => {
        console.log(err)
      });
  }
}
