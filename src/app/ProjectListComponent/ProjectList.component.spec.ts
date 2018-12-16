import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ProjectListComponent } from './ProjectList.component';
import {CustomMaterialModuleModule} from '../custom-material-module/custom-material-module.module';
import {FilterPipe} from '../pipes/filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import {ModalService} from '../services/model.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from '../directives/model.component';
import { AppSettings } from '../models/AppSettings';
import { ProjectModel } from '../models/Project';

describe('ProjectListComponentComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule,CustomMaterialModuleModule,ReactiveFormsModule,HttpClientModule,RouterTestingModule,BrowserAnimationsModule ],
      providers:[ModalService],
      declarations: [ ProjectListComponent,FilterPipe,ModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Get All Projects', () => {
    expect(component.getAllProjects());
  });
  it('Suspend Project', () => {
    const projectModel = new ProjectModel();
    expect(component.suspendProject(projectModel));
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
});
