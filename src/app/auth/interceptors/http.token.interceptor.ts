/* tslint:disable:no-string-literal */
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../authentication.service';
import {Router} from '@angular/router';



@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private jwtService: AuthenticationService, private router: Router) {
  }

  // add token header to all outgoing requests
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': 'true',
      changeOrigin: 'true'

    };

    const token = this.jwtService.getToken();

    if (token) {
      headersConfig['Authorization'] = `Bearer ${token}`;
    }

    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }
}
