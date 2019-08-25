/* tslint:disable:no-string-literal */
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError as ObservableThrowError} from 'rxjs';
import {AuthenticationService} from '../authentication.service';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';



@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private jwtService: AuthenticationService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.jwtService.getToken();
    const authRequest = req.clone({
      setHeaders: {
        authorization: `Bearer ${token}`,
      }});
    return next.handle(authRequest).pipe(
      catchError((err, caught) => {
        if (err.status === 401) {
          this.router.navigate(['usermanagement/login'], {
            queryParams: { redirectUrl: this.router.routerState.snapshot.url }
          });
        }
        return ObservableThrowError(err);
      })
    );
  }
}
