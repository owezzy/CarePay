import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthenticationService, AuthStatusInterface} from '../auth/authentication.service';
import {HttpClient} from '@angular/common/http';
import {CacheService} from '../auth/cache.service';
import {User, UserInterface} from './user';
import {catchError} from 'rxjs/operators';
import {transformError} from '../shared';
import {environment} from '../../environments/environment';




// export interface UserServiceInterface {
//   currentUser: BehaviorSubject<UserInterface>;
//   getCurrentUser(): Observable<UserInterface>;
//   getUser(userId): Observable<UserInterface>;
//
// }
@Injectable({
  providedIn: 'root'
})
export class UserService extends CacheService  {
  currentUser = new BehaviorSubject<UserInterface>(this.getItem('user') || new User());
  private currentAuthStatus: AuthStatusInterface;

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    super();
    this.currentUser.subscribe(user => this.setItem('user', user));
    this.authService.authStatus.subscribe(authStatus => (this.currentAuthStatus = authStatus),
    );
  }

  getCurrentUser(): Observable<UserInterface> {
    const userObservable = this.getUser(this.currentAuthStatus.userId).pipe(
      catchError(transformError)
    );
    userObservable.subscribe(
      user => this.currentUser.next(user),
      err => Observable.throw(err)
    );
    return userObservable;
  }

  getUser(userId): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${environment.api_url}/usermanagent/${userId}`);
  }

  updateUser(user: UserInterface): Observable<UserInterface> {
    this.setItem('draft-user', user); // cache usr data in case of errors
    const updateResponse = this.http.put<UserInterface>(`${environment.api_url}/usermanagent/${userId || 0}`, user)
      .pipe(catchError(transformError));

    updateResponse.subscribe(
      res => {
        this.currentUser.next(res);
        this.removeItem('draft-user');
      },
      err => Observable.throw(err)
    );
    return updateResponse;
  }
}
