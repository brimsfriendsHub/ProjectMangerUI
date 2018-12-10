import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './UserList.component';
import {CustomMaterialModuleModule} from '../custom-material-module/custom-material-module.module';
import {FilterPipe} from '../pipes/filter.pipe'
import { ModalComponent } from '../directives/model.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import {ModalService} from '../services/model.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('UserListComponentComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule,CustomMaterialModuleModule,ReactiveFormsModule,HttpClientModule,RouterTestingModule ],
      providers:[ModalService],
      declarations: [ UserListComponent,FilterPipe,ModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
