import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { Router} from '@angular/router';
import 'rxjs/add/operator/catch';
import {MatSnackBar} from "@angular/material";
import {AuthService} from "./auth/services/login.service";
import {hasProperties} from "codelyzer/util/astQuery";
import {hasOwnProperty} from "tslint/lib/utils";

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(private router: Router,private snackBar: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({
      setHeaders: {
        'x-auth-token': localStorage.getItem('xAuthToken') || ''
      }
    }); console.log("clone req",clonedRequest.headers)

    return next.handle(clonedRequest)
      .do((event: HttpEvent<any>) => {

      },
        (err: any) => {
        if(err instanceof HttpErrorResponse) {
          if(err.error && err.error["baseModel"]){
            this.snackBar.open(err.error["baseModel"].responseMessage,"Hata");
            return;
          }
          if(err.error && err.error["responseMessage"]){
            this.snackBar.open(err.error["responseMessage"],"Hata");
            return;
          }
          switch(err.status){
            case 401:
              if(localStorage.getItem("xAuthToken") != null){
                localStorage.clear();
                this.snackBar.open("Oturumunuz geçersiz, lütfen tekrar giriş yapınız", null, {duration:4500});
              }
              this.router.navigate(['/auth'],{queryParams:{url:this.router.url}});
              break;
            case 403:
              this.snackBar.open("Bu adrese erişim yetkiniz bulunmuyor", "Dikkat!", {duration:4500});
              break;
            default:
              this.snackBar.open("Bir hata oluştu", "Dikkat!", {duration:4500, });
              console.log("Hata: ", err);
          }
        }
      })
  }}
