import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {AuthenticationService, AuthStatusInterface} from './authentication.service';
import {UiService} from '../shared/ui-service.service';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  protected currentAuthStatus: AuthStatusInterface;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private uiService: UiService
  ) {
    this.authenticationService.authStatus.subscribe(
      authStatus => (this.currentAuthStatus = authStatus)
    );
  }

  // guard protected component
  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin();
  }

  // guard protected routes
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin(route);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin(childRoute);
  }

  // check user if has token to access protected route
  protected checkLogin(route?: ActivatedRouteSnapshot) {
    let params: any;
    if (route) {
      params = {redirectUrl: route.pathFromRoot.map(r => r.url).join('/')};
    }
    if (!this.currentAuthStatus.isAuthenticated) {
      this.showAlert(this.currentAuthStatus.isAuthenticated);
      this.router.navigate(['login', params || {}]);
      return false;
    }
    return true;
  }
  // alert user using toast
  private showAlert(isAuth: boolean) {
    if (!isAuth) {
      this.uiService.showToast('You must login to continue');
    }
  }
}
