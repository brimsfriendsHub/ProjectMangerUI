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
import { UserModel } from '../models/User';
import { AppSettings } from '../models/AppSettings';
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
  it('add default values', () => {
    expect(component.addButtonTitle).toBe('Add');
    expect(component.pageTitle).toBe('Add User');
    expect(component.submitted).toBe(false);
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Get error msg for first & last name', () => {
    expect(component.getErrorMessageforFirstName());
    expect(component.getErrorMessageforLastName());
    expect(component.getErrorMessageforEmpNo());
  });
  it('Display Error Message', () => {
    expect(component.displayPageMessage(AppSettings.AlertDanger, 'Test Warining message'));
  });
  it('Get User', () => {
    expect(component.getUser(0));
    expect(component.getUser(10001));
  });
  it('Setp Index', () => {
    expect(component.setStep(1));
  });
  it('Patch modal', () => {
  const obj = new UserModel();
    obj.UserId = 0;
    obj.FirstName = 'Saui';
    obj.LastName = 'Nivas';
    obj.EmployeeId = 10001;
    expect(component.patchModel(obj));
  });
  it('Reset', () => {
    expect(component.reset());
  });
});
