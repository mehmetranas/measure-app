import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { Router} from '@angular/router';
import 'rxjs/add/operator/catch';
import {MatSnackBar} from "@angular/material";

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({
      setHeaders: {
        'x-auth-token': localStorage.getItem('xAuthToken') || ''
      }
    });

    return next.handle(clonedRequest)
      .do((event: HttpEvent<any>) => {

      },
        (err: any) => {
        if(err instanceof HttpErrorResponse) {
          if(err.status === 401) {
            this.snackBar.open("Oturumunuz geçersiz, lütfen tekrar giriş yapınız", null, {duration:4500});
            this.router.navigate(['/auth'],{queryParams:{url:this.router.url}});
          }
        }
        })
  }}
