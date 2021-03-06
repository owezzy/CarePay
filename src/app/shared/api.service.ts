import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ProvidersModelInterface} from '../providers/providersModelInterface';
import {transformError} from './index';
import {CacheService} from '../auth/cache.service';
import {BehaviorSubject} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService extends CacheService {
  private providers = new BehaviorSubject<ProvidersModelInterface[]>([]);

  constructor( private http: HttpClient  ) {
    super();
  }

  GetProviders(path: any, params?: number) {
    return this.http.get<ProvidersModelInterface[]>(`${environment.api_url}${path}`, { params})
      .pipe(
      tap(data => console.log('Provider: ', JSON.stringify(data))),
      catchError(transformError)
    ).subscribe((providers) => this.providers.next(providers));
  }
}


  // get request builder service
// getProviders(path: string, params ? : { employee: string }); {
//     // @ts-ignore
//     return this.http.get<ProvidersModelInterface>(`${environment.api_url}${path}`, { params });
//   }
// }
