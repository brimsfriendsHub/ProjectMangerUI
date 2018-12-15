import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ProjectModel } from '../models/Project';
import { AppSettings } from '../models/AppSettings';
import { UserService } from './user.service';
import {RequestOptions,  URLSearchParams, RequestMethod,  ResponseContentType, Headers} from '@angular/http';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {

  requestOption = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private httpClient: HttpClient, private _userService: UserService) { }

  getAll() {
    console.log(AppSettings.ProjectsUrl);
    return this.httpClient.get<ProjectModel[]>(AppSettings.ProjectsUrl);
  }

  getById(id: number) {
    return this.httpClient.get<ProjectModel>(AppSettings.ProjectsUrl + '/' + id);
  }

  delete(id: number) {
    const deleteUrl = AppSettings.ProjectsUrl + '/delete/' + id;
    return this.httpClient.post<any>(deleteUrl, {}, this.requestOption);
  }

  createOrUpdateProject(project) {
    console.log(project);
    console.log(AppSettings.ProjectsUrl);
    return this.httpClient.post(AppSettings.ProjectsUrl, project, this.requestOption);
  }

  getAllManagers() {
    return this._userService.getUsers();
  }
}
