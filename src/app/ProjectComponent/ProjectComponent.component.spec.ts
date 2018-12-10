import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ProjectComponent } from './ProjectComponent.component';
import { Pipe, PipeTransform } from '@angular/core';
import {CustomMaterialModuleModule} from '../custom-material-module/custom-material-module.module';
import {ProjectListComponent} from '../ProjectListComponent/ProjectList.component'
import {FilterPipe} from '../pipes/filter.pipe'
import { ModalComponent } from '../directives/model.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import {ModalService} from '../services/model.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('CreateProjectComponentComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
            imports: [ FormsModule,CustomMaterialModuleModule,ReactiveFormsModule,HttpClientModule,RouterTestingModule,BrowserAnimationsModule ],
            providers:[ModalService],
      declarations: [ ProjectComponent,ProjectListComponent,FilterPipe,ModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
