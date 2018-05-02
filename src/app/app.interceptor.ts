import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
  } from '@angular/common/http';
import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {_throw} from 'rxjs/observable/throw';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {SkipInterceptor} from "./helpers";

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private router: Router, private snackBar: MatSnackBar, private activatedRoute: ActivatedRoute) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let clonedRequest;
    if(req.headers.has(SkipInterceptor)){
      const headers = req.headers.delete(SkipInterceptor);
      clonedRequest = req.clone({headers});
    }else{
      clonedRequest = req.clone({
        setHeaders: {
          'x-auth-token': localStorage.getItem('xAuthToken') || ''
        }
      });
    }

    return next.handle(clonedRequest)
      .do((event: HttpEvent<any>) => {
      })
      .catch((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.error && err.error['baseModel']) {
            this.snackBar.open(err.error['baseModel'].responseMessage, 'Hata',{duration: 4500});
            return _throw(err);
          }
          if (err.error && err.error['responseMessage']) {
            this.snackBar.open(err.error['responseMessage'], 'Hata',{duration: 4500});
            return _throw(err);
          }
          switch (err.status) {
            case 401:
              if (localStorage.getItem('xAuthToken') !== null) {
                localStorage.clear();
                this.snackBar.open('Oturumunuz geçersiz, lütfen tekrar giriş yapınız', null, {duration: 4500});
              }
              if (this.activatedRoute.snapshot.firstChild.routeConfig.path !== 'auth' &&
                this.activatedRoute.snapshot.firstChild.url[0].path === 'auth') {
                this.router.navigate(['auth'], {queryParams: {url: this.router.url}});
              }
              if (this.activatedRoute.snapshot.firstChild.url[0].path === 'super' &&
                  this.activatedRoute.snapshot.firstChild.routeConfig.path !== 'super/auth') {
                this.router.navigate(['super/auth'], {queryParams: {url: this.router.url}});
              }
              break;
            case 403:
              this.snackBar.open('Bu adrese erişim yetkiniz bulunmuyor', 'Dikkat!', {duration: 4500});
              break;
            case 503:
              this.snackBar.open('Servis şu an çalışmıyor. Daha sonra tekrar deneyiniz', 'Dikkat!', {duration: 4500});
              break;
            default:
              this.snackBar.open('Bir hata oluştu', 'Dikkat!', {duration: 4500, });
              console.log('Hata: ', err);
          }
        }
          return _throw(err);
      });
  }}
