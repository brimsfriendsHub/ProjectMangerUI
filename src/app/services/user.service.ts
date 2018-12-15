import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UserModel } from '../models/User';
import { AppSettings } from '../models/AppSettings';
import {RequestOptions,  URLSearchParams, RequestMethod,  ResponseContentType, Headers} from '@angular/http';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  requestOption = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };
  constructor(private httpClient: HttpClient) { }

  getUsers() {
    return this.httpClient.get<UserModel[]>(AppSettings.UsersBaseUrl);
  }

  getById(id: number) {
    return this.httpClient.get<UserModel>(AppSettings.UsersBaseUrl + '/' + id);
  }

  delete(id: number) {
    const deleteUrl = AppSettings.UsersBaseUrl + '/delete/' + id;
    console.log(deleteUrl);
    return this.httpClient.post<any>(deleteUrl, {}, this.requestOption);
  }

  createOrUpdateUser(user) {
    console.log(user);
    return this.httpClient.post(AppSettings.UsersBaseUrl, user, this.requestOption);
  }
}
