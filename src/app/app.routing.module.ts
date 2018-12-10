import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent} from './Usercomponent/User.component';
import { UserListComponent } from './UserListComponent/UserList.component';
import { ProjectComponent } from './ProjectComponent/ProjectComponent.component';
import { TaskComponent } from './TaskComponent/TaskComponent.component'
import { TaskListComponent } from './TaskListComponent/TaskListComponent.component';

const routes: Routes = [
  { 'path': '', redirectTo: 'projects/0', pathMatch: 'full' },
  { 'path': 'users/:id', component: UserComponent },
  { 'path': 'projects/:id', component: ProjectComponent },
  { 'path': 'tasks/:id', component: TaskComponent },
  { 'path': 'view-tasks', component: TaskListComponent },
  { 'path': 'user-list', component: UserListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
