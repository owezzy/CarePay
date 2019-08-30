import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ProvidersModelInterface} from './providersModelInterface';
import {ApiService} from '../shared/api.service';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {AuthenticationService} from '../auth/authentication.service';
import {UserService} from '../usermanagement/user.service';


export class ProvidersResolver implements Resolve<ProvidersModelInterface> {

  constructor(private userService: UserService, private authService: AuthenticationService) {}

resolve(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<ProvidersModelInterface> {
  // return  this.userService.getUser(route.paramMap.get('userId'));

}
}
