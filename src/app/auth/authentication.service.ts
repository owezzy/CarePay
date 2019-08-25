import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError as observableThrowError} from 'rxjs';
import {CacheService} from './cache.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {transformError} from '../shared';


export interface AuthStatusInterface {
  isAuthenticated: boolean;
  userId: number;
  name: string;
}

export interface AuthServiceInterface {
  authStatus: BehaviorSubject<AuthStatusInterface>;

  login(username: string, password: string): Observable<AuthStatusInterface>;

  logout();

  getToken(): string;
}

interface ServerAuthResponseInterface {
  token: string;
  id: number;
  name: string;
  hasPassword: boolean;
}

export const defaultAuthStatus = {
  isAuthenticated: false,
  userId: null,
  name: null
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends CacheService implements AuthServiceInterface {
  authStatus = new BehaviorSubject<AuthStatusInterface>(
    this.getItem('authStatus') || defaultAuthStatus
  );

  private readonly authProvider: (
    username: string,
    password: string
  ) => Observable<ServerAuthResponseInterface>;

  constructor(private httpClient: HttpClient) {
    super();
    this.authStatus.subscribe(authStatus => this.setItem('authStatus', authStatus));
    this.authProvider = this.ApiLogInn;
  }

  private ApiLogInn(
    username: string,
    password: string
  ): Observable<ServerAuthResponseInterface> {
    return this.httpClient.post<ServerAuthResponseInterface>(`${environment.api_url}/usermanagement/login`, {
      username,
      password
    });
  }

  login(username: string, password: string): Observable<AuthStatusInterface> {
    this.logout();

    const loginResponse = this.authProvider(username, password).pipe(
      map(value => {
        this.setToken(value.token);
        return {
          isAuthenticated: value.hasPassword,
          name: value.name,
          userId: value.id
        } as AuthStatusInterface;
      }),
      catchError(transformError)
    );

    loginResponse.subscribe(
      res => {
        this.authStatus.next(res);
      },
      error => {
        this.logout();
        return observableThrowError(error);
      }
    );
    return loginResponse;

  }

  logout() {
    this.clearToken();
    this.authStatus.next(defaultAuthStatus);
  }


  private setToken(jwt: string) {
    this.setItem('token', jwt);
  }


  getToken(): string {
    return this.getItem('token') || '';
  }

  private clearToken() {
    this.removeItem('token');
  }
}

