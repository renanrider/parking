import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TokenService } from './../services/token.service';
import { SnackbarService } from '../../shared/components/snackbar/snackbar.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private snackbarService: SnackbarService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const accessToken = this.tokenService.getToken();

    if (accessToken === '') {
      console.log('NO_TOKEN');
    } else if (!this.tokenService.isTokenExpired()) {
      // Use the access token for the first try
      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + accessToken),
      });
    } else {
      this.snackbarService
        .showSnackbar('Token expirado!', 'Faça login novamente.', 3000)
        .afterDismissed()
        .subscribe(() => {
          this.authService.logout();
        });
    }

    return next.handle(request);
  }
}
