import { Component, OnInit } from '@angular/core';
import {ApiService} from '../auth/api.service';
import {Route} from '@angular/router';
import {AuthenticationService} from '../auth/authentication.service';
import {catchError, tap} from 'rxjs/operators';
import {transformError} from '../shared';
import {error} from 'util';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent  {
  userId = this.authService.authStatus.value.userId.toString();

  constructor(private apiService: ApiService, private authService: AuthenticationService) { }

    providers$ = this.apiService.get('providers', {employeeId: this.userId}).pipe(
      tap(data => console.log('Providers: ', JSON.stringify(data))),
      catchError(transformError));



}
