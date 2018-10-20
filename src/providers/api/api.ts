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
  public token: string;
  constructor(public http: HttpClient) {
    this.url = 'https://fede-todo-list.herokuapp.com/api'
    this.token = localStorage.getItem('token');
  }

  public login(params): Observable<boolean> {
    return this.http.post(`${this.url}/auth`, {
      auth: params
    }).pipe(map((response: any) => {
      localStorage.setItem('token', response.jwt);
      this.token = response.jwt;
      return true;
    }), catchError((error: HttpErrorResponse) => {
      return Observable.of(false);
    }));
  }

  public logout(): void {
    this.token = undefined;
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

  public getLists(): Observable<any> {
    return this.http.get(`${this.url}/v1/list`, {
      headers: {
        'Authorization': this.token
      }
    });
  }

  public getItems(list: any): Observable<any> {
    return this.http.get(`${this.url}/v1/list/${list.id}/item`, {
      headers: {
        'Authorization': this.token
      }
    })
  }

  public createList(params): Observable<boolean> {
    return this.http.post(`${this.url}/v1/list`, {
      list: params
    }, {
      headers: {
        'Authorization': this.token
      }
    }).pipe(map((response) => {
      return true;
    }), catchError((error: HttpErrorResponse) => {
      return Observable.of(false);
    }))
  }

  public createItem(list, params): Observable<boolean> {
    return this.http.post(`${this.url}/v1/list/${list.id}/item`, {
      item: params
    }, {
      headers: {
        'Authorization': this.token
      }
    }).pipe(map((response) => {
      return true;
    }), catchError((error: HttpErrorResponse) => {
      return Observable.of(false);
    }))
  }

  public finish(list, item): Observable<boolean> {
    return this.http.patch(`${this.url}/v1/list/${list.id}/item/${item.id}`, {
      item: {
        status: true
      }
    }, {
      headers: {
        'Authorization': this.token
      }
    }).pipe(map((response) => {
      return true;
    }), catchError((error: HttpErrorResponse)=> {
      return Observable.of(false);
    }))
  }

  public delete(list, item): Observable<boolean> {
    return this.http.delete(`${this.url}/v1/list/${list.id}/item/${item.id}`, {
      headers: {
        'Authorization': this.token
      }
    }).pipe(map((response) => {
      return true;
    }), catchError((error: HttpErrorResponse)=> {
      return Observable.of(false);
    }))
  }

}
