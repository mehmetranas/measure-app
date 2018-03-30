import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/catch';
import {AuthService} from './user/services/login.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

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
            this.router.navigate(['/login'],{queryParams:{url:this.router.url}});
          }
        }
        })
  }}
