// import { Injectable } from '@angular/core';
// import {BehaviorSubject, Observable} from 'rxjs';
// import {AuthenticationService, AuthStatusInterface} from '../auth/authentication.service';
// import {HttpClient} from '@angular/common/http';
// import {CacheService} from '../auth/cache.service';
//
// @Injectable({
//   providedIn: 'root'
// })
//
// export class User implements UserInterface {
//   constructor(
//     public userId = '',
//     public  name = ''
//   ) {}
//
//   static BuildUser(user: UserInterface) {
//     return new User(
//       user.userId,
//       user.name
//     );
//   }
// }
//
// export interface UserInterface {
//   userId: string;
//   name: string;
// }
//
// export interface UsersInterface {
//   items: UserInterface[];
//   total: number;
// }
//
// export interface UserServiceInterface {
//   currentUser: BehaviorSubject<UserInterface>;
//   getCurrentUser(): Observable<UserInterface>;
//   getUser(id): Observable<UserInterface>;
//
// }
// export class UserService extends CacheService implements UserServiceInterface  {
//   currentUser = new BehaviorSubject<UserInterface>(this.getItem('user') || new User());
//   private currentAuthStatus: AuthStatusInterface;
//
//   constructor(private http: HttpClient, private authService: AuthenticationService) {    super();
//     this.currentUser.subscribe(this.user = this.setItem('user', user));
//     this.authService.authStatus.subscribe(
//       authStatus => (this.currentAuthStatus = authStatus),
//     );
//   }
//
//   getCurrentUser(): Observable<UserInterface> {
//     const userObservable = this.getUser()
//   }
//
//   getUser(id): Observable<UserInterface> {
//     return {
//       const userId = this.currentAuthStatus.userId;
//
//   }
// }
