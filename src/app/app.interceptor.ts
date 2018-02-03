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
      responseType: 'text'
    });

    return next.handle(clonedRequest)
      .map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          return event.clone({
            body: JSON.parse(event.body),
          });
        }
      })
      .catch((error: HttpErrorResponse) => {
        const parsedError = Object.assign({}, error, { error: JSON.parse(error.error)});
        return Observable.throw(new HttpErrorResponse(parsedError));
      });
  }}
