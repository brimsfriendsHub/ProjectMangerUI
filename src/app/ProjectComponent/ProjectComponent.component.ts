import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {MatSort, MatTableDataSource,MatPaginator} from '@angular/material';
import { ProjectService } from '../services/project.service';
import { ProjectModel } from '../models/Project';
import { ModalService } from '../services/model.service';
import { UserModel } from '../models/User';
import { AppSettings } from '../models/AppSettings';
import { LoggingService } from '../services/logging.service';
import {MatSnackBar} from '@angular/material';
import { ProjectListComponent } from '../ProjectListComponent/ProjectList.component';
@Component({
  selector: 'app-create-project-component',
  templateUrl: './ProjectComponent.component.html',
  styleUrls: ['./ProjectComponent.component.css'],
  providers: [ProjectService, DatePipe]
})

export class ProjectComponent implements OnInit {

  projectForm: FormGroup;
  submitted = false;
  pageMessage: string;
  projectId: number;
  userId: number;
  manager: string;
  managers: Array<UserModel> = [];
  searchManager: string;
  @Input() project: ProjectModel;
  @ViewChild(ProjectListComponent) plComp : ProjectListComponent;

  addButtonTitle = 'Add';
  pageTitle = 'Add Project';
  priority: number;
  allowDateSelection: boolean;
  showAlert: boolean;
  alertType: string;
  displayedColumnsUser: string[] = ['UserId', 'FirstName', 'LastName', 'actions'];
  ManagersDataSource: MatTableDataSource<UserModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private _formBuilder: FormBuilder,
    private _projectService: ProjectService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    public snackBar: MatSnackBar,
    private _modalService: ModalService,
    private _loggingService: LoggingService,
    private _datePipe: DatePipe) {
    this.OnComponentLoad();
  }

  OnComponentLoad() {
    this.pageMessage = '';
    this.project = new ProjectModel();

    this.ngOnInit();
  }

  ngOnInit() {
    const today = new Date();
    const endDate = new Date();
    endDate.setDate(today.getDate() + 1);

    this.projectForm = this._formBuilder.group(
      {
        projectId: [0],
        projectName: ['', Validators.required],
        setStartAndEndDate: [false],
        startDate: new FormControl({ value: '', disabled: true }),
        endDate: new FormControl({ value: '', disabled: true }),
        priority: [0],
        manager: [this.manager, Validators.required],
        userId: [this.userId]
      });



    this._activatedRoute.paramMap.subscribe(pm => {
      const id = +pm.get('id');
      if (id > 0) {
        this.getByProjectId(id);
      }
    });

    this.loadManagaers();
  }

  setStartAndEndDate(start: Date, end: Date) {
    const formattedTodayDate = this._datePipe.transform(start, AppSettings.IsoDateFormat).toString();
    const formattedTomorrowDate = this._datePipe.transform(end, AppSettings.IsoDateFormat).toString();
    this.projectForm.patchValue({ startDate: formattedTodayDate, endDate: formattedTomorrowDate });
  }

  loadManagaers() {
    this._projectService.getAllManagers().subscribe((data: Array<UserModel>) => {
      this.managers = data;
      this.ManagersDataSource=new MatTableDataSource(this.managers);
      this.ManagersDataSource.paginator=this. paginator;
    });
  }
  applyFilterforusers(filterValue: string) {
    this.ManagersDataSource.filter = filterValue.trim().toLowerCase();
   this.ManagersDataSource.paginator=this. paginator;
}

  openModal(id: string) {
    this._modalService.open(id);
  }

  closeModal(id: string) {
    this._modalService.close(id);
  }

  resetForm() {
    this.submitted = false;
    this.projectForm.reset();
    this.addButtonTitle = 'Add';
    this.priority = 0;
    this.projectForm.controls['priority'].setValue(this.priority);
    this.allowDateSelection = true;
    this.changeDateControlState();
  }

  get f() { return this.projectForm.controls; }

  changeDate(e) {
    this.allowDateSelection = !(e.target.checked);
    this.changeDateControlState();
  }

  changeDateControlState() {
    if (!this.allowDateSelection) {
      this.projectForm.controls[AppSettings.StartDateFieldName].enable();
      this.projectForm.controls[AppSettings.EndDateFieldName].enable();
      const today = new Date();
      const endDate = new Date();
      endDate.setDate(today.getDate() + 1);
      if ( this.projectId === 0) {
      this.setStartAndEndDate(today, endDate);
      }
    } else {
      this.projectForm.controls[AppSettings.StartDateFieldName].disable();
      this.projectForm.controls[AppSettings.EndDateFieldName].disable();
      this.projectForm.patchValue({ startDate:null, endDate:null});

    }
  }

  displayPageMessage(alertType: string, message: string) {
    this.pageMessage = message;
    this.showAlert = true;
    this.alertType = (alertType === AppSettings.AlertDanger)
      ? AppSettings.AlertDangerClass
      : AppSettings.AlertSuccessClass;
  }

  onPriorityChange(e) {
    this.priority = e.target.value;
  }

  setSelectedManager(m: UserModel) {
    this.projectForm.controls['userId'].setValue(m.UserId);
    this.projectForm.controls['manager'].setValue(m.FirstName + ' ' + m.LastName);
  }

  getByProjectId(id) {
    if ( id === 0) {
      this.projectForm.reset();
    } else {
    this._projectService.getById(id).subscribe((p) => {
      this.allowDateSelection = false;
      this.addButtonTitle = 'Update';
      this.pageTitle = 'Manage Project - ' + p.ProjectName;
      this.project = p;
      this.patchModel(p);
      this.priority = p.Priority;
      this.setStartAndEndDate(p.StartDate, p.EndDate);
      this.changeDateControlState();
      this.setStep(0);
    });
  }
  }

  patchModel(p: ProjectModel) {
    this.projectForm.patchValue({
      projectId: p.ProjectId,
      projectName: p.ProjectName,
      startDate: p.StartDate,
      endDate: p.EndDate,
      priority: p.Priority,
      manager: p.Manager,
      userId: p.UserId,
      setStartAndEndDate: false
    });
  }
  openSnackBar(message:string,action:string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
    this.resetForm();
  }
  // tslint:disable-next-line:member-ordering
  step = 0;
  setStep(index: number) {
    this.step = index;
  }


  onSubmit() {
    this.submitted = true;

    const sd = Date.parse(this.projectForm.value.startDate);
    const ed = Date.parse(this.projectForm.value.endDate);
   if (this.allowDateSelection || this.allowDateSelection === undefined) {
    if (ed <= sd || (isNaN(sd) || isNaN(ed))) {
      this.displayPageMessage(AppSettings.AlertDanger, 'End date should be greater than start date or date fields are empty');
      return;
    }
  } else {
    // this.projectForm.value.startDate=null;
    // this.projectForm.value.enDate=null;
  }

    if (this.projectForm.invalid) {
      return;
    }

    this._projectService.createOrUpdateProject(this.projectForm.value)
      .subscribe((data) => {
        this.openSnackBar('User has been successfully added/updated', this.projectForm.value.projectName);
       // this.displayPageMessage(AppSettings.AlertSuccess, 'Project details has been successfully saved/updated.');
        this.plComp.getAllProjects();
        this.resetForm();
        this._router.navigate(['/projects/0?r=' +  + Math.floor(Math.random() * 1000)]);
      },
        (erorr) => {
          this._loggingService.LogError(erorr);
          this.displayPageMessage(AppSettings.AlertDanger, AppSettings.GenericError);
        });
  }
}
