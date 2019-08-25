import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError as observableThrowError} from 'rxjs';
import {CacheService} from './cache.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {transformError} from '../shared';

// app auth state shape
export interface AuthStatusInterface {
  isAuthenticated: boolean;
  userId: number;
  name: string;
}

export interface AuthServiceInterface {
  // auth state holder
  authStatus: BehaviorSubject<AuthStatusInterface>;
  // auth service methods
  login(username: string, password: string): Observable<AuthStatusInterface>;
  logout();
  getToken(): string;
}

// server response state shape
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

// cache auth service data
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

  //  make request to server
  private ApiLogInn(
    username: string,
    password: string
  ): Observable<ServerAuthResponseInterface> {
    return this.httpClient.post<ServerAuthResponseInterface>(`${environment.api_url}/usermanagement/login`, {
      username,
      password
    });
  }

  // login function and update authstatus state
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

    // pass to authStatus state object
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

  // clears token and set default auth state
  logout() {
    this.clearToken();
    this.authStatus.next(defaultAuthStatus);
  }

  // token from response to authStatus state
  private setToken(jwt: string) {
    this.setItem('token', jwt);
  }


  // retrieve token
  getToken(): string {
    return this.getItem('token') || '';
  }

  // destroy token
  private clearToken() {
    this.removeItem('token');
  }
}

