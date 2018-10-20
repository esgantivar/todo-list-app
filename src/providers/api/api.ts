import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, catchError } from 'rxjs/operators';
import { Observable} from 'rxjs';
import { flatten } from '@angular/compiler';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  private url: string;
  private token: string;
  constructor(public http: HttpClient) {
    this.url = 'https://fede-todo-list.herokuapp.com/api'
  }

  public login(params): Observable<boolean> {
    return this.http.post(`${this.url}/auth`, {
      auth: params
    }).pipe(map((response: any) => {
      this.token = response.jwt;
      return true;
    }), catchError((error: HttpErrorResponse) => {
      return Observable.of(false);
    }));
  }

  public register(params): Observable<boolean> {
    return this.http.post(`${this.url}/v1/user`, {
      user: params
    }).pipe(map((response) => {
      return true;
    }), catchError((error: HttpErrorResponse) => {
      return Observable.of(false);
    }))
  }

}
