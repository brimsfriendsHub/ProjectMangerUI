import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CustomMaterialModuleModule} from './custom-material-module/custom-material-module.module';

import { AppComponent } from './app.component';
import { UserComponent } from './Usercomponent/User.component';
import { ProjectComponent } from './ProjectComponent/ProjectComponent.component';
import { ProjectListComponent } from './ProjectListComponent/ProjectList.component';
import { TaskComponent } from './TaskComponent/TaskComponent.component'
import { UserListComponent } from './UserListComponent/UserList.component';
import { TaskListComponent } from './TaskListComponent/TaskListComponent.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ModalComponent } from './directives/model.component';
import { ModalService } from './services/model.service';
// import { userInfo } from 'os';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    // BrowserAnimationsModule,
    UserListComponent,
    UserComponent,
    ProjectComponent,
    ProjectListComponent,
    TaskComponent,
    TaskListComponent,
    ModalComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    CustomMaterialModuleModule,
    BrowserAnimationsModule
   
  ],
  providers: [ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
