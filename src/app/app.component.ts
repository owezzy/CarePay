import {Component, OnInit} from '@angular/core';
import {MediaObserver} from '@angular/flex-layout';
import {AuthenticationService} from './auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CarePay';
  // tslint:disable-next-line:variable-name
  _displayAccountsIcons = false;

  constructor(private authenticationService: AuthenticationService, public media: MediaObserver) {
  }

  ngOnInit() {
    // collect app authStatus state when app starts running
    this.authenticationService.authStatus.subscribe(
      authStatus => setTimeout(() => {
        this._displayAccountsIcons = authStatus.isAuthenticated;
      }, 0)
    );
  }

  // icon display flag using authStatus
  get displayAccountIcons() {
    return this._displayAccountsIcons;
  }

}
