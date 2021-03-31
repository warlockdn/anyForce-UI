import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, tap } from 'rxjs/operators';
import { Logger } from '../logger.service';

import { NzMessageService } from 'ng-zorro-antd/message';

const logger = new Logger('Interceptor Service: ');

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // more to do later...
    const toastr = this.injector.get(NzMessageService);
    const loadingId = toastr.loading('Request in progress...').messageId;
    return next.handle(request)
      .pipe(
        retry(2),
        tap(evt => {
          if (evt instanceof HttpResponse) {
            if (evt.body) {
              toastr.remove(loadingId);
            }
          }
        })
      );
  }

}
