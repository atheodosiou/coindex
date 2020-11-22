import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, interval, of } from 'rxjs';
import { switchMap, map, startWith, tap } from 'rxjs/operators';
import { AppConfig } from '../../../environments/environment';
import { Endpoint } from '../endpoints';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }


  getCurrencies(refreshTimeInMs: number, ids:string, interv: string, convert: string, status: string, perpage: string = '14', page: string = '1', newCoins: boolean): Observable<any> {
    return interval(refreshTimeInMs).pipe(
      startWith(0),
      switchMap(() => this.http.get(`${AppConfig.baseUrl}/${Endpoint.ticker}`,
        {
          params: {
            "ids":ids,
            "interval": interv,
            "convert": convert,
            "status": status,
            "per-page": perpage,
            "page": page,
            "filter": newCoins === true ? "new" : "",
            "key": AppConfig.apiKey
          }
        })),
      map(res => res)
    )
  }

  getCurrenciesMetadata():Observable<any[]> {
    return this.http.get<any[]>('https://api.nomics.com/v1/currencies', {
      params: {
        "key": AppConfig.apiKey
      }
    }
    );
  }

}

