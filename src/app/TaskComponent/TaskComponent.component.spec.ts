import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { TaskComponent } from './TaskComponent.component';
import {CustomMaterialModuleModule} from '../custom-material-module/custom-material-module.module';
import { ModalComponent } from '../directives/model.component';
import {FilterPipe} from '../pipes/filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import {ModalService} from '../services/model.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectModel } from '../models/Project';
import { TaskModel } from '../models/Task';
describe('CreateTaskComponentComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule,CustomMaterialModuleModule,ReactiveFormsModule,HttpClientModule ,RouterTestingModule,BrowserAnimationsModule],
      providers:[ModalService],
      declarations: [ TaskComponent,ModalComponent ,FilterPipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Apply Filter', () => {
    expect(component.applyFilter('Priority'));
  });
  it('Load Dependices', () => {
    expect(component.loadDependencies());
  });

  it('Open Modal', () => {
    expect(component.openModal('custom-modal-1'));
  });
  it('Close Modal', () => {
    expect(component.closeModal('custom-modal-1'));
  });
  it('Set Selected project', () => {
    const projectModel = new ProjectModel();
    expect(component.setSelectedProject(projectModel));
  });
  it('Set Control value', () => {
    expect(component.setControlValue('managerId', 10001));
  });
  it('Enable Control', () => {
    expect(component.enableControl('priority'));
  });
  it('disable Control', () => {
    expect(component.disableControl('priority'));
  });
  it(' Get Task by Id', () => {
    expect(component.getTaskById(2));
  });
  it('Get Project id', () => {
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

    expect(component.patchModel(patchModel));
  });
});
