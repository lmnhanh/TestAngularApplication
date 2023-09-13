import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { AuthService } from "app/modules/auth/services/auth.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class TokenInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let jwtToken = req.clone({
            setHeaders: {
                Authorization: `bearer ${this.authService.getUserToken()}`,
            },
        });
        return next.handle(jwtToken);
    }
}