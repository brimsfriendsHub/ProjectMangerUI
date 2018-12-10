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
});
