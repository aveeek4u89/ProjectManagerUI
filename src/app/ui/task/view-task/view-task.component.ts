import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserServiceService } from 'src/app/Services/user-service.service';
import { DatePipe } from '@angular/common';
import { ProjectServiceService } from 'src/app/Services/project-service.service';
import { ParentTaskServiceService } from 'src/app/Services/parent-task-service.service';
import { TaskServiceService } from 'src/app/Services/task-service.service';
import { User } from 'src/app/Model/user';
import { Project } from 'src/app/Model/project';
import { NgForm } from '@angular/forms';
import { ParentTask } from 'src/app/Model/parent-task';
import { Task } from 'src/app/Model/task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  colValue: string = 'StartDate';
  direction: number;
  isDrctnChnge: boolean = false;
  searchTermText = '';
  searchProjectText:any='';
  constructor(public projectService: ProjectServiceService, public modalService: NgbModal,
    public userService: UserServiceService, public datePipe: DatePipe, public taskService: TaskServiceService, public parentTaskService: ParentTaskServiceService, public router: Router) { }

  ngOnInit() {
    if (this.taskService.selectedTask.ProjectID != undefined) {
      console.log(this.taskService.selectedTask.ProjectID);
      this.loadTasks(this.taskService.selectedTask.ProjectID);
    }
  }
  
  showProjectList() {
    this.projectService.GetAll().subscribe(x => { this.projectService.projectList = x as Project[] });
  }
  retreiveProject(project: Project) {
    this.projectService.selectedProject = Object.assign({}, project);
    this.taskService.selectedTask.ProjectID = project.ProjectID;
    this.taskService.selectedTask.ProjectName = project.ProjectName;
    this.loadTasks(project.ProjectID);
    return this.taskService.selectedTask.ProjectName;
  }

  loadTasks(projID: number) {
    console.log("Load Called");
    this.taskService.Get(projID).subscribe(t => this.taskService.taskList = t);
  }

  editTask(item: Task) {
    this.taskService.Edit(item).subscribe(res => { this.router.navigate(['/addTask']) });
  }

  endTask(item: Task) {
    item.ISActive = false;
    this.taskService.EditTask(item).subscribe(res => { console.log(res) });
  }

  SortProjects(sortKey: string) {
    this.isDrctnChnge = !this.isDrctnChnge; //change the direction    
    this.colValue = sortKey;
    this.direction = this.isDrctnChnge ? 1 : -1;
  }

}
