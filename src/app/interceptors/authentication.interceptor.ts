// import {
//   HttpErrorResponse,
//   HttpHandler,
//   HttpInterceptor,
//   HttpRequest,
// } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { catchError, tap, throwError } from 'rxjs';
// import { UserService } from '../services/user.service';
// import { CapacitorStorageService } from '../services/capacitor-storage.service';
// // AuthenticationInterceptor

// @Injectable()
// export class AuthenticationInterceptor implements HttpInterceptor {
//   constructor(
//     private readonly userService: UserService,
//     private readonly capacitorStorageService: CapacitorStorageService
//   ) {}

//   intercept(request: HttpRequest<any>, next: HttpHandler) {
//     const { userData } = this.userService;
//     const token: any = await this.capacitorStorageService.getItem('USER_DATA');
//     console.log('userData', userData, token);

//     if (token) {
//       const modifiedRequest = this.attachToken(request, token);
//       return next.handle(modifiedRequest).pipe(
//         catchError((error: HttpErrorResponse) => {
//           if (error.error.statusCode === 401) {
//             this.userService.logout();
//             return throwError(() => new Error('Unauthorized'));
//           }
//           return throwError(() => error);
//         })
//       );
//     }
//     return next.handle(request).pipe(
//       catchError((error: HttpErrorResponse) => {
//         if (error.error.statusCode === 401) {
//           this.userService.logout();
//           return throwError(() => new Error('Unauthorized'));
//         }
//         return throwError(() => error);
//       }),
//       tap((response: any) => {
//         if (
//           response.status === 200 &&
//           response.body.message.includes(`tenant does not exist`)
//         ) {
//           this.userService.logout();
//         }
//       })
//     );
//   }

//   attachToken(
//     request: HttpRequest<any>,
//     accessToken: string
//   ): HttpRequest<any> {
//     const modifiedRequest = request.clone({
//       headers: request.headers.set('Authorization', accessToken),
//     });
//     return modifiedRequest;
//   }
// }

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { CapacitorStorageService } from 'src/app/services/capacitor-storage.service';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(
    private capacitorStorageService: CapacitorStorageService,
    private userService: UserService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.capacitorStorageService.getItem('USER_DATA')).pipe(
      switchMap((tokenData) => {
        const token = tokenData;

        let modifiedRequest = request;
        if (token) {
          modifiedRequest = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
        }

        return next.handle(modifiedRequest).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              this.userService.logout();
              return throwError(() => new Error('Invalid'));
            }
            return throwError(() => error);
          }),
          tap((response: any) => {
            if (
              response?.status === 200 &&
              response?.body?.message?.includes('tenant does not exist')
            ) {
              this.userService.logout();
            }
          })
        );
      })
    );
  }
}
