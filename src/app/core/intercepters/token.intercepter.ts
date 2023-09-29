import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { AuthService } from 'app/modules/auth/services/auth.service';
import { Observable, catchError, switchMap, tap, throwError } from 'rxjs';
import { DEFAULT_AUTHORIZATION_SCHEMA } from '../const/defaultAuthorizationType';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) {}
  isRefreshing: boolean = false;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let jwtToken = req.clone({
      setHeaders: {
        Authorization: `${AuthService.authorizationType} ${this._authService.getUserToken()}`,
      },
    });
    return next.handle(jwtToken).pipe(
      catchError((error) => {
        //&& this.authService.refreshToken
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handleAuthorizationError(req, next);
        } else {
          return throwError(() => new Error(error));
        }
      }),
      tap(() => {
        if (AuthService.authorizationType != DEFAULT_AUTHORIZATION_SCHEMA) {
          AuthService.authorizationType = DEFAULT_AUTHORIZATION_SCHEMA;
        }
      }),
    );
  }

  private handleAuthorizationError(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      // return this._authService.getRefreshToken().pipe(
      //   switchMap((response: IUserResponse) => {
      //     this.isRefreshing = false;
      // return next.handle(this.setToken(request, response.user.accessToken))
      // })
      //);
      let newReq = request.clone({
        setHeaders: {
          Authorization: `${AuthService.authorizationType} ${this._authService.getUserToken()}`,
        },
      });
      return next.handle(newReq);
    } else {
      return next.handle(request);
      // }
    }
  }

  private setToken(request: HttpRequest<any>, token: string): HttpRequest<any>{
    return request.clone({
      setHeaders: {
        Authorization: `${AuthService.authorizationType} ${this._authService.getUserToken()}`,
      },
    });
  }
}
