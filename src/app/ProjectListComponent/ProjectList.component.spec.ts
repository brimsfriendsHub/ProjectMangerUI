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
});