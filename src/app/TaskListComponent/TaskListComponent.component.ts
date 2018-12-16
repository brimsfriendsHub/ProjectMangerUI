import { Component, OnInit,ViewChild } from '@angular/core';
import { TaskModel } from '../models/Task';

import { ModalService } from '../services/model.service';
import { TaskService } from '../services/task.service';
import { ProjectService } from '../services/project.service';
import { ProjectModel } from '../models/Project';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSort, MatTableDataSource,MatPaginator} from '@angular/material';
@Component({
  selector: 'app-list-task-component',
  templateUrl: './TaskListComponent.component.html',
  styleUrls: ['./TaskListComponent.component.css']
})

export class TaskListComponent implements OnInit {
  displayedColumns: string[] = ['Task', 'Parent', 'Priority', 'Start','End'];
  displayedColumnsProject: string[] = ['ProjectId', 'ProjectName', 'Priority','actions'];
  taskForm: FormGroup;
  tasks: Array<TaskModel> = [];
  projects: Array<ProjectModel> = [];
  projectName: string;
  sortBy: string;
  searchProject: string;
  dataSource:MatTableDataSource<TaskModel>;
  projectsdataSource:MatTableDataSource<ProjectModel>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private _taskService: TaskService,
    private _projectService: ProjectService,
    private _modalService: ModalService,
    private _formBuilder: FormBuilder,
    private _router: Router) {
    this.sortBy = 'startDate';
    this.OnComponentLoad();
  }

  OnComponentLoad() {
    this.ngOnInit();

  }

  ngOnInit() {
    this.loadTasks();
    this.getAllProjects();
    
  }

  setSelectedProject(m: ProjectModel) {
    this.projectName = m.ProjectName;
       this.loadTasks();
     }

  get f() { return this.taskForm.controls; }

  editTask(task: TaskModel) {
    this._router.navigate(['tasks/' + task.TaskId.toString()]);
  }

  public getAllProjects() {
    this._projectService.getAll().subscribe((data: Array<ProjectModel>) => {
      this.projects = data;
      this.projectsdataSource=new MatTableDataSource(this.projects);
      this.projectsdataSource.paginator=this.paginator;
    });
  }

  loadTasks() {
    
    this._taskService.getAll().subscribe((data: Array<TaskModel>) => {
      this.tasks = data;
    this.dataSource = new MatTableDataSource(this.tasks);
     this.dataSource.filterPredicate= (data: TaskModel, filter: string) => data.ProjectName.indexOf(filter) != -1;
     this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filter=this.projectName;

    });
  }
  applyFilter(filterValue: string) {
   
    this.projectsdataSource.filterPredicate= (data: ProjectModel, filter: string) => data.ProjectName.toLowerCase().indexOf(filterValue.trim().toLowerCase()) != -1;
   this.projectsdataSource.filter = filterValue.trim().toLowerCase();



  }
  openModal(id: string) {
    this._modalService.open(id);
  }

  isCompleted(tm: TaskModel) {
    if (tm === null) { return false; }
    return (tm.Status === 'Yes');
  }

  closeModal(id: string) {
    this._modalService.close(id);
    this.loadTasks();
  }

  endTask(task: TaskModel) {
    if (!confirm('This operation cannot be undone. Are you sure want to continue?')) {
      return;
    }

    this._taskService.completeTask(task).subscribe((data: Array<TaskModel>) => {
      this.dataSource = new MatTableDataSource(data);
      //this.tasks = data;
    });
  }
  getTime(date?: Date) {
    return date != null ? new Date(date).getTime() : 0;
  }

  handleSortBy(value) {
    this.sortBy = value;

    switch (this.sortBy) {
      case 'startDate':
          this.tasks = this.tasks.sort((a, b) => {
          return this.getTime(a.StartDate) - this.getTime(b.StartDate);
        });
        this.dataSource = new MatTableDataSource(this.tasks);
        break;
      case 'endDate':
        this.tasks = this.tasks.sort((a, b) => {
          return this.getTime(a.EndDate) - this.getTime(b.EndDate);
        });
        this.dataSource = new MatTableDataSource(this.tasks);
        break;
      case 'completed':
        this.tasks = this.tasks.sort((a, b) => a.Status.localeCompare(b.Status));
        this.dataSource = new MatTableDataSource(this.tasks);
        break;
      case 'priority':
        this.tasks = this.tasks.sort((a, b) => a.Priority.toString().localeCompare(b.Priority.toString()));
        this.dataSource = new MatTableDataSource(this.tasks);
        break;
      default:
        this.tasks = this.tasks.sort((a, b) => a.ProjectName.localeCompare(b.ProjectName));
        this.dataSource = new MatTableDataSource(this.tasks);
        break;
    }
  }
}
