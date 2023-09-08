import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class TokenInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let jwtToken = req.clone({
            setHeaders: {
                Authorization: "bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJUb2tlbiIsImp0aSI6Ijc3ODgxNWM2LTJjNjAtNDEzNS05YTNmLWEzZTA0OTlmMmYwMyIsImlhdCI6IjA5LzA3LzIwMjMgMDk6NDU6MDIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjY1MjcxNkI2LUZFNUMtNDk4Qy1CRTUzLTRGNkJEQ0YyM0NGMyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJ0ZXN0IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIk1haW50YWluZXIiLCJUZWNobmljaWFuIiwiQWRtaW4iLCJNYW5hZ2VyIl0sImV4cCI6MTY5NDI5NTkwMiwiaXNzIjoiVGFpdC5FbmFibGVGbGVldC5NYW5hZ2VyIiwiYXVkIjoiY2xpZW50In0.hj_wB0Tdda-vE2yzTQ8MW6YY3kHcuL8s63IL3SieA8g",
            },
        });
        return next.handle(jwtToken);
    }
}