import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormGroupDirective,FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';
import { UserService } from '../services/user.service';
import { UserModel } from '../models/User';
import { AppSettings } from '../models/AppSettings';
import { LoggingService } from '../services/logging.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './User.component.html',
  styleUrls: ['./User.component.css'],
  providers: [UserService]
})

export class UserComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  pageMessage: string;
  userId: number;
  showAlert: boolean;
  alertType: string;
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  employeeId = new FormControl('', [Validators.required]);
  @Input() user: UserModel;

  addButtonTitle = 'Add';
  pageTitle = 'Add User';

  constructor(private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute,
    private _loggingService: LoggingService,
    public snackBar: MatSnackBar,
        private router: Router) {
      
     
    this.OnComponentLoad();
   
  }

  OnComponentLoad() {
    this.user = new UserModel();

    this.ngOnInit();
  }

  ngOnInit() {
    this.userForm = this._formBuilder.group({
      userId: [0],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      employeeId: ['', [Validators.required, Validators.min(1)]]
    });

    this._activatedRoute.paramMap.subscribe(pm => {
      const id = +pm.get('id');
      this.submitted = false;
      this.getUser(id);
    });
  }

  getErrorMessageforFirstName() {
    return this.firstName.hasError('required') ? 'Please Enter the first Name' :'';
  }
  getErrorMessageforLastName() {
    return this.lastName.hasError('required') ? 'Please Enter the Last Name' :'';
  }

  getErrorMessageforEmpNo() {
    return this.employeeId.hasError('required') ? 'Please Enter the EmployeeId' :'';
  }

  displayPageMessage(alertType: string, message: string) {
    this.pageMessage = message;
    this.showAlert = true;
    this.alertType = (alertType === AppSettings.AlertDanger)
      ? AppSettings.AlertDangerClass
      : AppSettings.AlertSuccessClass;
  }

  openSnackBar(message:string,action:string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
    this.userForm.reset();
  }
  clearForm() {
    this.submitted = false;
    this.userForm.reset();
    this.addButtonTitle = 'Add';
  }

  get f() { return this.userForm.controls; }

  getUser(id) {
    if (id === 0) {
      this.userForm.reset();
      this.userForm.patchValue({
        userId: null,
        firstName: '',
        lastName: null,
        employeeId: null
      });

    } else {

      this._userService.getById(id).subscribe((u) => {
        this.addButtonTitle = 'Update';
        this.pageTitle = 'Manage User - ' + u.FirstName;
        this.user = u;
        this.patchModel(u);
        this.setStep(0);
      });
    }

  }
  step = 0;

  setStep(index: number) {
    this.step = index;
  }
  patchModel(u: UserModel) {
    this.userForm.patchValue({
      userId: u.UserId,
      firstName: u.FirstName,
      lastName: u.LastName,
      employeeId: u.EmployeeId
    });
  }

  
  reset() {
    this.userForm.reset();
  }
  onSubmit( formDirective: FormGroupDirective) {
  
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }

   

    this._userService.createOrUpdateUser(this.userForm.value)
      .subscribe((data) => {
        formDirective.resetForm();
       this.userForm.reset(true);
        this.openSnackBar("User has been successfully added/updated", this.userForm.value.fistName);

   
        this.router.navigate(['/users/0?r=' + + Math.floor(Math.random() * 1000)]);
    
      },
        (exception) => {
          this.displayPageMessage(AppSettings.AlertDanger, AppSettings.GenericError);
          this._loggingService.LogError(exception);
        });
  }
}
