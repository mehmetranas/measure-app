import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {Router} from '@angular/router';
import 'rxjs/add/operator/catch';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({
      setHeaders: {
        'x-auth-token': localStorage.getItem('xAuthToken') || ''
      }
    });

    return next.handle(clonedRequest);
    // return next.handle(clonedRequest)
    //   .catch((error: HttpErrorResponse) => {
    //     // const parsedError = Object.assign({}, error, { error: JSON.parse(error.error)});
    //     return Observable.throw(new HttpErrorResponse(error));
    //   });
  }}
