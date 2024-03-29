import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, retry, timer } from 'rxjs';

@Injectable()
export class RetryInterceptor implements HttpInterceptor {
  shouldRetry(error: HttpErrorResponse) {
    if (error.status >= 500 || error.status === 0) {
      return timer(1000);
    }
    throw error;
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next
      .handle(request)
      .pipe(retry({ count: 3, delay: this.shouldRetry }));
  }
}
