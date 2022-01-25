import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { exhaust, exhaustMap, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1), // Get the last logged in user
      exhaustMap(user => {
        // Skip interceptor if user is not logged in
        if (!user) {
          return next.handle(req);
        }
        
        const modifiedRequest = req.clone({
          params: new HttpParams().set('auth', user.token)
        })
        return next.handle(modifiedRequest);
    }));
  }

}