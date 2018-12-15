import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { TaskModel } from '../models/Task';
import { AppSettings } from '../models/AppSettings';
import {RequestOptions,  URLSearchParams, RequestMethod,  ResponseContentType, Headers} from '@angular/http';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  requestOption = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };
  constructor(private httpClient: HttpClient) { }

  createOrUpdateTask(task: TaskModel) {
    return this.httpClient.post(AppSettings.TasksUrl, task, this.requestOption);
  }

  completeTask(task: TaskModel) {
    return this.httpClient.post(AppSettings.TasksUrl + '/complete', task, this.requestOption);
  }

  getAllParentTasks() {
    return this.httpClient.get<TaskModel[]>(AppSettings.TasksUrl + '/parent-tasks');
  }

  getById(id: number) {
    return this.httpClient.get<TaskModel>(AppSettings.TasksUrl + '/' + id);
  }

  getAll() {
    return this.httpClient.get<TaskModel[]>(AppSettings.TasksUrl);
  }
}
