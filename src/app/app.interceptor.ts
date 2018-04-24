import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler, HttpHeaderResponse,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { Router} from '@angular/router';
import 'rxjs/add/operator/catch';
import {MatSnackBar} from "@angular/material";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class AppInterceptor implements HttpInterceptor, OnInit {
  public isComplete:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  constructor(private router: Router,private snackBar: MatSnackBar) {}

  ngOnInit(){
    this.isComplete.subscribe((data:boolean) => {
      if(data)
        this.snackBar.open("İşlem uzun sürüyor lütfen bekleyiniz","Tamam")
    })
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({
      setHeaders: {
        'x-auth-token': localStorage.getItem('xAuthToken') || ''
      }
    });

    return next.handle(clonedRequest)
      .do((event: HttpEvent<any>) => {
         const timer = setTimeout(()=>{
          this.isComplete.next(false);
        },3);
        if(event.type === 4){
          clearTimeout(timer);
          this.isComplete.next(true);
        }
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
