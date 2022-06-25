import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class FinnhubTokenInterceptor implements HttpInterceptor {
  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const newReq = httpRequest.clone({
      params: (httpRequest.params ? httpRequest.params : new HttpParams()).set(
        'token',
        environment.api.token
      ),
    });

    return next.handle(newReq);
  }
}
