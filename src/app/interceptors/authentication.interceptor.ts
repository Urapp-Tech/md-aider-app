import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private readonly userService: UserService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const { userData } = this.userService;
    if (userData) {
      const modifiedRequest = this.attachToken(request, userData.token);
      return next.handle(modifiedRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error.statusCode === 401) {
            this.userService.logout();
            return throwError(() => new Error('Unauthorized'));
          }
          return throwError(() => error);
        })
      );
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error.statusCode === 401) {
          this.userService.logout();
          return throwError(() => new Error('Unauthorized'));
        }
        return throwError(() => error);
      }),
      tap((response: any) => {
        if (
          response.status === 200 &&
          response.body.message.includes(`tenant does not exist`)
        ) {
          this.userService.logout();
        }
      })
    );
  }

  attachToken(
    request: HttpRequest<any>,
    accessToken: string
  ): HttpRequest<any> {
    const modifiedRequest = request.clone({
      headers: request.headers.set('Authorization', accessToken),
    });
    return modifiedRequest;
  }
}
