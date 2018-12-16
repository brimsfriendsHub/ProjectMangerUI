import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { TaskListComponent } from './TaskListComponent.component';
import {CustomMaterialModuleModule} from '../custom-material-module/custom-material-module.module';
import {FilterPipe} from '../pipes/filter.pipe'
import { ModalComponent } from '../directives/model.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import {ModalService} from '../services/model.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskModel } from '../models/Task';
describe('ListTaskComponentComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule,CustomMaterialModuleModule,ReactiveFormsModule,HttpClientModule,RouterTestingModule,BrowserAnimationsModule ],
      providers:[ModalService],
      declarations: [ TaskListComponent,ModalComponent,FilterPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.OnComponentLoad());
  });

  it('Get All projects', () => {
    expect(component.getAllProjects());
  });
  it('Open Modal', () => {
    expect(component.openModal('project-modal'));
  });
  it('Close Modal', () => {
    expect(component.closeModal('project-modal'));
  });
  it('Apply Filter', () => {
    expect(component.applyFilter('Priority'));
  });
  it('Check start & end date', () => {
    expect(component.getTime(null)).toBe(0);
  });
  it('Handle Sort by', () => {
    expect(component.handleSortBy('priority'));
    expect(component.handleSortBy('startDate'));
    expect(component.handleSortBy('endDate'));
    expect(component.handleSortBy('completed'));
    expect(component.handleSortBy('Notcompleted'));
  });
  it('Is completed', () => {
    const patchModel = new TaskModel();
    patchModel.TaskId = 2;
    patchModel.TaskName = 'Task';
    patchModel.ProjectId = 3;
    patchModel.ProjectName = 'Project Task';
    patchModel.IsParentTask = false;
    patchModel.Priority = 2;
    patchModel.ParentTaskId = 0;
    patchModel.ParentTaskName = null;
    patchModel.StartDate = new Date();
    patchModel.EndDate = new Date();
    patchModel.ManagerId = 10001;
    patchModel.ManagerName = 'Saui';

    expect(component.isCompleted(patchModel));
  });
  
});
