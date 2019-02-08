import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from 'src/app/ui/user/user.component';
import { ProjectComponent } from 'src/app/ui/project/project.component';
import { AddTaskComponent } from 'src/app/ui/task/add-task/add-task.component';
import { ViewTaskComponent } from 'src/app/ui/task/view-task/view-task.component';

const routes: Routes = [
  {path:'addUser', component: UserComponent },
  {path:'addProject', component: ProjectComponent },
  {path:'addTask', component: AddTaskComponent },
  {path:'viewTask', component: ViewTaskComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
