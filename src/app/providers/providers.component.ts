import { Component, OnInit } from '@angular/core';
import {ApiService} from '../shared/api.service';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {AuthenticationService} from '../auth/authentication.service';
import {catchError, tap} from 'rxjs/operators';
import {transformError} from '../shared';
import {error} from 'util';
import {Observable} from 'rxjs';
import {ProvidersModelInterface} from './providersModelInterface';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {
  providers: Observable<ProvidersModelInterface[]>;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private authService: AuthenticationService) {
    // get providers from service
  }


  ngOnInit() {
    this.apiService.GetProviders(this.route, this.authService.authStatus.value.userId);
  }
}
