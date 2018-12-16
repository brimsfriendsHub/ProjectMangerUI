import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectComponent } from './ProjectComponent.component';
import { Pipe, PipeTransform } from '@angular/core';
import {CustomMaterialModuleModule} from '../custom-material-module/custom-material-module.module';
import {ProjectListComponent} from '../ProjectListComponent/ProjectList.component';
import {FilterPipe} from '../pipes/filter.pipe';
import { ModalComponent } from '../directives/model.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import {ModalService} from '../services/model.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppSettings } from '../models/AppSettings';
import { ProjectModel } from '../models/Project';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

describe('CreateProjectComponentComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
            // tslint:disable-next-line:max-line-length
            imports: [ FormsModule, CustomMaterialModuleModule, ReactiveFormsModule, HttpClientModule, RouterTestingModule, BrowserAnimationsModule ],
            providers: [ModalService, FormBuilder],
      declarations: [ ProjectComponent, ProjectListComponent, FilterPipe, ModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('add default values', () => {
    expect(component.addButtonTitle).toBe('Add');
    expect(component.pageTitle).toBe('Add Project');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Set Current day and next day by default', () => {
    const today = new Date();
    const endDate = new Date();
    endDate.setDate(today.getDate() + 1);
    expect(component.setStartAndEndDate(today, endDate));
  });

  it('Load All managers', () => {
    expect(component.loadManagaers());
  });
  it('Reset Form values after save', () => {
    expect(component.displayPageMessage(AppSettings.AlertDanger, 'Test Warining message'));
  });
  it('Check start & end date', () => {
    expect(component.changeDateControlState());
  });
  it('Open Modal', () => {
    expect(component.openModal('custom-modal-1'));
  });
  it('Close Modal', () => {
    expect(component.closeModal('custom-modal-1'));
  });
  it('Reset Form', () => {
    expect(component.resetForm());
  });
  it('Get Project id', () => {
    expect(component.getByProjectId(3));
  });
  it('Get Project id', () => {
    const patchModel = new ProjectModel();
    patchModel.ProjectId = 3;
    patchModel.ProjectName = 'Project Task';
    patchModel.Priority = 2;
    patchModel.StartDate = new Date();
    patchModel.EndDate = new Date();
    patchModel.Manager = 'Saui';
    patchModel.UserId = 10001;
    expect(component.patchModel(patchModel));
  });

  it('Setp Index', () => {
    expect(component.setStep(1));
  });
});
