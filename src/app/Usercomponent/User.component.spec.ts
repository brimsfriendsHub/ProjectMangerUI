import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './User.component';
import {CustomMaterialModuleModule} from '../custom-material-module/custom-material-module.module';
import {UserListComponent} from '../UserListComponent/UserList.component';
import {FilterPipe} from '../pipes/filter.pipe'
import { ModalComponent } from '../directives/model.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import {ModalService} from '../services/model.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('CreateUserComponentComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule,CustomMaterialModuleModule,ReactiveFormsModule,HttpClientModule,RouterTestingModule,BrowserAnimationsModule ],
      providers:[ModalService],
      declarations: [ UserComponent,UserListComponent,FilterPipe,ModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
