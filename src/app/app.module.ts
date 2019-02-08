import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './ui/user/user.component';
import { AddComponent } from './ui/user/add/add.component';
import { ViewComponent } from './ui/user/view/view.component';
import { ProjectComponent } from './ui/project/project.component';
import { HttpClientModule } from '@angular/common/http';
import { UserSortbyPipe } from './ui/user/view/user-sortby.pipe';
import { UserFilterPipe } from './ui/user/view/user-filter.pipe';
import { AddProjComponent } from './ui/project/add-proj/add-proj.component';
import { ViewProjComponent } from './ui/project/view-proj/view-proj.component';
import { DatePipe } from '@angular/common';
import { ProjectFilterPipe } from './ui/project/view/project-filter.pipe';
import { ProjectSortbyPipe } from './ui/project/view/project-sortby.pipe';
import { AddTaskComponent } from './ui/task/add-task/add-task.component';
import { ViewTaskComponent } from './ui/task/view-task/view-task.component';
import { ParentTaskFilterPipe } from './ui/task/parent-task-filter.pipe';
import { TaskSortPipe } from './ui/task/task-sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AddComponent,
    ViewComponent,
    ProjectComponent,
    UserSortbyPipe,
    UserFilterPipe,
    AddProjComponent,
    ViewProjComponent,
    ProjectFilterPipe,
    ProjectSortbyPipe,
    AddTaskComponent,
    ViewTaskComponent,
    ParentTaskFilterPipe,
    TaskSortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
